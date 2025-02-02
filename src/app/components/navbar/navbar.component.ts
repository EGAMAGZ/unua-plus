import { Component, inject, signal } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navigation = inject(NavigationService);
}
