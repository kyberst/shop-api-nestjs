export interface IApiResponse<T = void> {
  success: boolean;
  statusCode: number;
  resultType: string;
  data: T | null;
  message: string;
  error: unknown;
}
