import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { IResponse, Pagination, ResponseTypes } from '../../interface';

interface IError {
  message: string;
  code: string;
}
@Injectable()
export class ResponsesInterceptors<T>
  implements NestInterceptor<T, IResponse<T>>
{
  private handleDetailResponse(
    code: string,
    data: any,
    message: string,
  ): IResponse<any> {
    return {
      response_schema: {
        response_code: code,
        response_message: message,
      },
      response_output: {
        detail: data,
      },
    };
  }

  private handleListResponse(
    code: string,
    data: any,
    pagination: Pagination,
    message: string,
  ): IResponse<any> {
    return {
      response_schema: {
        response_code: code,
        response_message: message,
      },
      response_output: {
        list: {
          pagination: pagination,
          content: data,
        },
      },
    };
  }

  private handleErrorResponse(code: string, message: string): IResponse<any> {
    return {
      response_schema: {
        response_code: code,
        response_message: message,
      },
      response_output: {},
    };
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponse<T>> | Promise<Observable<IResponse<T>>> {
    return next.handle().pipe(
      map((res: any) => this.responseHanlder(res, context)),
      tap((data) => console.log({ data })),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  private responseHanlder(res: any, context: ExecutionContext): IResponse<T> {
    const { data, pagination, message } = res;
    let type = Array.isArray(data) ? ResponseTypes.LIST : ResponseTypes.DETAIL;
    if (data == undefined) {
      type = ResponseTypes.ERROR;
    }
    const code = context.switchToHttp().getResponse().statusCode.toString();
    switch (type) {
      case ResponseTypes.DETAIL:
        return this.handleDetailResponse(code, data, message);
      case ResponseTypes.LIST:
        return this.handleListResponse(code, data, pagination, message);
      case ResponseTypes.ERROR:
        return this.handleErrorResponse(code, message);
      default:
        return null;
    }
  }

  private errorHandler(
    exception: HttpException,
    context: ExecutionContext,
  ): IResponse<T> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    return response.status(status).json({
      response_schema: {
        response_code: status.toString(),
        response_message: exception.message,
      },
      response_output: {},
    });
  }
}
