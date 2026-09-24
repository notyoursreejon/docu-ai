![DocuAI Banner](./public/banner.jpg)

# DocuAI

DocuAI is a next-generation SaaS platform that leverages Artificial Intelligence and Optical Character Recognition (OCR) to seamlessly convert raw text and physical images into professionally formatted PDF and Word documents.

![DocuAI Dashboard](https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200&auto=format&fit=crop)

## 🚀 Features

* **Multi-Format Ingestion**: Upload batch images (JPG, PNG) or paste raw text.
* **AI-Powered OCR Pipeline**: Automatically extracts text from images using Tesseract.js and semantically structures it using the Vercel AI SDK.
* **Rich Text Editor**: A Notion-style editor built on TipTap, complete with slash commands, bubble menus, and auto-save indicators.
* **In-Editor AI Magic**: Select any text and use the AI toolbar to "Summarize", "Make Professional", or "Fix Grammar" inline.
* **Contextual Chatbot**: A floating assistant that understands the exact document you are working on, allowing for real-time RAG (Retrieval-Augmented Generation) assistance.
* **1-Click Export**: Instantly preview and export your documents to perfectly formatted `.PDF` and `.DOCX` files.
* **Enterprise Admin & Billing**: Comprehensive user settings, subscription tiers, and a system metrics Admin Console.
* **Stunning UI/UX**: Built with a 2026-era design aesthetic featuring Tailwind CSS, shadcn/ui, dark mode, and fluid animations.

## 🛠️ Tech Stack

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
* **Database**: [PostgreSQL](https://www.postgresql.org/) & [Prisma ORM](https://www.prisma.io/)
* **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Auth.js)
* **AI & LLM**: [Vercel AI SDK](https://sdk.vercel.ai/) (OpenAI / Anthropic compatible)
* **OCR Engine**: [Tesseract.js](https://tesseract.projectnaptha.com/)
* **Editor**: [TipTap](https://tiptap.dev/)

## 💻 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites
* Node.js (v18 or higher)
* A PostgreSQL database (or modify Prisma for SQLite)
* An OpenAI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/docuai.git
   cd docuai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   # Database connection string
   DATABASE_URL="postgresql://user:password@localhost:5432/docuai"
   
   # NextAuth Secrets
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-string"

   # AI Provider
   OPENAI_API_KEY="sk-your-openai-api-key"
   ```

4. **Initialize the Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

* `/src/app`: Next.js App Router pages (Landing, Auth, Dashboard, Admin).
* `/src/components`: Reusable UI components (shadcn), Chatbot, FileUploader.
* `/src/components/editor`: The advanced TipTap rich text editor.
* `/src/lib`: Database instantiations and utility functions.
* `/src/app/api`: Serverless route handlers for AI processing, Generation, and OCR.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

