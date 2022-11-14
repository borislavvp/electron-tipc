import { BrowserView } from "electron";
import { createBridge, createEventer } from "../dist/electron-tipc.cjs";

export type WindowEvents = [
  {
    type: "asd";
  },
  {
    type: "setup";
    payload: string;
  }
];

const testEventer = createEventer<WindowEvents>();

const view = new BrowserView();

// view.webContents.send();
// const asd = useCallback(testEventer.mainTIPC.handle, "setup");

const send = testEventer.rendererTIPC.send("asd");
const on = testEventer.rendererTIPC.on("setup");
const once = testEventer.rendererTIPC.once;
const off = testEventer.rendererTIPC.off;
const off7 = testEventer.rendererTIPC.rawListeners;

testEventer.mainTIPC.rawListeners("asd")[0];
