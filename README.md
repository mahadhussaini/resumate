# Resumate 🚀
### AI-Powered Resume & Portfolio Optimizer

Resumate is a premium, high-performance web application designed to help job seekers optimize their professional presence using cutting-edge AI. Built with Next.js 14, Clerk, OpenAI, and Stripe.

## ✨ Features

- **AI Resume Optimizer**: Upload your resume and get instant, actionable feedback on your bullet points, ATS compatibility, and skill gaps.
- **Portfolio AI**: Generate high-impact project descriptions for your personal portfolio using GPT-4.1-nano.
- **Job Matcher**: Paste a job description and see exactly how well your profile matches the requirements, with specific recommendations for improvement.
- **Premium Dashboard**: A sleek, glassmorphism-inspired dark theme dashboard with real-time stats and optimization history.
- **Secure Authentication**: Fully integrated with Clerk for seamless, secure user management.
- **Subscription Support**: Integrated with Stripe for Pro and Enterprise tiered features.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI Engine**: [OpenAI (GPT-4.1-nano)](https://openai.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Environment Variables

Create a `.env.local` file in the root directory and add the following:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pub_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_ENT_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📄 License

This project is licensed under the MIT License.
