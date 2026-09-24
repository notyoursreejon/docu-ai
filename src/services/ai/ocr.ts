import Tesseract from 'tesseract.js';

export async function extractTextFromImage(imageUrlOrBuffer: string | Buffer): Promise<string> {
  try {
    const { data: { text } } = await Tesseract.recognize(
      imageUrlOrBuffer,
      'eng',
      { logger: m => console.log(m) }
    );
    return text;
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Failed to extract text from image.");
  }
}
