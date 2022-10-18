import { contextBridge } from "electron";

export const createBridge = <T extends { [key: string]: any }>(api: T) => {
  process.once("loaded", () => {
    Object.keys(api).forEach(apiKey => {
      contextBridge.exposeInMainWorld(apiKey, api[apiKey]);
    });
  });
  return api;
};
