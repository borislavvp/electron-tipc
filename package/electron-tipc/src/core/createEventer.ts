import { Events } from "./internals/types";
import { setupMainTIPC } from "./internals/setupMainTIPC";
import { RendererTIPC, setupRendererTIPC } from "./internals/setupRendererTIPC";

export function createEventer<TEvents extends Events = never>() {
  return {
    rendererTIPC: setupRendererTIPC<TEvents>() as RendererTIPC<TEvents>,
    mainTIPC: setupMainTIPC<TEvents>()
  };
}

export type ElectronTIPCEventer<TEvents extends Events> = ReturnType<
  typeof createEventer<TEvents>
>;
