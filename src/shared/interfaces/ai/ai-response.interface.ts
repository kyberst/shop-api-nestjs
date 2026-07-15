export interface AiResponse {
  message?: string;
  functionCalls?: Array<{
    name: string;
    args: any;
  }>;
  rawText?: string;
}
