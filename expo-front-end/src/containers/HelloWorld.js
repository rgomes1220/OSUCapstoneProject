import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";

const HelloWorld = () => {
  const [text, setText] = useState(
    "Working to test an endpoint with AWS_IAM authorization!"
  );

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      const resp = await returnBody();
      setText(resp);
    } catch (err) {
      console.log(err);
    }
  };

  let myInit = {
    body: {}
  };

  const returnBody = () => {
    return API.post("expo", "/hello-world", myInit);
  };

  return <div>{text}</div>;
};

export default HelloWorld;
