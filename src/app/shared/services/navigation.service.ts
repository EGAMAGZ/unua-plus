import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleRouteContext, PathContext } from '@/shared/model/route-context';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {


  currentLabel = signal("")
  router = inject(Router);

  constructor() { }

  navigate(route: string) {
    this.router.navigate([route])
  }
}
