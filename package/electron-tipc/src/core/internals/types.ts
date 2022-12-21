export type Events = {
  type: string;
  payload?: unknown;
}[];

export type EventType<TEvents extends Events> = TEvents[number]["type"];

export type EventPayload<
  TEvents extends Events,
  TEventType extends EventType<TEvents>
> = Extract<TEvents[number], { type: TEventType }> extends {
  payload: infer TEventPayload;
}
  ? TEventPayload
  : never;

export type EventArgs_Type_Payload<
  TEvents extends Events,
  TEventType extends EventType<TEvents>
> = EventPayload<TEvents, TEventType> extends never
  ? [eventType: TEventType]
  : [eventType: TEventType, payload: EventPayload<TEvents, TEventType>];

export type EventArgs_Type_Callback<
  TEvents extends Events,
  TEventType extends EventType<TEvents>
> = EventPayload<TEvents, TEventType> extends never
  ? [eventType: TEventType, listener: () => void]
  : [
      eventType: TEventType,
      listener: (payload: EventPayload<TEvents, TEventType>) => void
    ];

export type EventArgs_Type_Event_Callback<
  TEvents extends Events,
  TEventType extends EventType<TEvents>,
  TEvent
> = EventPayload<TEvents, TEventType> extends never
  ? [eventType: EventType<TEvents>, listener: (event: TEvent) => void]
  : [
      eventType: TEventType,
      listener: (
        event: TEvent,
        payload: EventPayload<TEvents, TEventType>
      ) => void
    ];
