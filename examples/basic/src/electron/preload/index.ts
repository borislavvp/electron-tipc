import { createBridge } from "electron-tipc";
import { electronAPI } from "../api/electronAPI";

export const electronBridge = createBridge({
  api: electronAPI
});
