import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

type ErrorInit = {
  statusCode?: number; // <- opcional
  message: string;
  details?: any;
  internalCode?: string;
  path?: string;
};

type ErrorDefault = Omit<ErrorInit, 'statusCode'>;

export class ErrorReturn {
  readonly success = false;
  readonly statusCode: number;
  readonly message: string;
  readonly details?: any;
  readonly internalCode?: string;
  readonly timestamp: string;
  readonly path?: string;

  constructor(init: ErrorInit) {
    this.statusCode = init.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
    this.message = init.message;
    this.details = init.details;
    this.internalCode = init.internalCode;
    this.timestamp = new Date().toISOString();
    this.path = init.path;
  }

  static BadRequest(err: ErrorDefault) {
    return new ErrorReturn({ ...err, statusCode: HttpStatus.BAD_REQUEST });
  }
  static NotFound(err: ErrorDefault) {
    return new ErrorReturn({ ...err, statusCode: HttpStatus.NOT_FOUND });
  }
  static InternalServer(err: ErrorDefault) {
    return new ErrorReturn({
      ...err,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
  static Unauthorized(err: ErrorDefault) {
    return new ErrorReturn({ ...err, statusCode: HttpStatus.UNAUTHORIZED });
  }
  static Forbidden(err: ErrorDefault) {
    return new ErrorReturn({ ...err, statusCode: HttpStatus.FORBIDDEN });
  }
  static Conflict(err: ErrorDefault) {
    return new ErrorReturn({ ...err, statusCode: HttpStatus.CONFLICT });
  }
  static UnprocessableEntity(err: ErrorDefault) {
    return new ErrorReturn({
      ...err,
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}

export const toHttpException = (e: ErrorReturn) =>
  new HttpException(
    {
      success: e.success,
      statusCode: e.statusCode,
      message: e.message,
      details: e.details,
      internalCode: e.internalCode,
      timestamp: e.timestamp,
      path: e.path,
    },
    e.statusCode,
  );

export const fromClassValidator = (errors: ValidationError[], path?: string) =>
  ErrorReturn.BadRequest({
    message: 'Erro de validação.',
    details: errors.map((er) => ({
      property: er.property,
      constraints: er.constraints,
      children: er.children?.length ? er.children : undefined,
      //Pode ir dado sensivel
      value: er.value,
    })),
    path,
    internalCode: 'VALIDATION_ERROR',
  });

// type guard enxuto pra erros do class-validator
const isValidationErrorArray = (e: unknown): e is ValidationError[] =>
  Array.isArray(e) &&
  e.every((x) => typeof x === 'object' && x !== null && 'property' in x);

export const AutoErrorReturn = (e: unknown): never => {
  if (e instanceof HttpException) throw e;

  if (isValidationErrorArray(e)) {
    throw toHttpException(fromClassValidator(e));
  }

  const err = e as Error;
  throw toHttpException(
    ErrorReturn.InternalServer({
      message: err?.message || 'Erro interno do servidor',
      //Pode ir dado sensivel
      details: err?.stack,
    }),
  );
};
