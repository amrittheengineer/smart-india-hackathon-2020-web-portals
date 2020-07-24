import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GlobalStateContextProvider } from "./Context/GlobalStateContext";
import DEORoutes from "./DEO/DEORoutes";
import SchoolRoutes from "./School/SchoolRoutes";
import { SchoolContextProvider } from "./Context/SchoolContext";
import { AuthContextProvider } from "./Context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <GlobalStateContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route path="/deo" component={DEORoutes} />
            <Route path="/" exact component={() => <Redirect to="/school" />} />
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
