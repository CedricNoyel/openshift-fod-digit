import * as serviceWorker from "./serviceWorker";
import React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "@horizon/components-react";
import AppRoot from "./AppRoot";
import { StateProvider } from "./components/store/storeGeneral";
import { InterventionProvider } from "./components/store/storeIntervention";
import { CssBaseline } from "@horizon/components-react";

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme="airbus">
        <StateProvider>
          <InterventionProvider>
            <AppRoot />
          </InterventionProvider>
        </StateProvider>
      </ThemeProvider>
    </>
  );
}

render(<App />, document.querySelector("#root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
