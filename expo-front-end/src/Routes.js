import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute.js";
import AuthenticatedRoute from "./components/AuthenticatedRoute.js";
import Home from "./containers/Home.js";
import AR from "./containers/AR.js";
import Map from "./containers/Map.js";
import Projects from "./containers/Projects.js";
import ProjectDetail from "./containers/ProjectDetail.js";
import Users from "./containers/Users.js";
import EditUserInfo from "./containers/EditUserInfo.js";
import EditProject from "./containers/EditProject.js";
import UploadProject from "./containers/UploadProject.js";
import Login from "./containers/Login.js";
import HelloWorld from "./containers/HelloWorld.js";
import ChangePassword from "./containers/ChangePassword.js";
import Register from "./containers/Register.js";
import NotFound from "./containers/NotFound.js";
import UserDetail from "./containers/UserDetail.js";

const Routes = ({ appProps }) => {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Projects} appProps={appProps} />
      <AppliedRoute path="/LogIn" exact component={Login} appProps={appProps} />
      <AppliedRoute
        path="/Register"
        exact
        component={Register}
        appProps={appProps}
      />
      <AppliedRoute path="/AR" exact component={AR} appProps={appProps} />
      <AppliedRoute
        path="/Projects"
        exact
        component={Projects}
        appProps={appProps}
      />
      <AppliedRoute
        path="/ProjectDetail"
        exact
        component={ProjectDetail}
        appProps={appProps}
      />
      <AppliedRoute
        path="/UserDetail"
        exact
        component={UserDetail}
        appProps={appProps}
      />
      <AppliedRoute path="/Users" exact component={Users} appProps={appProps} />
      <AuthenticatedRoute
        path="/EditUserInfo"
        exact
        component={EditUserInfo}
        appProps={appProps}
      />
      <AppliedRoute path="/Map" exact component={Map} appProps={appProps} />
      <AppliedRoute
        path="/UploadProject"
        exact
        component={UploadProject}
        appProps={appProps}
      />
      <AppliedRoute
        path="/EditProject"
        exact
        component={EditProject}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/changePassword"
        exact
        component={ChangePassword}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/HelloWorld"
        exact
        component={HelloWorld}
        appProps={appProps}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
