<div align="center">
  <h1>electron-tipc</h1>
  <h3>Typesafe communication through electron's renderer and main processes.</h3>

  <figure>
    <img src="https://user-images.githubusercontent.com/46525030/209804551-feea62a7-c6ee-406b-b200-33a417366f1d.gif"  alt="Demo" />
    <figcaption>
      <p align="center">
        The renderer process, which is demonstrated in the <strong>App.tsx</strong> above is <strong>not</strong> importing any code from the electron main process, only the type declarations of the <strong>rendererAPI</strong>.
      </p>
    </figcaption>
  </figure>
</div>

<br />

# Usage 

## Basic setup

1. IPC events are organized and defined in a type of the form an array type that includes [basic FSA compliant object](https://github.com/redux-utilities/flux-standard-action) definitions with optional payload:
```ts
 type SomeEvents = [
  {
    type: "event-type",
    payload?: SomePayload
  },
  {...},
  {...},
  ...
 ]
```

2. Then an eventer is created using the defined type using the library:

```ts
import { createEventer } from "electron-tipc";

type SomeEvents = [...];

const someEventer = createEventer<SomeEvents>();
```

The eventer contains both of electron's ```ipcMain``` and ```ipcRenderer``` - ```someEventer.main``` and ```someEventer.renderer``` respectively which have the same signature for each function exposed in the original ```ipcMain``` and ```ipcRenderer```. 
The difference is that each function is strictly typed allowing communication only to channels that are defined in the type for which the eventer is created, where the channel corresponds to the ```type``` property, and the data received from any callback function corresponds to the ```payload``` property, everything infered.

#### Example for the defined `SomeEvents` :

Using the ```ipcRenderer.send``` :
```ts
const data: SomePayload = {..}
someEventer.renderer.send("event-type", data);
```

Using the ```ipcMain.on``` :
```ts
someEventer.main.on("event-type", (_,data: SomePayload) => {...});
```

Then whenever there is a need in the codebase to use any IPC communication involving the defined ``` SomeEvents ```, the ```someEventer``` is used.

3. Expose electron functions to the render process in the [preload](https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts)

```ts

import { createBridge } from "electron-tipc";
import { someEventer } from "./ipc"

const electronAPI = {
  onSomeRenderCall:(data:SomePayload) => someEventer.send("event-type",data)
}

export const electronBridge = createBridge({
   electronAPI
})
```

4. Extend the type of the render process `window` object to include the exposed `electronAPI`. When the electronBridge is exposed, [it is attached to the window object](https://www.electronjs.org/docs/latest/api/context-bridge). Note that the render process only imports the type of the exposed API and nothing else.

```ts
//index.d.ts

export {};

type ElectronBridge =
  typeof import("path-to-preload").electronBridge;

declare global {
  interface Window extends ElectronBridge {}
}
```

With this setup, the following is achieved:

 - the render process will be in sync with the exposed API from the electron's main process
 - the whole IPC communication through the electron processes will be typesafe and a single change to a definition of an event or function's signature will be highlighted

## Additional features

#### Typesafe BrowserWindow

```ts
import { createBrowserWindow } from "electron-tipc";

const window = createBrowserWindow<SomeEvents>();

```

#### Typesafe BrowserView

```ts
import { createBrowserView } from "electron-tipc";

const window = createBrowserView<SomeEvents>();

```

#### Callback extension for ipcRender.on, ipcRender.once, ipcRender.off

```ts
import { someEventer } from "./ipc";

const callbackOn = someEventer.render.on("event-type");
const callbackOnce = someEventer.render.once("event-type");
const callbackOff = someEventer.render.off("event-type");

callbackOn((data:SomePayload) => {
 // Code here is executed when the "event-type" event is caught by ipcRender.on
})

callbackOnce((data:SomePayload) => {
 // Code here is executed when the "event-type" event is caught by ipcRender.once
})

callbackOff((data:SomePayload) => {
 // Code here is executed when the "event-type" event is caught by ipcRender.off
})

```

## TODO

- Add tests
- Add more examples
- Explore possibilities for more features/integrations
- Evaluate if the current abstraction and way of defining events is usefull in more complex projects
