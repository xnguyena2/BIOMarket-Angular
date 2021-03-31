import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ok } from "assert";
import { EMPTY, throwError } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // send cloned request with header to the next handler.
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          if (error instanceof HttpErrorResponse &&
            error.status == 401 || error.status == 0) {

            this.router.navigate(["/login"]);
          }
          return throwError(error);
        })
      );
  }
}
