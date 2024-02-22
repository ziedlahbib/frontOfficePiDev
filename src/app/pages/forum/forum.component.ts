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
import { MatIconModule } from '@angular/material/icon';
import { Technologie } from '../../model/technologie';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  currentUser!: String;
  isReady: boolean = false;
  questform!: FormGroup;
  hide: boolean = true;
  repform!: FormGroup;
  listofrep: Reponse[] = [];
  repo: Reponse[] = [];
  listofQuestion: Question[] = [];
  tech = Technologie
  nbrlike: Number[] = []
  formGroups: FormGroup[] = [];
  constructor(private ps: QuestionServiceService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.currentUser = "65d621813ece05768b528f25";

    this.initForm();
    this.getallQuestion();
    this.initFormquest();

  }
  addquestion() {
    this.ps.ajoutQuestion(this.questform.value, this.currentUser).subscribe(
      res => {
        console.log(res)
        this.getallQuestion()
      }
    )
  }
  initFormquest() {
    this.questform = this.formBuilder.group({
      contenue: ['', Validators.required],
      tech: [[], Validators.required],

    });

    this.questform.valueChanges.subscribe(
      data => { console.log(this.questform.value) }
    )
  }


  getallQuestion() {
    this.ps.getQuestions().subscribe(data => {
      console.log(data);
      this.listofQuestion = data;
      this.isReady = true;
  
      for (let question of data) {
        if (question.reponses != null) {
          for (let reponse of question.reponses) {
            if (reponse != null) {
              console.log(reponse);
              const formGroup = this.initFormmodif(reponse);
              this.formGroups.push(formGroup);
              this.formGroups = question.reponses.map(reponse => this.initFormmodif(reponse));
              this.showParagraph.push(false);

            }
          }
        }
  
        let index = this.listofQuestion.indexOf(question);
        this.ps.getnbrvote(question.id).subscribe(res => {
          this.nbrlike[index] = res;
        });
      }
    });
  }
  ajouterreponse(post: String) {
    console.log(this.repform.value);
    this.ps.addreponse(post, this.currentUser, this.repform.value).subscribe(
      data => {
        this.getallQuestion();
      }

    );

  }
  getcmtbypos(post: any) {
    this.ps.getreponsebyquestion(post).subscribe(
      data => {

      }
    )
  }

  
  addlike(post: Question) {
    this.ps.vote(post.id, this.currentUser, post).subscribe(
      data => {
        console.log(data)
        this.ps.getnbrvote(post.id).subscribe(
          res => {
            console.log(this.nbrlike)
            let index = this.listofQuestion.indexOf(post);
            console.log(index)
            this.nbrlike[index] = res;
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
  delete(cmt: Reponse) {
    this.ps.deletereponse(cmt.id).subscribe(
      res => {
        this.getallQuestion();
      }
    )
  }

  modifierre(rep: Reponse, index: number) {
    const formGroup = this.formGroups[index];
    this.ps.updateReponse(rep.id, formGroup.value).subscribe(
      data => {
        this.getallQuestion();
      }
    )
  }
  initForm() {
    this.repform = this.formBuilder.group({
      contenue: ['', Validators.required]
    });
  }

  initFormmodif(response: Reponse): FormGroup {
    return this.formBuilder.group({
      contenue: [response?.contenue, Validators.required]
    });
  }
  
  // questionsWithResponses: any[] = [];
  // showResponse: boolean[][] = []; 
  // showParagraphs: boolean[][] = []; // Array to store the visibility state for each comment
  // initializeVisibilityState(responses:Reponse[]) {
  //   this.showParagraphs = responses.map(() => []);
  //   // Initialize the visibility state for each response's form group
  //   responses.forEach((response, responseIndex) => {
  //     Object.keys(response.formGroup.controls).forEach(controlName => {
  //       const controlIndex = parseInt(controlName);
  //       this.showParagraphs[responseIndex][controlIndex] = false;
  //     });
  //   });
  // }
  
  // toggleContent(responseIndex: number, controlIndex: number) {
  //   this.showParagraphs[responseIndex][controlIndex] = !this.showParagraphs[responseIndex][controlIndex];
  // }
  showParagraph: boolean[] = [];
  toggleContent(index:number) {
    console.log(index)
    console.log(this.showParagraph[index])
    this.showParagraph[index] = !this.showParagraph[index];
}
}
