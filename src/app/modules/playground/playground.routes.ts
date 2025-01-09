import { Routes } from "@angular/router";
import { PlaygroundRoutes } from "./routes/playground-routes";

export const routes: Routes = [
  {
    path: PlaygroundRoutes.featuresList.pathName,
    loadComponent: () => import("./features-list/features-list.component")
      .then(c => c.FeaturesListComponent),
  }
];
