import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { API, Storage } from "aws-amplify";
import Placeholder from "../Images/placeholder.jpg";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

const FlexContainer = styled(Container)`
  margin-top: ${({ theme }) => `${theme.spacing(5)}px`};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImage = styled(Avatar)`
  margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
  margin-bottom: ${({ theme }) => `${theme.spacing(3)}px`};
  height: 200px;
  width: 200px;
`;

const StyledTypography = styled(Typography)`
  margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
`;

const ProjectsTitle = styled(Typography)`
  margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
  margin-bottom: ${({ theme }) => `${theme.spacing(3)}px`};
`;

export default function ProjectDetail(props) {
  const [image, setImage] = useState("");
  const { projData } = props.location.state;

  /*
  const loadImage = async => {
    Storage.get(projData.picture, {
      level: "protected",
      identityId: "us-east-1:93695739-a2d1-464d-b50c-fe38e9c0e353"
    })
      .then(result => setImage(result))
      .catch(err => console.log(err));
  };
  useEffect(() => {
    loadImage();
  }, []);*/

  return (
    <FlexContainer>
      <ProjectsTitle variant="h4" component="h1">
        {projData.name}
      </ProjectsTitle>

      <StyledImage src={Placeholder} width="300" height="200" />
      <Container maxWidth={"sm"}>
        <StyledTypography>
          <Box fontWeight="fontWeightBold">College: {projData.college}</Box>
          <Box fontWeight="fontWeightBold">School: {projData.school}</Box>
          <Box fontWeight="fontWeightBold">Tech: {projData.tech}</Box>
          <Box fontWeight="fontWeightBold">
            Booth Number: {projData.booth_number}
          </Box>
        </StyledTypography>

        <StyledTypography>{projData.description}</StyledTypography>
      </Container>
    </FlexContainer>
  );
}
