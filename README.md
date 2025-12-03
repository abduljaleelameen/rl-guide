# RL Guide - Reinforcement Learning for LLMs

A comprehensive documentation site for learning Reinforcement Learning techniques used in training Large Language Models.

## Overview

Master the techniques behind ChatGPT, Claude, and DeepSeek. From RLHF basics to advanced GRPO implementations with hands-on examples.

## What You'll Learn

- **RL Fundamentals** - Understand the agent-environment loop, rewards, and how AI learns from feedback
- **PPO vs GRPO** - Compare the two main algorithms powering modern LLM training
- **Reward Functions** - Design effective reward functions for sentiment, accuracy, and more
- **9 Code Examples** - Hands-on implementations from beginner to advanced levels
- **Training Guide** - Optimize memory, debug issues, and configure hyperparameters
- **Production Ready** - Deploy with A/B testing, monitoring, and automated rollback

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/abduljaleelameen/rl-guide.git
cd rl-guide

# Install dependencies
pnpm install

# Build packages
pnpm build

# Start development server
cd apps/docs
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the documentation.

## Project Structure

```text
apps/
  docs/                    # Documentation site
    app/                   # Next.js app
    content/docs/          # MDX documentation content
      reinforcement-ai/    # RL documentation
        introduction/      # Getting started guides
        fundamentals/      # Core concepts
        examples/          # Code examples
        training/          # Training guides
        advanced/          # Advanced topics
    components/            # React components
    public/                # Static assets
```

## Deployment

This project is configured for deployment on Vercel with GitHub Actions CI/CD.

### Environment Variables

Set the following secrets in your GitHub repository:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS
- **Documentation**: MDX
- **Math**: KaTeX
- **Deployment**: Vercel

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
