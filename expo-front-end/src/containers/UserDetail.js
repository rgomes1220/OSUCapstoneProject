import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { API, Storage } from "aws-amplify";
import Placeholder from "../Images/placeholder.jpg";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

const FlexContainer = styled(Container)`
  margin-top: ${({ theme }) => `${theme.spacing(5)}px`};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserTitle = styled(Typography)`
  margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
  margin-bottom: ${({ theme }) => `${theme.spacing(3)}px`};
`;


const StyledTypography = styled(Typography)`
  margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
`;
class UserDetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        data: {}
      };
    }



    async componentDidMount() {
      try {
        var user_id=getUrlVars().user_id;
        // var user_id="492e61d0-e509-4e9b-96db-3148e015ca45"
        const response = await fetch(
          "https://v5yyja3u9i.execute-api.us-east-1.amazonaws.com/v0/get-user?user_id="+user_id
        );
        let responseJson = await response.json();
        this.setState(
          {
            isLoading: false,
            data: responseJson,
            name: responseJson.Item.display_name || "UNKNOWN",
            email: responseJson.Item.email,
            description: responseJson.Item.description || "UNKNOWN",
            links: responseJson.Item.links || [{name:"",link:""}]
          },
          function() {}
        );
      } catch (error) {
        console.error(error);
      }
    }

    render() {
        if (this.state.isLoading) {
            var user_id=getUrlVars().user_id;
          return <div>Loading... {user_id}</div>;
      } else {

          return(

             <FlexContainer>
                <UserTitle variant="h4" component="h1">
                  {this.state.name}
                </UserTitle>
                <Container maxWidth={"sm"}>
                    <StyledTypography>
                      <Box fontWeight="fontWeightBold">Email: {this.state.email}</Box>

                    </StyledTypography>

                    <StyledTypography>
                        {this.state.data.Item.description}
                    </StyledTypography>

                    <StyledTypography>
                      <Box fontWeight="fontWeightBold">References:</Box>
                      {this.state.links.map((link, index) =>(
                          <a href="//google.com" target="_blank">{link.name}</a>
                      ))}
                    </StyledTypography>
                </Container>
             </FlexContainer>




          )
      }
    }
}

export default UserDetail;
