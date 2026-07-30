import fs from 'fs/promises';
import pdfParse from 'pdf-parse';

export class ResumeParserService {
  /**
   * Extracts text from a PDF file
   * @param filePath The absolute path to the PDF file
   * @returns The extracted text as a string
   */
  static async extractText(fileInput: string | Buffer): Promise<string> {
    try {
      let dataBuffer: Buffer;
      if (typeof fileInput === 'string') {
        dataBuffer = await fs.readFile(fileInput);
      } else {
        dataBuffer = fileInput;
      }
      const data = await pdfParse(dataBuffer);
      return data.text;
    } catch (error: any) {
      throw new Error(`Failed to parse PDF: ${error.message}`);
    }
  }
}
