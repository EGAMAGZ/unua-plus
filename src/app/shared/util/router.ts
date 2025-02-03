import { ModuleRouteContext, PathContext, RouteContext } from "../model/route-context";

export function generateRoute(
  module: ModuleRouteContext,
  { path, params }: { path?: PathContext; params?: Record<string, any> } = {}
): string {
  const baseUrl = `${module.uri}${path?.uri || ''}`;

  return Object.entries(params || {}).reduce(
    (url, [key, value]) =>
      url.replace(`:${key}`, typeof value === 'string' ? value : String(value)),
    baseUrl
  );
}
