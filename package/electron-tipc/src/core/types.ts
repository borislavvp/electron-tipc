import * as E from "electron";
import { Main } from "./internals/setupMain";
import { Renderer } from "./internals/setupRenderer";
import {
  EventArgs_Type_Payload,
  EventPayload,
  Events,
  EventType
} from "./internals/types";

export interface WebFrameMain<TEvents extends Events> extends E.WebFrameMain {
  frames: WebFrameMain<TEvents>[];

  framesInSubtree: WebFrameMain<TEvents>[];

  parent: WebFrameMain<TEvents> | null;

  top: WebFrameMain<TEvents> | null;

  ipc: Main<TEvents>;

  send: Renderer<TEvents>["send"];

  postMessage<TEventType extends EventType<TEvents>>(
    eventType: TEventType,
    message: EventPayload<TEvents, TEventType> extends never
      ? null
      : EventPayload<TEvents, TEventType>,
    transfer?: E.MessagePortMain[]
  ): void;
}

export interface WebContents<TEvents extends Events> extends E.WebContents {
  fromDevToolsTargetId(targetId: string): WebContents<TEvents>;

  fromFrame(frame: WebFrameMain<TEvents>): WebContents<TEvents>;

  fromId(id: number): WebContents<TEvents>;

  getAllWebContents(): WebContents<TEvents>[];

  getFocusedWebContents(): WebContents<TEvents>;

  hosWebContents: WebContents<TEvents>;

  mainFrame: WebFrameMain<TEvents>;

  opener: WebFrameMain<TEvents>;

  devToolsWebContents: WebContents<TEvents> | null;

  ipc: Main<TEvents>;

  send: Renderer<TEvents>["send"];

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

export interface BrowserView<TEvents extends Events> extends E.BrowserView {
  webContents: WebContents<TEvents>;
}

export interface BrowserWindow<TEvents extends Events> extends E.BrowserWindow {
  fromBrowserView<TViewEvents extends Events>(
    browserView: BrowserView<TViewEvents>
  ): BrowserWindow<TViewEvents> | null;

  fromBrowserView(browserView: E.BrowserView): E.BrowserWindow | null;

  fromWebContents<TWebContentsEvents extends Events>(
    webContents: WebContents<TWebContentsEvents>
  ): BrowserWindow<TWebContentsEvents> | null;

  fromWebContents(webContents: E.WebContents): E.BrowserWindow | null;

  webContents: WebContents<TEvents>;
}
