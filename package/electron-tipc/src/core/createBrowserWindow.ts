import * as E from "electron";
import { Events } from "./internals/types";
import { TIPCBrowserWindow } from "./types";

export function createBrowserWindow<TEvents extends Events>(
  options: E.BrowserWindowConstructorOptions
) {
  return new E.BrowserWindow(options) as TIPCBrowserWindow<TEvents>;
}
