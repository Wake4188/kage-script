declare module "@tanstack/react-start/api" {
  export function createAPIFileRoute(path: string): (options: Record<string, unknown>) => Record<string, unknown>;
}
