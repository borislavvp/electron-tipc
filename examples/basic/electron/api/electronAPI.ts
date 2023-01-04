import { countEventer } from "../main/ipc";

export const electronAPI = {
  setCount: (value: number) => {
    countEventer.rendererTIPC.send("count:set-value", { value });
  },

  onCountChanged: countEventer.rendererTIPC.on("count:value-changed")
};
