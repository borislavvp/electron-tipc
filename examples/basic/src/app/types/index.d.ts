/// <reference types="vite/client" />
export {};

type ElectronBridge =
  typeof import("../../electron/preload/index").electronBridge;

declare global {
  interface Window {
    electron: ElectronBridge;
  }
}
