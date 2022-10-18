import { ipcRenderer, type IpcRendererEvent } from "electron";
import type {
  Events,
  EventType,
  EventPayload,
  EventArgs_Type_Callback,
  EventArgs_Type_Event_Callback,
  EventArgs_Type_Payload
} from "./types/Eventer";

export type IpcRendererEventer<TEvents extends Events> = Omit<
  IpcRendererEvent,
  "sender"
> & {
  sender: RendererTIPC<TEvents>;
};

export type RendererTIPCEventHandlerFunction<TEvents extends Events> = <
  TEventType extends EventType<TEvents>
>(
  ...args: EventArgs_Type_Callback<TEvents, TEventType>
) => RendererTIPC<TEvents>;

export type RendererTIPCEventHandlerFunctionExtended<TEvents extends Events> = <
  TEventType extends EventType<TEvents>
>(
  ...args: EventArgs_Type_Event_Callback<
    TEvents,
    TEventType,
    IpcRendererEventer<TEvents>
  >
) => RendererTIPC<TEvents>;

export interface RendererTIPC<TEvents extends Events> {
  send: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Payload<TEvents, TEventType>
  ) => void;

  sendSync: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Payload<TEvents, TEventType>
  ) => any;

  sendTo: <TEventType extends EventType<TEvents>>(
    webContentsId: number,
    ...args: EventArgs_Type_Payload<TEvents, TEventType>
  ) => void;

  sendToHost: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Payload<TEvents, TEventType>
  ) => void;

  postMessage: <TEventType extends EventType<TEvents>>(
    eventType: TEventType,
    message: EventPayload<TEvents, TEventType> extends never
      ? null
      : EventPayload<TEvents, TEventType>,
    transfer: MessagePort[] | undefined
  ) => void;

  invoke: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Payload<TEvents, TEventType>
  ) => Promise<any>;

  off: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => RendererTIPC<TEvents>;

  on: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Event_Callback<
      TEvents,
      TEventType,
      IpcRendererEventer<TEvents>
    >
  ) => RendererTIPC<TEvents>;

  once: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Event_Callback<
      TEvents,
      TEventType,
      IpcRendererEventer<TEvents>
    >
  ) => RendererTIPC<TEvents>;

  emit: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Payload<TEvents, TEventType>
  ) => boolean;

  addListener: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => RendererTIPC<TEvents>;

  prependListener: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => RendererTIPC<TEvents>;

  prependOnceListener: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => RendererTIPC<TEvents>;

  setMaxListeners: (n: number) => RendererTIPC<TEvents>;

  getMaxListeners: () => number;

  removeListener: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => RendererTIPC<TEvents>;

  removeAllListeners: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => RendererTIPC<TEvents>;

  listeners: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => (
    | RendererTIPCEventHandlerFunction<TEvents>
    | RendererTIPCEventHandlerFunctionExtended<TEvents>
    | Function
  )[];

  listenerCount: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => number;

  rawListeners: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => (
    | RendererTIPCEventHandlerFunction<TEvents>
    | RendererTIPCEventHandlerFunctionExtended<TEvents>
    | Function
  )[];

  eventNames: () => (EventType<TEvents> | string | symbol)[];
}

export const setupRendererTIPC = <
  TEvents extends Events
>(): RendererTIPC<TEvents> => ({
  send: (...args) => ipcRenderer.send(...(args as [any])),

  sendSync: (...args) => ipcRenderer.sendSync(...(args as [any])),

  sendTo: (webContentsId: number, ...args) =>
    ipcRenderer.sendTo(webContentsId, ...(args as [any])),

  sendToHost: (...args) => ipcRenderer.sendToHost(...(args as [any])),

  postMessage: (eventType, message, transfer) =>
    ipcRenderer.postMessage(eventType, message, transfer),

  invoke: (...args) => ipcRenderer.invoke(...(args as [any])),

  off: (...args) => ipcRenderer.off(args[0], args[1]),

  on: (...args) => ipcRenderer.on(args[0], args[1]),

  once: (...args) => ipcRenderer.once(args[0], args[1]),

  emit: (...args) => ipcRenderer.emit(...(args as [any])),

  addListener: (...args) => ipcRenderer.addListener(args[0], args[1]),

  prependListener: (...args) => ipcRenderer.prependListener(args[0], args[1]),

  prependOnceListener: (...args) =>
    ipcRenderer.prependOnceListener(args[0], args[1]),

  setMaxListeners: (n: number) => ipcRenderer.setMaxListeners(n),

  getMaxListeners: () => ipcRenderer.getMaxListeners(),

  removeListener: (...args) => ipcRenderer.removeListener(args[0], args[1]),

  removeAllListeners: eventType => ipcRenderer.removeAllListeners(eventType),

  listeners: eventType => ipcRenderer.listeners(eventType),

  listenerCount: eventType => ipcRenderer.listenerCount(eventType),

  rawListeners: eventType => ipcRenderer.rawListeners(eventType),

  eventNames: () => ipcRenderer.eventNames()
});
