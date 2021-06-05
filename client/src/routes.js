import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserPage } from "./pages/UserPage";
import { ProfilesPage } from "./pages/ProfilesPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminPage } from "./pages/AdminPage";
import { AuthPage } from "./pages/AuthPage";

export const Routes = ({ isAuthenticated, role }) => {
  if (isAuthenticated && role === "ADMIN") {
    return (
      <Switch>
        <Route path="/admin" exact>
          <AdminPage />
        </Route>
        <Route path="/dashboard" exact>
          <DashboardPage />
        </Route>
        <Route path="/" exact>
          <UserPage />
        </Route>
        <Route path="/profiles">
          <ProfilesPage />
        </Route>
      </Switch>
    );
  }
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <UserPage />
        </Route>
        <Route path="/profiles">
          <ProfilesPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
