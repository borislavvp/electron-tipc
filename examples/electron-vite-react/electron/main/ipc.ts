import { createEventer } from "electron-tipc";

export type CountEvents = [
  {
    type: "count:set-value";
    payload: {
      value: number;
    };
  },
  {
    type: "count:value-changed";
    payload: {
      changedValue: number;
    };
  }
];

export const countEventer = createEventer<CountEvents>();
