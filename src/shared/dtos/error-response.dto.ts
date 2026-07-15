export class ErrorResponseDto {
  success!: boolean;
  statusCode!: number;
  resultType!: string;
  data!: any;
  message!: string;
  error!: any;
}
