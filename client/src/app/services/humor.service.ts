import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/map';

@Injectable()
export class HumorService{
    constructor(private http:Http){
        console.log('Humor Service');
    }

    getHumors(page ,size){
        return this.http.get('http://localhost:3000/api/star?page='+page + '&size='+ size)
        .map(res=>res.json());
    }

    getHumor(id){
        return this.http.get('http://localhost:3000/api/star/'+id).map(res=>res.json());
    }

    getBodyGalls(page ,size){
        return this.http.get('http://localhost:3000/api/bodygall?page='+page + '&size='+ size)
        .map(res=>res.json());
    }

    getBodyGall(id){
        return this.http.get('http://localhost:3000/api/bodygall/'+id).map(res=>res.json());
    }

    // addBoard(newBoard){
    //     var headers = new Headers();

    //     headers.append('Content-Type', 'application/json');
    //     return this.http.post('http://localhost:3000/api/board',JSON.stringify(newBoard),{headers :headers}).map(res =>res.json());
    // }
}
