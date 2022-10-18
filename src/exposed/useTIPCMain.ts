import type { MainTIPC } from "@/internals/setupMainTIPC";

import { Events } from "@/internals/types/Eventer";
import { IpcMain } from "electron";

export const useTIPCMain = <TEvents extends Events>(ipc: IpcMain) =>
  ipc as MainTIPC<TEvents>;
