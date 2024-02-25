import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { Observable } from 'rxjs';
import { Vote } from '../model/vote';
import { Reponse } from '../model/reponse';
import { FileDB } from '../model/file-db.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  addquestionUrl="/api/question/add-question";
  getquestionbyIdsurl="/api/question/get-questionbyid";
  getQuestionsurl="/api/question/get-questions";
  modifierQuestionUrl="/api/question/update-question";
  deleteQuestionUrl="/api/question/delete-question";
  getquestionbycontenueurl="/api/question/get-questions-by-contenue";
  ////////////////////////////////////////////////////////////////
  voteurl="/api/vote/add-delete-vote";
  nbrvoteurl="/api/vote/nbr-vote";
  ///////////////////////////////////////////////////
  addreponseurl="/api/reponse/add-Reponse";
  getrepbyquestionsurl="/api/reponse/getallcmtbypost";
  deleteReponseUrl="/api/reponse/delete-Reponse";
  modifierReponseUrl="/api/reponse/update-Reponse";
  getreponsebyid="/api/reponse/get-Reponse"
  constructor(private http : HttpClient) { }
  ajoutQuestion(q :Question,idu:String): Observable<Question>{
    return this.http.post<Question>(`${this.addquestionUrl}/${idu}`,q);
  }
  getQuestions(): Observable<Question[]>{
    return this.http.get<Question[]>(`${this.getQuestionsurl}`);

  }
  getQuestionbyId(id:String): Observable<Question>{
    return this.http.get<Question>(`${this.getquestionbyIdsurl}/${id}`);

  }
  getQuestionsByContent(content: string): Observable<Question[]> {
    const params = new HttpParams().set('contenue', content);
    return this.http.get<Question[]>(`${this.getquestionbycontenueurl}`, { params: params });
  }
  updateQuestion(id:String, q:Question):Observable<Question>{
    return this.http.put<Question>(`${this.modifierQuestionUrl}/${id}`,q);
  }
  deletePost(id:String): Observable<any>{
    return this.http.delete(`${this.deleteQuestionUrl}/${id}`);
  }
  ////////////////////////////////////////////
  vote(idq:String, idu:String,vote:Question):Observable<Vote>{
    return this.http.post<Vote>(`${this.voteurl}/${idu}/${idq}`,vote);
  }
  getnbrvote(idp:String): Observable<Number>{
    return this.http.get<Number>(`${this.nbrvoteurl}/${idp}`);

  }
  //////////////////////////////////////////////
  ////////////////////////////////////////////:
  addreponse(idq:String, idu:String,cmt:Reponse):Observable<Reponse>{
    return this.http.post<Reponse>(`${this.addreponseurl}/${idu}/${idq}`,cmt);
  }
  getreponsebyquestion(id:String): Observable<Reponse[]>{
    return this.http.get<Reponse[]>(`${this.getrepbyquestionsurl}/${id}`);

  }
  deletereponse(id:String): Observable<any>{
    return this.http.delete(`${this.deleteReponseUrl}/${id}`);
  }
  updateReponse(id:String, q:Reponse):Observable<Reponse>{
    return this.http.put<Reponse>(`${this.modifierReponseUrl}/${id}`,q);
  }
  ////////////////////////////file/////////////
  uploadfilefurl="/api/File/uploadf";
  getfiledetailurl="/api/File/filesdetail";
  deletefileurl="/api/File/filesdetail";
  deletefileUrl="/api/File/delete-file";
  filebyreponseurl="/api/File/filesdetail"
  upload(file :File): Observable<String[]>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<String[]>(`${this.uploadfilefurl}`,formData)
    };
    getFilesdetail(id:String): Observable<FileDB> {
      return this.http.get<FileDB>(`${this.getfiledetailurl}/${id}`);
    }
    getFilesbyreponse(id:String): Observable<FileDB[]> {
      return this.http.get<FileDB[]>(`${this.filebyreponseurl}/${id}`);
    }
    affecterfileaureponse(id:String,idf:String[],reponse :Reponse):Observable<Reponse>{
      return this.http.put<Reponse>("/api/File/affecter-fileToReponse/"+id+"/"+idf,reponse);
    }
    deletefile(id:String): Observable<any>{
      return this.http.delete(`${this.deletefileUrl}/${id}`);
    }
}
