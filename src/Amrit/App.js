import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GlobalStateContextProvider } from "./Context/GlobalStateContext";
import DEORoutes from "./DEO/DEORoutes";
import SchoolRoutes from "./School/SchoolRoutes";
import { SchoolContextProvider } from "./Context/SchoolContext";
import { AuthContextProvider } from "./Context/AuthContext";
import TeacherRoutes from "./Teacher/TeacherRoutes";
import StudentRoutes from "./Student/StudentRoutes";
import { DEOContextProvider } from "./Context/DEOContext";
import { TeacherContextProvider } from "./Context/TeacherContext";
import { StudentContextProvider } from "./Context/StudentContext";

function App() {
  return (
    <BrowserRouter>
      <GlobalStateContextProvider>
        <AuthContextProvider>
          <SchoolContextProvider>
            <StudentContextProvider>
              <TeacherContextProvider>
                <DEOContextProvider>
                  <Switch>
                    <Route path="/school" component={SchoolRoutes} />
                    <Route path="/deo" component={DEORoutes} />
                    <Route path="/teacher" component={TeacherRoutes} />
                    <Route path="/student" component={StudentRoutes} />
                    <Route
                      path="/"
                      exact
                      component={() => <Redirect to="/deo" />}
                    />
                  </Switch>
                </DEOContextProvider>
              </TeacherContextProvider>
            </StudentContextProvider>
          </SchoolContextProvider>
        </AuthContextProvider>
      </GlobalStateContextProvider>
    </BrowserRouter>
  );
}

export default App;
