import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/map';

@Injectable()
export class BoardService{
    constructor(private http:Http){
        console.log('Board Service');
    }

    getBoards(){
        return this.http.get('http://localhost/api/boards')
        .map(res=>res.json());
    }

    getBoard(id){
        return this.http.get('http://localhost/api/board/'+id).map(res=>res.json());
    }

    addBoard(newBoard){
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost/api/board',JSON.stringify(newBoard),{headers :headers}).map(res =>res.json());
    }
}
