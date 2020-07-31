import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GlobalStateContextProvider } from "./Context/GlobalStateContext";
import DEORoutes from "./DEO/DEORoutes";
import SchoolRoutes from "./School/SchoolRoutes";
import { SchoolContextProvider } from "./Context/SchoolContext";
import { AuthContextProvider } from "./Context/AuthContext";
import TeacherRoutes from "./Teacher/TeacherRoutes";
import StudentRoutes from "./Student/StudentRoutes";

function App() {
  return (
    <BrowserRouter>
      <GlobalStateContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/deo" />} />
            {/* <DEOContextProvider> */}
            <Route path="/deo" component={DEORoutes} />
            <Route path="/teacher" component={TeacherRoutes} />
            <Route path="/student" component={StudentRoutes} />
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
