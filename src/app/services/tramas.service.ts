import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { throwError, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';

const requestOptions = {
  headers : new HttpHeaders(
    {
      'Accept' : 'application/json',
      'Authorization' : 'key ttn-account-v2.DW8lpLi9JBR_hN8pde_BqjC4UJyxL1O1Pvi0U9vMabI'
    }
  )
};

const keyApi = "ttn-account-v2.DW8lpLi9JBR_hN8pde_BqjC4UJyxL1O1Pvi0U9vMabI";
const url = "https://wstramas.data.thethingsnetwork.org/api/v2/query/tramas007?last=20s";

@Injectable({
  providedIn: 'root'
})
export class TramasService  {//implements HttpInterceptor
  constructor(private http:HttpClient, private nativeHttp: HTTP) { }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent){
      console.log("Error : ", error.error.message);
    }
    else {
      console.error(
        error.status,error.error
      );
    }
    return throwError("Something bad happend");
  }

  /*intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders:{
        Accept: 'application/json',
        'Content-Type' : 'application/json',
        Authorization : 'key '+keyApi
      }
    });

    console.log(request);
    return next.handle(request);
  }*/

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getDataTrash(): Observable<any>{
    return this.http.get(url, requestOptions).pipe(
      map(this.extractData),catchError(this.handleError));
  }

  getHTTPnative(): Observable<any> {
    let httpCall = this.nativeHttp.get(url,{},{
      'Accept' : 'application/json',
      'Authorization' : 'key ttn-account-v2.DW8lpLi9JBR_hN8pde_BqjC4UJyxL1O1Pvi0U9vMabI'
    });

    return from(httpCall).pipe(
      catchError(this.handleError));
  }
}
