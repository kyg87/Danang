import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/map';
import { Parser } from '@angular/compiler';

@Injectable()
export class BoardService{
    constructor(private http:Http){
        console.log('Board Service');
    }

    getBoards(page ,size){
        return this.http.get('http://localhost:3000/api/boards?page='+page + '&size='+ size)
        .map(res=>res.json());
    }

    getBoard(id){
        return this.http.get('http://localhost:3000/api/board/'+id).map(res=>res.json());
    }

    addBoard(newBoard){
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/board',JSON.stringify(newBoard),{headers :headers}).map(res =>res.json());
    }

    deleteBoard(id){
        return this.http.delete('http://localhost:3000/api/board/'+id).map(res=>res.json());
    }

    updateBoard(board) {
        
        console.log(JSON.stringify(board));
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this.http.put('http://localhost:3000/api/board/' + board._id, JSON.stringify(board), { headers: headers }).map(res => res.json());

    }

}
