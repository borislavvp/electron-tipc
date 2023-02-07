import * as E from "electron";
import { Events } from "./internals/types";
import { BrowserWindow } from "./types";

export function createBrowserWindow<TEvents extends Events>(
  options: E.BrowserWindowConstructorOptions
) {
  return new E.BrowserWindow(options) as BrowserWindow<TEvents>;
}
