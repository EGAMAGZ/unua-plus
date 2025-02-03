import { Routes } from "@angular/router";
import { ScheduleRoutes } from "./routes/schedule-routes";

export const routes: Routes = [
  {
    path: ScheduleRoutes.home.pathName,
    loadComponent: () => import("./home/home.component").then(c => c.HomeComponent)
  }
]
