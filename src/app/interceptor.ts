import {Injectable} from "@angular/core";
import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from "../../node_modules/@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class CredentialsInterceptorService implements HttpInterceptor {
    public intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes('https://maps.googleapis.com')){
            let headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
            });
            return handler.handle(request.clone({headers: headers}))
        }
    }
}