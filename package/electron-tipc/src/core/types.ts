import * as E from "electron";
import { MainTIPC } from "./internals/setupMainTIPC";
import { RendererTIPC } from "./internals/setupRendererTIPC";
import {
  EventArgs_Type_Payload,
  EventPayload,
  Events,
  EventType
} from "./internals/types";

export interface TIPCWebFrame<TEvents extends Events> extends E.WebFrameMain {
  frames: TIPCWebFrame<TEvents>[];

  framesInSubtree: TIPCWebFrame<TEvents>[];

  parent: TIPCWebFrame<TEvents> | null;

  top: TIPCWebFrame<TEvents> | null;

  ipc: MainTIPC<TEvents>;

  send: RendererTIPC<TEvents>["send"];

  postMessage<TEventType extends EventType<TEvents>>(
    eventType: TEventType,
    message: EventPayload<TEvents, TEventType> extends never
      ? null
      : EventPayload<TEvents, TEventType>,
    transfer?: E.MessagePortMain[]
  ): void;
}

export interface TIPCWebContents<TEvents extends Events> extends E.WebContents {
  fromDevToolsTargetId(targetId: string): TIPCWebContents<TEvents>;

  fromFrame(frame: TIPCWebFrame<TEvents>): TIPCWebContents<TEvents>;

  fromId(id: number): TIPCWebContents<TEvents>;

  getAllWebContents(): TIPCWebContents<TEvents>[];

  getFocusedWebContents(): TIPCWebContents<TEvents>;

  hosTIPCWebContents: TIPCWebContents<TEvents>;

  mainFrame: TIPCWebFrame<TEvents>;

  opener: TIPCWebFrame<TEvents>;

  devToolsWebContents: TIPCWebContents<TEvents> | null;

  ipc: MainTIPC<TEvents>;

  send: RendererTIPC<TEvents>["send"];

  sendToFrame<TEventType extends EventType<TEvents>>(
    frameId: number | [number, number],
    ...args: EventArgs_Type_Payload<TEvents, TEventType>
  ): void;

  postMessage<TEventType extends EventType<TEvents>>(
    eventType: TEventType,
    message: EventPayload<TEvents, TEventType> extends never
      ? null
      : EventPayload<TEvents, TEventType>,
    transfer?: E.MessagePortMain[]
  ): void;
}

export interface TIPCBrowserView<TEvents extends Events> extends E.BrowserView {
  webContents: TIPCWebContents<TEvents>;
}

export interface TIPCBrowserWindow<TEvents extends Events>
  extends E.BrowserWindow {
  fromBrowserView<TViewEvents extends Events>(
    browserView: TIPCBrowserView<TViewEvents>
  ): TIPCBrowserWindow<TViewEvents> | null;

  fromBrowserView(browserView: E.BrowserView): E.BrowserWindow | null;

  fromWebContents<TWebContentsEvents extends Events>(
    webContents: TIPCWebContents<TWebContentsEvents>
  ): TIPCBrowserWindow<TWebContentsEvents> | null;

  fromWebContents(webContents: E.WebContents): E.BrowserWindow | null;

  webContents: TIPCWebContents<TEvents>;
}
