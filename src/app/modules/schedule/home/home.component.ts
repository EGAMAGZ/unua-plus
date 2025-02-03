import { generateGreeting } from '@/shared/util/greeting';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  greeting = ""
  todayDate = ""

  constructor() {
    [this.todayDate, this.greeting] = generateGreeting();
  }
}
