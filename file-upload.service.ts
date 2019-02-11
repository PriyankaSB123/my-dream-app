import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  fileUploadUrl='/api/fileUpload';
  http:HttpClient;

  constructor(http:HttpClient) { 
    this.http=http;
  }

  fileUpload(fileItem:File,extractedData:Object){
    const formData:FormData=new FormData();
    formData.append('file',fileItem,fileItem.name)
    for(let key in  extractedData){
      formData.append(key,extractedData[key])
    }
    const request= new HttpRequest("POST",this.fileUploadUrl,this.http)
    return this.http.request(request)

}
}
