import { ModuleRouteContext, RouteContext } from "../model/route-context";

export function generateRoute(
  module: ModuleRouteContext,
  { route, params }: { route?: RouteContext; params?: Record<string, any> } = {}
): string {
  const baseUrl = `${module.uri}${route?.uri || ''}`;

  return Object.entries(params || {}).reduce(
    (url, [key, value]) =>
      url.replace(`:${key}`, typeof value === 'string' ? value : String(value)),
    baseUrl
  );
}
