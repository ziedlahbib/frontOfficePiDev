import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { Reponse } from 'src/app/model/reponse';
import { Technologie } from 'src/app/model/technologie';
import { QuestionServiceService } from 'src/app/service/question-service.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent {
  questions!:Question[];
  nbrlike: Number[] = [];
  contenue!:string;
  currentUser = "65d75a23d70ef60c54dad107";
  questformmodif!:FormGroup;
  tech = Technologie;
  constructor(private qs:QuestionServiceService,
    
    private act: ActivatedRoute,private router: Router,private formBuilder: FormBuilder) { }
    ngOnInit(): void {

      this.get();
      this.gequestionbycontenue();
    }
    initFormquestmodif(data:Question) {
      this.questformmodif = this.formBuilder.group({
        contenue: [data?.contenue, Validators.required],
        tech: [[], Validators.required],
  
      });
  
      this.questformmodif.valueChanges.subscribe(
        data => { console.log(this.questformmodif.value) }
      )
    }
    get(){
      this.act.queryParams.subscribe(
        data=>{
          console.log(data)
          this.contenue=data['filterValue'];
          if(this.contenue==''){
            this.router.navigate(['/forum'])
          }else{
            this.router.navigate(['/recherche']) 
          }
           
  
        }
      )
    }
    gequestionbycontenue(){
      this.qs.getQuestionsByContent(this.contenue).subscribe(
        res=>{
          this.questions=res;
          console.log('contenue',this.contenue)
          for (let question of res) {
            this.initFormquestmodif(question);
            console.log(this.questformmodif.value)  
            let index = this.questions.indexOf(question);
            this.qs.getnbrvote(question.id).subscribe(res => {
              this.nbrlike[index] = res;
            });
          }
        }
      )
    }
    addlike(post: Question) {
      this.qs.vote(post.id, this.currentUser, post).subscribe(
        data => {
          console.log(data)
          this.qs.getnbrvote(post.id).subscribe(
            res => {
              console.log(this.nbrlike)
              let index = this.questions.indexOf(post);
              console.log(index)
              this.nbrlike[index] = res;
            }
          )
        }
      )
    }


    supprimer(item:Question){
      this.qs.deletePost(item.id).subscribe(
        data=>{
          this.gequestionbycontenue();
        }
      )
    }
    showmodifquest:boolean=false;
    toggleContentquest() {
      this.showmodifquest = !this.showmodifquest;
  }
  modifier(item:Question){
    this.qs.updateQuestion(item.id,this.questformmodif.value).subscribe(
      data=>{
        this.gequestionbycontenue();
      }
    )
  }
}
