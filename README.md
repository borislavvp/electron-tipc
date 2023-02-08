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

# Usage (TBD) 

### Brief explanation of the initial concept

IPC events are organized and defined in a type of the form an array type that includes FSA compliant object definitions with optional payload:
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

Then an eventer is created using the defined type using the library:

```ts
import { createEventer } from "electron-tipc";

type SomeEvents = [...];

const someEventer = createEventer<SomeEvents>();
```

The eventer contains both of electron's ```ipcMain``` and ```ipcRenderer``` - ```someEventer.main``` and ```someEventer.renderer``` respectively which have the same signature for each function exposed in the original ```ipcMain``` and ```ipcRenderer```. 
The difference is that each function is strictly typed allowing communication only to channels that are defined in the type for which the eventer is created, where the channel corresponds to the ```type``` property, and the data received from any callback function corresponds to the ```payload``` property, everything infered.

### Example for the defined `SomeEvents` :

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

