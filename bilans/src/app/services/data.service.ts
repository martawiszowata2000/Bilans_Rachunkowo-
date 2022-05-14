import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class DataService {
    constructor(private httpClient: HttpClient) {}
    startUpload(){
        this.httpClient.get("../data.json").subscribe((data:any) =>
            console.log(data)
          )
        // var file = event.item(0);
    
        // console.log(file)    
    
    
      }

    getAccountBalanceList() {
        // for (const jsonObject in jsonResponse) {
        //     if (undefined !== jsonResponse[jsonObject].name && null !== jsonResponse[jsonObject].name) {
        //         console.log('name' + jsonResponse[jsonObject].name);
        //     }
        // }
    }
}