import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { Reponse } from 'src/app/model/reponse';
import { Technologie } from 'src/app/model/technologie';
import { QuestionServiceService } from 'src/app/service/question-service.service';

@Component({
  selector: 'app-questiondetail',
  templateUrl: './questiondetail.component.html',
  styleUrls: ['./questiondetail.component.css']
})
export class QuestiondetailComponent {
  currentUser = "65d75a23d70ef60c54dad107";
  role="ss";
  isReady: boolean = false;
  questform!: FormGroup;
  questformmodif!:FormGroup;
  formGroups: FormGroup[] = [];
  repform!: FormGroup;
  tech = Technologie
  listofrep: Reponse[] = [];
  repo: Reponse[] = [];
  nbrlike!: Number;
  question!:Question;
  isReadyf:boolean=false;
constructor(private ps: QuestionServiceService, private formBuilder: FormBuilder, private route: Router,
  private ar:ActivatedRoute){}
  ngOnInit(): void { 
this.getQuestion(this.ar.snapshot.params['id']);
this.initquestform(this.ar.snapshot.params['id']);
    
  }
  //////////////////////////Question////////////////////////
getQuestion(id:String){
  this.ps.getQuestionbyId(id).subscribe(
    data=>{
      console.log(data)
      this.question=data;
      this.isReady=true;

    }
  )
}
initquestform(data:any){
  this.questform = this.formBuilder.group({
    contenue: [data?.contenue, Validators.required],
    tech: [[], Validators.required],

  });

  this.questform.valueChanges.subscribe(
    data => { console.log(this.questform.value) }
  )
}
addlike(post: Question) {
  this.ps.vote(post.id, this.currentUser, post).subscribe(
    data => {
      console.log(data)
      this.ps.getnbrvote(post.id).subscribe(
        res => {
          console.log(this.nbrlike)
          console.log(post)
          this.nbrlike = res;
        }
      )
    }
  )
}
supprimer(item:Question){
  this.ps.deletePost(item.id).subscribe(
    data=>{
    }
  )
}
showmodifquest:boolean=false;
toggleContentquest() {
  this.showmodifquest = !this.showmodifquest;
  this.isReadyf=true;
  this.initquestform(this.question);
}
modifier(item:Question){
  this.ps.updateQuestion(item.id,this.questformmodif.value).subscribe(
    data=>{
      this.getQuestion(item.id);
    }
  )
}
}
