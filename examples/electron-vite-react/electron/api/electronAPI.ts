import { countEventer } from "../main/ipc";

export const electronAPI = {
  setCountValue: (value: number) =>
    countEventer.rendererTIPC.send("count:set-value", { value }),
  onCountValueChanged: countEventer.rendererTIPC.on("count:value-changed")
};
