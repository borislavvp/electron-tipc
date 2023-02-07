import * as E from "electron";
import { Events } from "./internals/types";
import { BrowserView } from "./types";

export function createBrowserView<TEvents extends Events>(
  options: E.BrowserViewConstructorOptions
) {
  return new E.BrowserView(options) as BrowserView<TEvents>;
}
