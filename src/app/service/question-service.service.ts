import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { Observable } from 'rxjs';
import { Vote } from '../model/vote';
import { Reponse } from '../model/reponse';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  addquestionUrl="http://localhost:8090/pi/question/add-question";
  getquestionbyIdsurl="http://localhost:8090/pi/question/get-question";
  getQuestionsurl="http://localhost:8090/pi/question/get-questions";
  modifierQuestionUrl="http://localhost:8090/pi/question/update-question";
  deleteQuestionUrl="http://localhost:8090/pi/question/delete-question";
  ////////////////////////////////////////////////////////////////
  voteurl="http://localhost:8090/pi/vote/add-delete-vote";
  nbrvoteurl="http://localhost:8090/pi/vote/nbr-vote";
  ///////////////////////////////////////////////////
  addreponseurl="http://localhost:8090/pi/reponse/add-Reponse";
  getrepbyquestionsurl="http://localhost:8090/pi/reponse/getallcmtbypost";
  deleteReponseUrl="http://localhost:8090/pi/reponse/delete-Reponse";
  modifierReponseUrl="http://localhost:8090/pi/reponse/update-Reponse";
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
  updateQuestion(id:String, q:Question):Observable<Question>{
    return this.http.put<Question>(`${this.modifierQuestionUrl}/${id}`,q);
  }
  deletePost(id:String): any{
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
}
