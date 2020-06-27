import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";
//import awsconfig from "./aws-exports";
//import scene1Config from "./sumerian_exports_cb090715cfee47f7ac00fbc14d5a9e66.scene";
import "./index.css";
import App from "./App";
import config from "./config";
import * as serviceWorker from "./serviceWorker";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "expo",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  },
  XR: {
    // XR category configuration
    region: "us-east-2", // Sumerian region
    scenes: {
      /*scene1: {
        // Friendly scene name
        sceneConfig: scene1Config // Scene configuration from Sumerian publish
      } */
    }
  },
  Storage: {
    bucket: config.storage.BUCKET,
    level: "protected",
    region: config.storage.REGION,
    identityPoolId: config.storage.IDENTITY_POOL_ID
  }
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
