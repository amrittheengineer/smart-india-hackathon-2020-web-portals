import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GlobalStateContextProvider } from "./Context/GlobalStateContext";
import DEORoutes from "./DEO/DEORoutes";

function App() {
  return (
    <BrowserRouter>
      <GlobalStateContextProvider>
        <Switch>
          <Route path="/deo" component={DEORoutes} />
          <Route path="/" component={() => <Redirect to="/deo" />} />
        </Switch>
      </GlobalStateContextProvider>
    </BrowserRouter>
  );
}

export default App;
