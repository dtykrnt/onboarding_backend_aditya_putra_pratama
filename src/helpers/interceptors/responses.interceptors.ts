import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { IResponse, Pagination, ResponseTypes } from '../../interface';

@Injectable()
export class ResponsesInterceptors<T>
  implements NestInterceptor<T, IResponse<T>>
{
  private handleDetailResponse(
    context: ExecutionContext,
    data: any,
  ): IResponse<any> {
    const code = context.switchToHttp().getResponse().statusCode.toString();
    return {
      response_schema: {
        response_code: code,
        response_message: 'Success',
      },
      response_output: {
        detail: data,
      },
    };
  }

  private handleListResponse(
    context: ExecutionContext,
    data: any,
    pagination: Pagination,
  ): IResponse<any> {
    const code = context.switchToHttp().getResponse().statusCode.toString();
    return {
      response_schema: {
        response_code: code,
        response_message: 'Success',
      },
      response_output: {
        list: {
          pagination: pagination,
          content: data,
        },
      },
    };
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponse<T>> | Promise<Observable<IResponse<T>>> {
    return next.handle().pipe(
      map((content: any) => {
        const type = Array.isArray(content)
          ? ResponseTypes.LIST
          : ResponseTypes.DETAIL;
        // return this.responseService.handleResponseType(type, context, content);
        switch (type) {
          case ResponseTypes.DETAIL:
            return this.handleDetailResponse(context, content);
          case ResponseTypes.LIST:
            return this.handleListResponse(
              context,
              content,
              content.pagination,
            );
          // case ResponseTypes.ERROR:
          //   return this.handleErrorResponse(content.data);
          default:
            return null;
        }
      }),
      tap((data) => console.log({ data })),
    );
  }
}
