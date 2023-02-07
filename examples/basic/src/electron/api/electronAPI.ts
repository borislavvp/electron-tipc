import { countEventer } from "../main/ipc";

export const electronAPI = {
  setCount: (value: number) => {
    countEventer.renderer.send("count:set-value", { value });
  },

  onCountChanged: countEventer.renderer.on("count:value-changed")
};
