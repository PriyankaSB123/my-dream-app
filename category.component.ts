import { Component,OnInit } from '@angular/core';
import {Category} from './category';
import {ProductsService} from './products.service';
import {IProduct} from './Iproduct';
import { Observable, of, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FormGroup, NgForm } from '@angular/forms';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  
categoryIdcolor={color:'red'};
categoryNamecolor={color:'red'};
selectTypecolor={color:'red'}

isDisabled=true;
active=false;
categoryName='';
productService:ProductsService;
productList:IProduct[];
squareList:number[]=[];
fileToUpload:File=null;
fileUploadService:FileUploadService;

constructor(productService:ProductsService,fileUploadService:FileUploadService){
  this.productService=productService;
  this.fileUploadService=fileUploadService
}
  
  ngOnInit() {
    this.getProductList()
  }
  getProductList(){
    console.log("in getproductlist")
   this.productService.getProduct()
            .then((res:any[]) =>{
              //getSkuList()
              this.productList=res
            })
            .catch(err =>{
              console.log("err")
            })
            console.log(JSON.stringify(this.productList))
           /* of(1,2,3,4, 6).pipe(
              filter(num =>num %2 ===0),
              map(num=>num*num)
            )
            .subscribe(value =>{this.squareList.push(value)})*/
            

    
  }
  submitCategory(){
    console.log("sbmitted to url category")
  }
  changeColorCategoryId(){
    if(this.categoryIdcolor.color==='red'){
      this.categoryIdcolor.color='blue'
    }else{
    this.categoryIdcolor.color='red'
    }  
    
  }
  changeColorCategoryName(){
    if(this.categoryNamecolor.color==='red'){
      this.categoryNamecolor.color='blue'
    }else{
    this.categoryNamecolor.color='red'
    }  
  }
  changeColorSelectType(){
    if(this.selectTypecolor.color==='red'){
      this.selectTypecolor.color='blue'
    }else{
    this.selectTypecolor.color='red'
    }  
  }
  setValue(e){
    this.categoryName=e.target.value
    if(this.categoryName!=''){
      this.isDisabled=false;
    }else{this.isDisabled=true;}
  }
  handleSubmit(event:any,statusNgForm:NgForm,statusFormGroup:FormGroup){
    event.preventDefault()
    if(statusNgForm.submitted){
      let submittedData=statusFormGroup.value;

      this.fileUploadService.fileUpload(
        this.fileToUpload,submittedData).subscribe(
          event =>this.handleProgress(event),
          error =>{
            console.log("server Error") 
          });
          statusNgForm.resetForm({})

      
    }

  }
  handleInput(files:FileList){
    let fileItem=files.item(0)
    console.log('file input has changed:',fileItem)
    this.fileToUpload=fileItem;

  }
  handleProgress(event){
    console.log("percent"+event)

  }

}
