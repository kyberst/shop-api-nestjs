/**
 * Represents a request that returns a response of type TResponse.
 */
export interface IRequest<TResponse> {
  readonly _responseType?: TResponse;
  [key: string]: any;
}

/**
 * Defines a handler for a request.
 */
export interface IRequestHandler<TRequest extends IRequest<TResponse>, TResponse> {
  handle(request: TRequest): Promise<TResponse>;
}

/**
 * Represents a middleware/pipeline behavior that wraps the execution of request handlers.
 */
export interface IPipelineBehavior {
  handle(request: any, next: () => Promise<any>): Promise<any>;
}

/**
 * Token to inject all registered pipeline behaviors.
 */
export const MEDIATOR_BEHAVIORS = 'MEDIATOR_BEHAVIORS';
