import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ForumComponent } from './pages/forum/forum.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { QuestiondetailComponent } from './pages/questiondetail/questiondetail.component';
import { RechercheComponent } from './pages/recherche/recherche.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    QuestiondetailComponent,
    RechercheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),

  ],
  providers: [    provideAnimations(), // required animations providers
  provideToastr(), // Toastr providers
],
  bootstrap: [AppComponent]
})
export class AppModule { }
