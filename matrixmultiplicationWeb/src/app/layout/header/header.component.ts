import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private router: Router) {}

  onOptionChange(event: any) {
    const selectedValue = event.target.value;

    if (selectedValue === '1') {
      this.router.navigate(['']);
    } else if (selectedValue === '2') {
      this.router.navigate(['/input/list']);
    } else if (selectedValue === '3') {
      this.router.navigate(['/home']);
    }
  }
}
