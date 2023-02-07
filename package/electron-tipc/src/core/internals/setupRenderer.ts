import { ipcRenderer, type IpcRendererEvent, type IpcRenderer } from "electron";

import type {
  Events,
  EventType,
  EventPayload,
  EventArgs_Type_Callback,
  EventArgs_Type_Event_Callback,
  EventArgs_Type_Payload
} from "./types";

export type IpcRendererEventer<TEvents extends Events> = Omit<
  IpcRendererEvent,
  "sender"
> & {
  sender: Renderer<TEvents>;
};

export interface Renderer<TEvents extends Events> extends Partial<IpcRenderer> {
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
  ) => any;

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

  off<TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ): EventArgs_Type_Callback<TEvents, TEventType>[1];

  off<TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ): Renderer<TEvents>;

  on<TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Event_Callback<
      TEvents,
      TEventType,
      IpcRendererEventer<TEvents>
    >
  ): Renderer<TEvents>;

  on<TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ): (callback: EventArgs_Type_Callback<TEvents, TEventType>[1]) => void;

  once<TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ): EventArgs_Type_Callback<TEvents, TEventType>[1];

  once<TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Event_Callback<
      TEvents,
      TEventType,
      IpcRendererEventer<TEvents>
    >
  ): Renderer<TEvents>;

  emit: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Payload<TEvents, TEventType>
  ) => boolean;

  addListener: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => Renderer<TEvents>;

  prependListener: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => Renderer<TEvents>;

  prependOnceListener: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => Renderer<TEvents>;

  setMaxListeners: (n: number) => Renderer<TEvents>;

  getMaxListeners: () => number;

  removeListener: <TEventType extends EventType<TEvents>>(
    ...args: EventArgs_Type_Callback<TEvents, TEventType>
  ) => Renderer<TEvents>;

  removeAllListeners: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => Renderer<TEvents>;

  listeners: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => Function[];

  listenerCount: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => number;

  rawListeners: <TEventType extends EventType<TEvents>>(
    eventType: TEventType
  ) => Function[];

  eventNames: () => (EventType<TEvents> | string | symbol)[];
}

export const setupRenderer = <TEvents extends Events>(): Renderer<TEvents> => ({
  send: (...args) => ipcRenderer.send(...(args as [any])),

  sendSync: (...args) => ipcRenderer.sendSync(...(args as [any])),

  sendTo: (webContentsId: number, ...args) =>
    ipcRenderer.sendTo(webContentsId, ...(args as [any])),

  sendToHost: (...args) => ipcRenderer.sendToHost(...(args as [any])),

  postMessage: (eventType, message, transfer) =>
    ipcRenderer.postMessage(eventType, message, transfer),

  invoke: (...args) => ipcRenderer.invoke(...(args as [any])),

  off: (...args): any => {
    if (args[1]) {
      return ipcRenderer.off(
        args[0],
        args[1] as any
      ) as unknown as Renderer<TEvents>;
    } else {
      return (callback: (...args: any) => void) => {
        ipcRenderer.off(args[0], (_, data) => callback(data));
      };
    }
  },

  on: (...args): any => {
    if (args[1]) {
      return ipcRenderer.on(
        args[0],
        args[1] as any
      ) as unknown as Renderer<TEvents>;
    } else {
      return (callback: (...args: any) => void) => {
        ipcRenderer.on(args[0], (_, data) => callback(data));
      };
    }
  },

  once: (...args): any => {
    if (args[1]) {
      return ipcRenderer.once(
        args[0],
        args[1] as any
      ) as unknown as Renderer<TEvents>;
    } else {
      return (callback: (...args: any) => void) => {
        ipcRenderer.once(args[0], (_, data) => callback(data));
      };
    }
  },

  emit: (...args) => ipcRenderer.emit(...(args as [any])),

  addListener: (...args) =>
    ipcRenderer.addListener(args[0], args[1]) as unknown as Renderer<TEvents>,

  prependListener: (...args) =>
    ipcRenderer.prependListener(
      args[0],
      args[1]
    ) as unknown as Renderer<TEvents>,

  prependOnceListener: (...args) =>
    ipcRenderer.prependOnceListener(
      args[0],
      args[1]
    ) as unknown as Renderer<TEvents>,

  setMaxListeners: (n: number) =>
    ipcRenderer.setMaxListeners(n) as unknown as Renderer<TEvents>,

  getMaxListeners: () => ipcRenderer.getMaxListeners(),

  removeListener: (...args) =>
    ipcRenderer.removeListener(
      args[0],
      args[1]
    ) as unknown as Renderer<TEvents>,

  removeAllListeners: eventType =>
    ipcRenderer.removeAllListeners(eventType) as unknown as Renderer<TEvents>,

  listeners: eventType => ipcRenderer.listeners(eventType),

  listenerCount: eventType => ipcRenderer.listenerCount(eventType),

  rawListeners: eventType => ipcRenderer.rawListeners(eventType),

  eventNames: () => ipcRenderer.eventNames()
});
