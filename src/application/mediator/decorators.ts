import { Type } from '@nestjs/common';

export const REQUEST_HANDLER_METADATA = 'REQUEST_HANDLER_METADATA';

/**
 * Decorator to register a class as a request handler for a specific request.
 *
 * @param requestClass The class representing the Request/Command/Query
 */
export function RequestHandler(requestClass: Type<unknown>) {
  return (target: Type<unknown>) => {
    // 1. Set metadata for custom mediator using standard Reflect API
    Reflect.defineMetadata(REQUEST_HANDLER_METADATA, requestClass, target);

    // 2. Map command/query to @nestjs/cqrs handlers based on name
    // These metadata keys are what @nestjs/cqrs looks for
    const isQuery = requestClass.name.endsWith('Query');
    if (isQuery) {
      if (!Reflect.hasOwnMetadata('__query__', requestClass)) {
        Reflect.defineMetadata('__query__', { id: requestClass.name }, requestClass);
      }
      Reflect.defineMetadata('__queryHandler__', requestClass, target);
    } else {
      if (!Reflect.hasOwnMetadata('__command__', requestClass)) {
        Reflect.defineMetadata('__command__', { id: requestClass.name }, requestClass);
      }
      Reflect.defineMetadata('__commandHandler__', requestClass, target);
    }

    // 3. Map @nestjs/cqrs "execute" call to standard "handle" method
    if (target.prototype && typeof target.prototype.handle === 'function') {
      target.prototype.execute = target.prototype.handle;
    }
  };
}
