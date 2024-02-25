import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './pages/forum/forum.component';
import { QuestiondetailComponent } from './pages/questiondetail/questiondetail.component';
import { RechercheComponent } from './pages/recherche/recherche.component';

export const routes: Routes = [
  { path: 'forum', component: ForumComponent },
  { path: 'detail-question/:id', component: QuestiondetailComponent },
  { path: 'detail-question/:id', component: QuestiondetailComponent },
  { path: 'recherche',       component: RechercheComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
