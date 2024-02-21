import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reponse } from '../../model/reponse';
import { Question } from '../../model/question';
import { QuestionServiceService } from '../../service/question-service.service';
import { Router, RouterOutlet } from '@angular/router';
import { Vote } from '../../model/vote';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { Technologie } from '../../model/technologie';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  currentUser!: String;
  isReady:boolean=false;
  questform!:FormGroup;
  formGroup!: FormGroup;
  showParagraph: boolean = true;
  repform!: FormGroup;
  listofrep: Reponse[] = [];
  listofQuestion: Question[] = [];
  tech=Technologie
  nbrlike:Number[]=[]
  constructor(private ps:QuestionServiceService,private formBuilder: FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.currentUser = "65d671abe5642f6395ca5727";
    this.initFormmodif();
    this.getallQuestion();
    this.initForm();
    this.initFormquest();
    this.initFormmodif();
  }
  addquestion(){
    this.ps.ajoutQuestion(this.questform.value,"65d671abe5642f6395ca5727").subscribe(
      res=>{
        console.log(res)
          this.getallQuestion()
      }
    )
  }
  initFormquest() {
    this.questform = this.formBuilder.group({
      contenue: ['', Validators.required],
      tech:[[], Validators.required],

  });

  this.questform.valueChanges.subscribe(
    data=>{console.log(this.questform.value)}
  )
}


  getallQuestion(){
    this.ps.getQuestions().subscribe(
      data=>{
        console.log(data)
        this.listofQuestion=data;
        this.isReady=true;
        for(let i of this.listofQuestion){
          let index=this.listofQuestion.indexOf(i);
          this.ps.getnbrvote(this.listofQuestion[index].id).subscribe(
            res=>{
              
              this.nbrlike[index]=res;
            }
          )
        }
      }
    )
  }
  ajouterreponse(post:String){
    console.log(this.repform.value);
    this.ps.addreponse(post,"65d671abe5642f6395ca5727",this.repform.value).subscribe(
    data=>{
      this.getallQuestion();
        }
     
    );
  
  }
  getcmtbypos(post:any){
    this.ps.getreponsebyquestion(post).subscribe(
      data=>{
  
      }
    )
  }
  initForm() {
    this.repform = this.formBuilder.group({
      contenue: ['', Validators.required],

  });

  this.repform.valueChanges.subscribe(
    data=>{console.log(this.repform)}
  )
}
addlike(post:Question){
  this.ps.vote(post.id,"65d671abe5642f6395ca5727",post).subscribe(
    data=>{
        console.log(data)
        this.ps.getnbrvote(post.id).subscribe(
          res=>{
            console.log(this.nbrlike)
            let index=this.listofQuestion.indexOf(post);
            console.log(index)
            this.nbrlike[index]=res;
          }
        )
      }
  )
}
// onTechnologySelected(technology: Technologie) {
//   // Handle the selected technology here
//   this.questform.patchValue({
//     tech: technology
//   });
// }
// onTechnologySelected(select: HTMLSelectElement) {
//   const selectedOptions = Array.from(select.selectedOptions).map(option => option.value);
//   this.questform.get('tech')?.setValue(selectedOptions);
// }
delete(cmt:Reponse){
  this.ps.deletereponse(cmt.id).subscribe(
    res=>{
      this.getallQuestion();
    }
  )
}

modifierre(rep:Reponse){
  this.ps.updateReponse(rep.id,this.formGroup.value).subscribe(
    data=>{
      this.getallQuestion();
    }
  )
}
initFormmodif() {
  this.formGroup = this.formBuilder.group({
    contenue: ['', Validators.required]
  });
}

toggleContent() {
  this.showParagraph = !this.showParagraph;
}
}
