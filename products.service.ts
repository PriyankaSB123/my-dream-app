import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http'
import { HttpClient } from '@angular/common/http';
import {IProduct} from './Iproduct';

import { Observable } from 'rxjs';
import {map,tap, catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _producturl='http://localhost:3000/products.json';
  http:HttpClient;
  constructor(http: HttpClient) { 
    this.http=http;
  }
  getProduct(){
    const promise= new Promise((resolve,reject) =>{
    this.http.get(this._producturl).toPromise()
                                   .then((res:any[]) =>{
                                     if(res !=null && res.length>0){
                                       resolve(res)
                                     }else{
                                       reject("result did not obtained")
                                     }
                                   })
                                   .catch(err =>{})
    });
    return promise;
  }
  /*getProducts(): Observable<IProduct[]>{
    return this.http.get(this._producturl).pipe(
      map((data)=> <IProduct[]> data),
      tap( data => console.log(JSON.stringify(data)) ),
      catchError(this.handlError('prodcutFeatch'))
    )
    
  }*/
  handlError(operation,result?: Observable<IProduct[]>){
    return (error:any): Observable<IProduct[]> => {
      console.log('op='+operation)
      return result;
    }
}
}