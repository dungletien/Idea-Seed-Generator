module idea_seed::idea_seed {
    use std::string::{String};

    /// Represents an idea proposed by a user
    public struct Idea has key, store {
        id: UID,
        title: String,
        description: String,
        category: String,
        proposer: address,
        support: u64,
        growth_level: u64,
    }

    /// Error codes
    const EInvalidSupport: u64 = 0;

    /// Propose a new idea
    #[allow(lint(self_transfer))]
    public fun propose_idea(
        title: String,
        description: String,
        category: String,
        ctx: &mut tx_context::TxContext
    ) {
        let sender = tx_context::sender(ctx);

        let idea = Idea {
            id: object::new(ctx),
            title,
            description,
            category,
            proposer: sender,
            support: 0,
            growth_level: 0,
        };

        transfer::public_transfer(idea, sender);
    }

    /// Support an existing idea (water the seed to help it grow)
    public fun support_idea(idea: &mut Idea, _ctx: &mut tx_context::TxContext) {
        idea.support = idea.support + 1;
        
        // Calculate growth level based on support
        // Every 10 supports = 1 growth level
        idea.growth_level = idea.support / 10;
    }

    /// Get idea details
    public fun get_idea_info(idea: &Idea): (String, String, String, address, u64, u64) {
        (
            idea.title,
            idea.description,
            idea.category,
            idea.proposer,
            idea.support,
            idea.growth_level
        )
    }

    /// Check if idea has reached a specific growth milestone
    public fun has_reached_milestone(idea: &Idea, milestone: u64): bool {
        idea.growth_level >= milestone
    }
}
