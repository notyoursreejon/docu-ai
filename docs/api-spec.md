# DocuAI API Specification

## Authentication
Managed by NextAuth.js (Session / JWT based).

## Documents API

- `GET /api/documents`: List user's documents.
- `POST /api/documents`: Create a new document metadata record.
- `GET /api/documents/:id`: Get document details and structured model.
- `PATCH /api/documents/:id`: Update document content/metadata.
- `DELETE /api/documents/:id`: Delete a document.

## Uploads & Processing

- `POST /api/upload`: Upload image/text files. Returns file keys/URLs.
- `POST /api/ocr`: Submit file keys for OCR processing. Returns raw extracted text.
- `POST /api/documents/:id/process`: Trigger AI to structure the OCR'd text or raw text into the Structured Document Model.

## Generation & Export

- `POST /api/documents/:id/generate`: Initiate PDF or DOCX generation.
  - Body: `{ format: "pdf" | "docx", settings: { ... } }`
  - Response: Job ID for polling (or direct stream if fast enough).
- `GET /api/jobs/:id`: Poll conversion job status.

## Chatbot

- `POST /api/chat`: Send message to the support chatbot (streams response).
