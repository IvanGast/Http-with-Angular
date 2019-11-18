import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("HANDLE", req);
    const clone = req.clone({
      headers: req.headers.append("Auth", "SOME RANDOM TOKEN")
    });
    console.log("CLONE", clone);
    return next.handle(clone);
  }
}
