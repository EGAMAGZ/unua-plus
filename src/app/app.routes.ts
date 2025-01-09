import { Routes } from '@angular/router';
import { AppModule } from './routes/app-module';

export const routes: Routes = [
  {
    path: AppModule.playground.pathName,
    loadChildren: () => import("./modules/playground/playground.routes")
      .then(r => r.routes),
  },
];
