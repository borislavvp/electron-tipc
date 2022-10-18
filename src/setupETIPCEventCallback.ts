import {
  MainTIPCEventHandlerFunction,
  MainTIPCEventHandlerFunctionExtended
} from "./internals/setupMainTIPC";

import {
  RendererTIPCEventHandlerFunction,
  RendererTIPCEventHandlerFunctionExtended
} from "./internals/setupRendererTIPC";

import {
  EventArgs_Type_Callback,
  Events,
  EventType
} from "./internals/types/Eventer";

type TIPCUseCCallback = {
  <TEvents extends Events, TEventType extends EventType<TEvents>>(
    fn: MainTIPCEventHandlerFunction<TEvents>,
    eventType: TEventType
  ): (callback: EventArgs_Type_Callback<TEvents, TEventType>[1]) => void;

  <TEvents extends Events, TEventType extends EventType<TEvents>>(
    fn: MainTIPCEventHandlerFunctionExtended<TEvents>,
    eventType: TEventType
  ): (callback: EventArgs_Type_Callback<TEvents, TEventType>[1]) => void;

  <TEvents extends Events, TEventType extends EventType<TEvents>>(
    fn: RendererTIPCEventHandlerFunction<TEvents>,
    eventType: TEventType
  ): (callback: EventArgs_Type_Callback<TEvents, TEventType>[1]) => void;

  <TEvents extends Events, TEventType extends EventType<TEvents>>(
    fn: RendererTIPCEventHandlerFunctionExtended<TEvents>,
    eventType: TEventType
  ): (callback: EventArgs_Type_Callback<TEvents, TEventType>[1]) => void;
};

export const useCallback: TIPCUseCCallback = <
  TEvents extends Events,
  TEventType extends EventType<TEvents>
>(
  fn:
    | MainTIPCEventHandlerFunction<TEvents>
    | MainTIPCEventHandlerFunctionExtended<TEvents>
    | RendererTIPCEventHandlerFunction<TEvents>
    | RendererTIPCEventHandlerFunctionExtended<TEvents>,
  eventType: TEventType
) => {
  if ("event" in fn.arguments[1].arguments) {
    return (callback: EventArgs_Type_Callback<TEvents, TEventType>[1]) => {
      fn(...([eventType, callback] as any));
    };
  } else {
    return (callback: EventArgs_Type_Callback<TEvents, TEventType>[1]) => {
      fn(...([eventType, callback] as any));
    };
  }
};
