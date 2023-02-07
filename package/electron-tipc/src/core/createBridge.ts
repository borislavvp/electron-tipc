import * as E from "electron";

export function createBridge<T extends { [key: string]: any }>(api: T) {
  process.once("loaded", () => {
    Object.keys(api).forEach(apiKey => {
      E.contextBridge.exposeInMainWorld(apiKey, api[apiKey]);
    });
  });
  return api;
}
