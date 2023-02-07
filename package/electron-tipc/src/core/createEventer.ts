import { Events } from "./internals/types";
import { setupMain } from "./internals/setupMain";
import { Renderer, setupRenderer } from "./internals/setupRenderer";

export function createEventer<TEvents extends Events = never>() {
  return {
    renderer: setupRenderer<TEvents>() as Renderer<TEvents>,
    main: setupMain<TEvents>()
  };
}

export type ElectronEventer<TEvents extends Events> = ReturnType<
  typeof createEventer<TEvents>
>;
