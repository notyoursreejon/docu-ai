# DocuAI Architecture

## Overview
DocuAI is a SaaS application that converts text and images into structured PDF and DOCX files. The architecture leverages Next.js for full-stack capabilities, separating the UI from the AI services, document rendering engines, and data layer.

## Core Modules
1. **Web Frontend (Next.js App Router)**
   - Landing Page, Dashboard, Document Editor (TipTap), Upload UI.
   - Built with Tailwind CSS and shadcn/ui.
   
2. **Backend API (Next.js Route Handlers & Server Actions)**
   - Authentication (NextAuth).
   - Document & Job CRUD operations.
   - File upload proxying.

3. **AI & OCR Services (`/services/ai`)**
   - Orchestrates Tesseract.js / Vision API for OCR.
   - Invokes LLM for text cleanup, formatting, and the support chatbot.
   
4. **Document Generation Engine (`/services/document`)**
   - Translates the intermediate Structured Document Model to PDF (using react-pdf or similar).
   - Translates the intermediate model to DOCX (using docx.js).

5. **Storage & Data**
   - PostgreSQL (via Prisma) for persisting Users, Documents, Jobs.
   - Local disk or S3 bucket for storing temporary uploads and generated files.

## Document Data Model Concept
Raw input -> OCR text -> Cleaned text -> **Structured Document Model** -> PDF / DOCX

```typescript
type StructuredDocument = {
  metadata: {
    title: string;
    author?: string;
  };
  sections: Array<{
    type: "heading" | "paragraph" | "list" | "table" | "image";
    content: string | any;
    format?: any;
  }>;
};
```
