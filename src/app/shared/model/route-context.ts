export type PathString = `/${string}`;

export class RouteContext {
  uri: PathString;

  constructor(uri: PathString) {
    this.uri = uri;
  }

  get pathName() {
    return this.uri.slice(1)
  }
}

export class ModuleRouteContext extends RouteContext {
}
