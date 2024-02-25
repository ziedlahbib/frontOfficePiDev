import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './index.html',
  styleUrls: ['./style.css']
})
export class AppComponent {
  title = 'frontOfficePiDev';
  constructor(
    private router:Router
) {

}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.router.navigate(['recherche'], { queryParams: { filterValue: filterValue }});
    
    
}
}
