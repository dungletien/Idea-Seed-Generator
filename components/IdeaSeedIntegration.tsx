"use client";

/**
 * ============================================================================
 * IDEA SEED GENERATOR DAPP INTEGRATION COMPONENT
 * ============================================================================
 *
 * This component allows users to propose ideas and support existing ideas.
 * Ideas grow when they receive support from the community.
 *
 * All the contract logic is in hooks/useContract.ts
 *
 * ============================================================================
 */

import { useCurrentAccount } from "@iota/dapp-kit";
import { useContract } from "@/hooks/useContract";
import { Button, Container, Heading, Text, TextField, TextArea, Card, Flex, Badge } from "@radix-ui/themes";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

const IdeaSeedIntegration = () => {
  const currentAccount = useCurrentAccount();
  const { data, actions, state } = useContract();

  const [newIdea, setNewIdea] = useState({
    title: "",
    description: "",
    category: "",
  });

  const isConnected = !!currentAccount;

  if (!isConnected) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <div style={{ maxWidth: "500px", width: "100%" }}>
          <Heading size="6" style={{ marginBottom: "1rem" }}>
            💡 Idea Seed Generator
          </Heading>
          <Text>Please connect your wallet to propose and support ideas!</Text>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem 1rem",
        background: "var(--gray-a2)",
      }}
    >
      <Container style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Heading size="6" style={{ marginBottom: "2rem" }}>
          💡 Idea Seed Generator
        </Heading>

        {/* Create New Idea Section */}
        <Card style={{ marginBottom: "2rem", padding: "1.5rem" }}>
          <Heading size="4" style={{ marginBottom: "1rem" }}>
            🌱 Plant a New Idea Seed
          </Heading>
          
          <div style={{ marginBottom: "1rem" }}>
            <Text size="2" style={{ display: "block", marginBottom: "0.5rem" }}>
              Idea Title
            </Text>
            <TextField.Root
              placeholder="Enter your idea title"
              value={newIdea.title}
              onChange={(e) =>
                setNewIdea({ ...newIdea, title: e.target.value })
              }
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <Text size="2" style={{ display: "block", marginBottom: "0.5rem" }}>
              Category
            </Text>
            <TextField.Root
              placeholder="e.g., Technology, Art, Social Impact"
              value={newIdea.category}
              onChange={(e) =>
                setNewIdea({ ...newIdea, category: e.target.value })
              }
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <Text size="2" style={{ display: "block", marginBottom: "0.5rem" }}>
              Description
            </Text>
            <TextArea
              placeholder="Describe your idea in detail..."
              value={newIdea.description}
              onChange={(e) =>
                setNewIdea({ ...newIdea, description: e.target.value })
              }
              style={{ width: "100%", minHeight: "100px" }}
            />
          </div>

          <Button
            onClick={() => actions.proposeIdea(newIdea)}
            disabled={
              state.proposingIdea ||
              !newIdea.title ||
              !newIdea.description ||
              !newIdea.category
            }
            style={{ width: "100%" }}
          >
            {state.proposingIdea ? (
              <Flex align="center" gap="2">
                <ClipLoader size={16} color="#fff" />
                <span>Proposing Idea...</span>
              </Flex>
            ) : (
              "🌱 Propose Idea"
            )}
          </Button>
        </Card>

        {/* Ideas List Section */}
        <Heading size="5" style={{ marginBottom: "1rem" }}>
          🌿 Growing Ideas
        </Heading>

        {state.loadingIdeas ? (
          <Flex justify="center" style={{ padding: "2rem" }}>
            <ClipLoader size={40} color="var(--accent-9)" />
          </Flex>
        ) : data.ideas && data.ideas.length > 0 ? (
          <div style={{ display: "grid", gap: "1rem" }}>
            {data.ideas.map((idea, index) => (
              <Card key={index} style={{ padding: "1.5rem" }}>
                <Flex justify="between" align="start" style={{ marginBottom: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <Heading size="4" style={{ marginBottom: "0.5rem" }}>
                      {idea.title}
                    </Heading>
                    <Badge color="blue" style={{ marginBottom: "0.5rem" }}>
                      {idea.category}
                    </Badge>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Text size="3" weight="bold" style={{ display: "block", color: "var(--green-11)" }}>
                      🌱 {idea.support} Support
                    </Text>
                    <Text size="1" style={{ color: "var(--gray-11)" }}>
                      Growth Level: {idea.growthLevel}
                    </Text>
                  </div>
                </Flex>

                <Text size="2" style={{ display: "block", marginBottom: "1rem", color: "var(--gray-12)" }}>
                  {idea.description}
                </Text>

                <Flex justify="between" align="center">
                  <Text size="1" style={{ color: "var(--gray-11)" }}>
                    By: {idea.proposer.slice(0, 6)}...{idea.proposer.slice(-4)}
                  </Text>
                  <Button
                    onClick={() => actions.supportIdea(idea.id)}
                    disabled={state.supportingIdea}
                    size="2"
                  >
                    {state.supportingIdea ? (
                      <Flex align="center" gap="2">
                        <ClipLoader size={14} color="#fff" />
                        <span>Supporting...</span>
                      </Flex>
                    ) : (
                      "💧 Water This Idea"
                    )}
                  </Button>
                </Flex>
              </Card>
            ))}
          </div>
        ) : (
          <Card style={{ padding: "2rem", textAlign: "center" }}>
            <Text size="3" style={{ color: "var(--gray-11)" }}>
              No ideas yet. Be the first to plant a seed! 🌱
            </Text>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default IdeaSeedIntegration;
