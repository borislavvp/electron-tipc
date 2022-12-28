import { BrowserWindow, type BrowserWindowConstructorOptions } from "electron";
import { Events } from "./internals/types";
import { TIPCBrowserWindow } from "./types";

export function createBrowserWindow<TEvents extends Events>(
  options: BrowserWindowConstructorOptions
) {
  return new BrowserWindow(options) as TIPCBrowserWindow<TEvents>;
}
