import * as E from "electron";
import { createBrowserWindow, type BrowserWindow } from "electron-tipc";
import { join } from "path";
import { countEventer, CountEvents } from "./ipc";

process.env.DIST_ELECTRON = join(__dirname, "../..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = E.app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, "../public");

const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

let win: BrowserWindow<CountEvents> | null = null;

async function createWindow() {
  win = createBrowserWindow<CountEvents>({
    title: "Main window",
    icon: join(process.env.PUBLIC, "favicon.svg"),
    webPreferences: {
      preload,
      nodeIntegration: true
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url);
    // Open devTool if the E.app is not packaged
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }
}

if (!E.app.requestSingleInstanceLock()) {
  E.app.quit();
  process.exit(0);
}

E.app.whenReady().then(createWindow);

E.app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") E.app.quit();
});

E.app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

E.app.on("activate", () => {
  const allWindows = E.BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

countEventer.main.on("count:set-value", (_, payload) => {
  win?.webContents.send("count:value-changed", {
    changedValue: payload.value
  });
});
