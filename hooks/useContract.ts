"use client";

/**
 * ============================================================================
 * IOTA CONTRACT INTEGRATION HOOK
 * ============================================================================
 *
 * This hook contains ALL the contract interaction logic for Idea Seed Generator.
 *
 * To customize your dApp, modify the configuration section below.
 *
 * ============================================================================
 */

import { useState, useEffect } from "react";
import {
  useCurrentAccount,
  useIotaClient,
  useSignAndExecuteTransaction,
  useIotaClientQuery,
} from "@iota/dapp-kit";
import { Transaction } from "@iota/iota-sdk/transactions";
import { useNetworkVariable } from "@/lib/config";
import type { IotaObjectData } from "@iota/iota-sdk/client";

// ============================================================================
// CONTRACT CONFIGURATION
// ============================================================================
// Change these values to match your Move contract

export const CONTRACT_MODULE = "idea_seed"; // Your Move module name
export const CONTRACT_METHODS = {
  PROPOSE_IDEA: "propose_idea",
  SUPPORT_IDEA: "support_idea",
} as const;

// ============================================================================
// DATA EXTRACTION
// ============================================================================
// Modify this to extract data from your contract's object structure

interface IdeaData {
  id: string;
  title: string;
  description: string;
  category: string;
  proposer: string;
  support: number;
  growthLevel: number;
}

// Extract idea data from object
function extractIdeaData(obj: IotaObjectData): IdeaData | null {
  if (!obj.content || obj.content.dataType !== "moveObject") return null;

  const fields = obj.content.fields as Record<string, unknown>;

  return {
    id: obj.objectId,
    title: String(fields.title || ""),
    description: String(fields.description || ""),
    category: String(fields.category || ""),
    proposer: String(fields.proposer || ""),
    support: Number(fields.support || 0),
    growthLevel: Number(fields.growth_level || 0),
  };
}

// ============================================================================
// MAIN HOOK
// ============================================================================

export function useContract() {
  const currentAccount = useCurrentAccount();
  const iotaClient = useIotaClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const packageId = useNetworkVariable("packageId");

  // State
  const [ideas, setIdeas] = useState<IdeaData[]>([]);
  const [proposingIdea, setProposingIdea] = useState(false);
  const [supportingIdea, setSupportingIdea] = useState(false);
  const [loadingIdeas, setLoadingIdeas] = useState(false);

  // Fetch all ideas owned by the user
  const { data: ownedObjects, refetch: refetchIdeas } = useIotaClientQuery(
    "getOwnedObjects",
    {
      owner: currentAccount?.address || "",
      options: {
        showContent: true,
        showType: true,
      },
    },
    {
      enabled: !!currentAccount && !!packageId,
      refetchInterval: 5000,
    }
  );

  // Update ideas when data changes
  useEffect(() => {
    if (ownedObjects?.data) {
      setLoadingIdeas(true);
      const extractedIdeas = ownedObjects.data
        .map((obj) => extractIdeaData(obj.data as IotaObjectData))
        .filter((idea): idea is IdeaData => idea !== null);
      setIdeas(extractedIdeas);
      setLoadingIdeas(false);
    }
  }, [ownedObjects]);

  // ============================================================================
  // ACTIONS
  // ============================================================================

  const proposeIdea = async (ideaData: {
    title: string;
    description: string;
    category: string;
  }) => {
    if (!currentAccount || !packageId) return;

    setProposingIdea(true);

    try {
      const tx = new Transaction();
      
      tx.moveCall({
        target: `${packageId}::${CONTRACT_MODULE}::${CONTRACT_METHODS.PROPOSE_IDEA}`,
        arguments: [
          tx.pure.string(ideaData.title),
          tx.pure.string(ideaData.description),
          tx.pure.string(ideaData.category),
        ],
      });

      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: () => {
            console.log("Idea proposed successfully!");
            refetchIdeas();
          },
          onError: (error) => {
            console.error("Error proposing idea:", error);
          },
          onSettled: () => {
            setProposingIdea(false);
          },
        }
      );
    } catch (error) {
      console.error("Error creating transaction:", error);
      setProposingIdea(false);
    }
  };

  const supportIdea = async (ideaId: string) => {
    if (!currentAccount || !packageId) return;

    setSupportingIdea(true);

    try {
      const tx = new Transaction();
      
      tx.moveCall({
        target: `${packageId}::${CONTRACT_MODULE}::${CONTRACT_METHODS.SUPPORT_IDEA}`,
        arguments: [tx.object(ideaId)],
      });

      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: () => {
            console.log("Idea supported successfully!");
            refetchIdeas();
          },
          onError: (error) => {
            console.error("Error supporting idea:", error);
          },
          onSettled: () => {
            setSupportingIdea(false);
          },
        }
      );
    } catch (error) {
      console.error("Error creating transaction:", error);
      setSupportingIdea(false);
    }
  };

  // ============================================================================
  // RETURN
  // ============================================================================

  return {
    data: {
      ideas,
    },
    actions: {
      proposeIdea,
      supportIdea,
    },
    state: {
      proposingIdea,
      supportingIdea,
      loadingIdeas,
    },
  };
}
