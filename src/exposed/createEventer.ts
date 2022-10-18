import { Events } from "../internals/types/Eventer";
import { setupMainTIPC } from "../internals/setupMainTIPC";
import { setupRendererTIPC } from "../internals/setupRendererTIPC";

export const createEventer = <TEvents extends Events = never>() => ({
  rendererTIPC: setupRendererTIPC<TEvents>(),
  mainTIPC: setupMainTIPC<TEvents>()
});

export type ElectronTIPCEventer<TEvents extends Events> = ReturnType<
  typeof createEventer<TEvents>
>;
