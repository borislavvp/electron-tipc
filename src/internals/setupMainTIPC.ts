import { ipcMain, type IpcMainEvent, type IpcMainInvokeEvent } from "electron";

import type {
  Events,
  EventType,
  EventArgs_Type_Callback,
  EventArgs_Type_Event_Callback,
  EventArgs_Type_Payload
} from "./types/Eventer";

export type MainTIPCEventHandlerFunction<TEvents extends Events> = <
  TEventType extends EventType<TEvents>
>(
  ...args: EventArgs_Type_Callback<TEvents, TEventType>
) => MainTIPC<TEvents>;

export type MainTIPCEventHandlerFunctionExtended<TEvents extends Events> = <
  TEventType extends EventType<TEvents>
>(
  ...args: EventArgs_Type_Event_Callback<
    TEvents,
    TEventType,
    IpcMainEvent | IpcMainInvokeEvent
  >
) => MainTIPC<TEvents>;

export interface MainTIPC<TEvents extends Events> {
  off: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => MainTIPC<TEvents>;

  on: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Event_Callback<TEvents, TEventType, IpcMainEvent>
  ) => MainTIPC<TEvents>;

  once: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Event_Callback<TEvents, TEventType, IpcMainEvent>
  ) => MainTIPC<TEvents>;

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
  ) => MainTIPC<TEvents>;

  prependListener: <TEvent extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEvent>
  ) => MainTIPC<TEvents>;

  prependOnceListener: <TEvent extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEvent>
  ) => MainTIPC<TEvents>;

  setMaxListeners: (n: number) => MainTIPC<TEvents>;

  getMaxListeners: () => number;

  removeListener: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => MainTIPC<TEvents>;

  removeAllListeners: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => MainTIPC<TEvents>;

  listeners: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => (
    | MainTIPCEventHandlerFunction<TEvents>
    | MainTIPCEventHandlerFunctionExtended<TEvents>
    | Function
  )[];

  listenerCount: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => number;

  rawListeners: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => (
    | MainTIPCEventHandlerFunction<TEvents>
    | MainTIPCEventHandlerFunctionExtended<TEvents>
    | Function
  )[];

  eventNames: () => EventType<TEvents>[] | (string | symbol)[];
}

export const setupMainTIPC = <TEvents extends Events>(): MainTIPC<TEvents> => ({
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
