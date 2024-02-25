import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { FileDB } from 'src/app/model/file-db.model';
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
  tech = Technologie
  listofrep: Reponse[] = [];
  repo: Reponse[] = [];
  nbrlike!: Number;
  question!:Question;
  isReadyf:boolean=false;
constructor(private ps: QuestionServiceService, private formBuilder: FormBuilder, private route: Router,
  private ar:ActivatedRoute){}
  ngOnInit(): void { 
    this.initForm();
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
  this.ps.updateQuestion(item.id,this.questform.value).subscribe(
    data=>{
      this.getQuestion(item.id);
      this.showmodifquest=false;
    }
  )
}
//////////////////////////:reponse////////////::
selectedFiles!: FileList ;
fileInfos!: Observable<any>;
file!: FileDB;
selectFile(event:any) {
  this.selectedFiles = event.target.files;
}
// Assuming these variables are declared in your component class
files: any[] = []; // Change 'any' to the appropriate type if you have a specific type for files
filesid: string[] = [];

upload(): void {
  if (!this.selectedFiles) {
    console.error("No files selected.");
    return;
  }

  const uploadObservables: Observable<any>[] = [];

  for (let i = 0; i < this.selectedFiles.length; i++) {
    const currentFile = this.selectedFiles.item(i);
    if (!currentFile) {
      console.error("File is null or undefined.");
      continue;
    }
    console.log(currentFile);
    
    uploadObservables.push(this.ps.upload(currentFile));
  }

  forkJoin(uploadObservables).subscribe(
    uploadResponses => {
      const getFileDetailsObservables: Observable<any>[] = [];
      
      for (const uploadResponse of uploadResponses) {
        getFileDetailsObservables.push(this.ps.getFilesdetail(uploadResponse));
      }

      forkJoin(getFileDetailsObservables).subscribe(
        fileDetails => {
          console.log("Uploaded file details:", fileDetails);
          for (const fileDetail of fileDetails) {
            this.files.push(fileDetail);
            this.filesid.push(fileDetail.id)
          }

          // Process the uploaded file details as needed
        },
        error => {
          console.error("Error getting file details:", error);
        }
      );
    },
    error => {
      console.error("Error uploading file:", error);
    }
  );
}

supprimerfile(idr:String,file:FileDB){
  this.ps.deletefile(file.id).subscribe(
    data=>{
      this.ps.getFilesbyreponse(idr).subscribe(
        res=>{
          this.files=[];
          for( let f  of res){
            this.files.push(f);
          }
        }
      )
    }
  )
}
/////////////////////////////////////file////////
formGroups: FormGroup[] = [];
showParagraph: boolean[] = [];
repform!: FormGroup;
toggleContent(index:number) {
  console.log(index)
  console.log(this.showParagraph[index])
  this.showParagraph[index] = !this.showParagraph[index];
  //this.initFormmodif()
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
ajouterreponse(post: String) {
  console.log(this.repform.value);
  this.ps.addreponse(post, this.currentUser, this.repform.value).subscribe(
    data => {
        if(this.filesid!=null){
          console.log(this.filesid)
          this.ps.affecterfileaureponse(data.id,this.filesid,data).subscribe(
            res=>{
              this.ps.getFilesbyreponse(data.id).subscribe(
                resd=>{
                    this.files=resd;
                }
              )
            }
          )
        }
      this.getQuestion(this.ar.snapshot.params['id'])
    }

  );
}
modifierre(rep: Reponse, index: number) {
  const formGroup = this.formGroups[index];
  this.ps.updateReponse(rep.id, formGroup.value).subscribe(
    data => {
      this.getQuestion(rep.id);
    }
  )
}
delete(cmt: Reponse) {
  this.ps.deletereponse(cmt.id).subscribe(
    res => {
      this.getQuestion(this.ar.snapshot.params['id']);
    }
  )
}
}
