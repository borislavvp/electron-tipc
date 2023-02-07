import {
  ipcMain,
  type IpcMain,
  type IpcMainEvent,
  type IpcMainInvokeEvent
} from "electron";

import type {
  Events,
  EventType,
  EventArgs_Type_Callback,
  EventArgs_Type_Event_Callback,
  EventArgs_Type_Payload
} from "./types";

export interface Main<TEvents extends Events> extends Partial<IpcMain> {
  off: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => Main<TEvents>;

  on: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Event_Callback<TEvents, TEventType, IpcMainEvent>
  ) => Main<TEvents>;

  once: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Event_Callback<TEvents, TEventType, IpcMainEvent>
  ) => Main<TEvents>;

  handle: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Event_Callback<
      TEvents,
      TEventType,
      IpcMainInvokeEvent
    >
  ) => void;

  handleOnce: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Event_Callback<
      TEvents,
      TEventType,
      IpcMainInvokeEvent
    >
  ) => void;

  removeHandler: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => void;

  emit: <TEvent extends EventType<TEvents>>(
    ...args: EventArgs_Type_Payload<TEvents, TEvent>
  ) => boolean;

  addListener: <TEvent extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEvent>
  ) => Main<TEvents>;

  prependListener: <TEvent extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEvent>
  ) => Main<TEvents>;

  prependOnceListener: <TEvent extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEvent>
  ) => Main<TEvents>;

  setMaxListeners: (n: number) => Main<TEvents>;

  getMaxListeners: () => number;

  removeListener: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => Main<TEvents>;

  removeAllListeners: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => Main<TEvents>;

  listeners: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => Function[];

  listenerCount: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => number;

  rawListeners: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => Function[];

  eventNames: () => EventType<TEvents>[] | (string | symbol)[];
}

export const setupMain = <TEvents extends Events>(): Main<TEvents> => ({
  off: (...args) => ipcMain.off(args[0], args[1]),

  on: (...args) => ipcMain.on(args[0], args[1]),

  once: (...args) => ipcMain.once(args[0], args[1]),

  handle: (...args) => ipcMain.handle(args[0], args[1]),

  handleOnce: (...args) => ipcMain.handleOnce(args[0], args[1]),

  removeHandler: eventType => ipcMain.removeHandler(eventType),

  emit: (...args) => ipcMain.emit(...(args as [any])),

  addListener: (...args) => ipcMain.addListener(args[0], args[1]),

  prependListener: (...args) => ipcMain.prependListener(args[0], args[1]),

  prependOnceListener: (...args) =>
    ipcMain.prependOnceListener(args[0], args[1]),

  setMaxListeners: n => ipcMain.setMaxListeners(n),

  getMaxListeners: () => ipcMain.getMaxListeners(),

  removeListener: (...args) => ipcMain.removeListener(args[0], args[1]),

  removeAllListeners: eventType => ipcMain.removeAllListeners(eventType),

  listeners: eventType => ipcMain.listeners(eventType),

  listenerCount: eventType => ipcMain.listenerCount(eventType),

  rawListeners: eventType => ipcMain.rawListeners(eventType),

  eventNames: () => ipcMain.eventNames() as EventType<TEvents>[]
});
