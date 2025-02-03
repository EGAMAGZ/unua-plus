import { effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { generateRoute } from '../util/router';
import { AppModule } from '@/routes/app-module';
import { PlaygroundRoutes } from '@/modules/playground/routes/playground-routes';
import { ModuleRouteContext, PathContext } from '../model/route-context';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {


  currentLabel = signal("")
  router = inject(Router);

  constructor() {}

  navigate(module: ModuleRouteContext, path?: PathContext) {
    const route = generateRoute(
      module,
      {
        path
      }
    );

    if (path?.label) {
      this.currentLabel.set(path.label)
    }

    this.router.navigate([route])
  }

  playgroundRoute() {
    this.navigate(AppModule.playground, PlaygroundRoutes.featuresList);
  }
}
