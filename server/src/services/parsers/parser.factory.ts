import { IResumeParser } from './parser.interface';
import { MockParser } from './mock.parser';
// import { LlamaParser } from './llama.parser'; // Future implementation

export class ParserFactory {
  static getParser(provider: string = 'mock'): IResumeParser {
    switch (provider) {
      case 'llama':
        // return new LlamaParser();
        throw new Error('Llama parser not implemented yet');
      case 'mock':
      default:
        return new MockParser();
    }
  }
}
