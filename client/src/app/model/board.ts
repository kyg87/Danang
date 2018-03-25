export class Board{
    _id : string;
    title : string;
    content : string;
    writer : string;
    date : Date;
    type : string;
    filePath : string;

}

export class Main{
    title : string;
    img:string;
}

export class Reply{

    type: Number;     //게시물종류(0 : 스타갤, 1 : 몸갤)
    id : String;
    name: String;     //이름
    password: String; //패스워드
    content: String;  //내용
    regData: Date;    //등록날짜
    depth : Number;   //댓글 위치 (0 첫댓글, 1 대대글 2 대대대글)
}