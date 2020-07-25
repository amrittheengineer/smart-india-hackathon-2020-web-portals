import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GlobalStateContextProvider } from "./Context/GlobalStateContext";
import DEORoutes from "./DEO/DEORoutes";
import SchoolRoutes from "./School/SchoolRoutes";
import { SchoolContextProvider } from "./Context/SchoolContext";
import { AuthContextProvider } from "./Context/AuthContext";
import { DEOContextProvider } from "./Context/DEOContext";
import { createMuiTheme } from "@material-ui/core";

function App() {
  return (
    <BrowserRouter>
      <GlobalStateContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/deo" />} />
            {/* <DEOContextProvider> */}
            <Route path="/deo" component={DEORoutes} />
            {/* </DEOContextProvider> */}
            <SchoolContextProvider>
              <Route path="/school" component={SchoolRoutes} />
            </SchoolContextProvider>
          </Switch>
        </AuthContextProvider>
      </GlobalStateContextProvider>
    </BrowserRouter>
  );
}

export default App;
