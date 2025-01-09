import { ModuleRouteContext } from "../shared/model/route-context";

export class AppModule {
  static readonly playground = new ModuleRouteContext(
    "/playground",
  )
}
