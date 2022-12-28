import { BrowserView, type BrowserViewConstructorOptions } from "electron";
import { Events } from "./internals/types";
import { TIPCBrowserView } from "./types";

export function createBrowserView<TEvents extends Events>(
  options: BrowserViewConstructorOptions
) {
  return new BrowserView(options) as TIPCBrowserView<TEvents>;
}
