import React from "react";
import {
  AppBar,
  Toolbar,
  Logo,
  AppTitle,
  Tabs,
  Tab,
} from "@horizon/components-react";
function Bar() {
  return (
    <>
      <AppBar static>
        <Toolbar disableGutters>
          <Logo />
          <AppTitle style={{ flexGrow: 1 }}>FOD Digit</AppTitle>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Bar;
