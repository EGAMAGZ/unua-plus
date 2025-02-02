export type PathString = `/${string}`;

export abstract class RouteContext {
  uri: PathString;

  constructor(uri: PathString) {
    this.uri = uri;
  }

  get pathName() {
    return this.uri.slice(1)
  }
}

export class PathContext extends RouteContext {
  label: string;
  constructor(uri: PathString, label: string) {
    super(uri);
    this.label = label;
  }
}

export class ModuleRouteContext extends RouteContext {
}
