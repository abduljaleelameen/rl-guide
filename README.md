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

This project is configured for deployment on **Render** with GitHub Actions CI/CD.

### Deploy to Render

1. **Create a Render account** at [render.com](https://render.com)

2. **Connect your GitHub repository:**
   - Go to Render Dashboard → New → Web Service
   - Connect your GitHub account and select `abduljaleelameen/rl-guide`

3. **Configure the service:**
   - **Name:** `rl-guide`
   - **Runtime:** Node
   - **Build Command:** `npm install -g pnpm && pnpm install && pnpm build`
   - **Start Command:** `cd apps/docs && pnpm start`
   - **Environment Variables:**
     - `NODE_VERSION`: `20`

4. **Enable Auto-Deploy** (optional):
   - Get your Deploy Hook URL from Render Settings
   - Add `RENDER_DEPLOY_HOOK_URL` to your GitHub repository secrets

### CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically:

- Runs on every push to `dev` or `main` branches
- Installs dependencies and builds the project
- Runs tests
- Triggers Render deployment on successful build to `dev` branch

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS
- **Documentation**: MDX
- **Math**: KaTeX
- **Deployment**: Render

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
