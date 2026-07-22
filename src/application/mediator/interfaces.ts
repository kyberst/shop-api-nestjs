/**
 * Represents a request that returns a response of type TResponse.
 */
export abstract class IRequest<TResponse = unknown> {
  declare readonly _responseType?: TResponse;
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
  handle(request: unknown, next: () => Promise<unknown>): Promise<unknown>;
}

/**
 * Token to inject all registered pipeline behaviors.
 */
export const MEDIATOR_BEHAVIORS = 'MEDIATOR_BEHAVIORS';

/**
 * Interface for the mediator that dispatches requests.
 */
export interface IMediator {
  send<TResponse>(request: IRequest<TResponse>): Promise<TResponse>;
}

export const IMediator = Symbol('IMediator');
