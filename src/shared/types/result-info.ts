import { HttpStatus } from './http-status';

export class ResultInfo {
  constructor(
    public readonly success: boolean,
    public readonly statusCode: HttpStatus,
    public readonly resultType: string,
    public readonly message: string,
  ) {}

  static Ok(type: string, msg: string) {
    return new ResultInfo(true, HttpStatus.OK, type, msg);
  }

  static Created(type: string, msg: string) {
    return new ResultInfo(true, HttpStatus.CREATED, type, msg);
  }

  static BadRequest(type: string, msg: string) {
    return new ResultInfo(false, HttpStatus.BAD_REQUEST, type, msg);
  }

  static NotFound(type: string, msg: string) {
    return new ResultInfo(false, HttpStatus.NOT_FOUND, type, msg);
  }

  static Conflict(type: string, msg: string) {
    return new ResultInfo(false, HttpStatus.CONFLICT, type, msg);
  }

  static Forbidden(type: string, msg: string) {
    return new ResultInfo(false, HttpStatus.FORBIDDEN, type, msg);
  }

  static InternalError(msg: string) {
    return new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', msg);
  }
}
