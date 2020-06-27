import React, { Component } from "react";
import "../App.css";
import TableFilter from "react-table-filter";
import Pagination from "@material-ui/lab/Pagination";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import AvatarImg from "../Images/avatar.jpg";
import Avatar from "@material-ui/core/Avatar";
import { sizing } from "@material-ui/system";
import styled from "styled-components";
import { Link as RouterLink, Redirect } from "react-router-dom";

const FlexContainer = styled(Container)`
  margin-top: ${({ theme }) => `${theme.spacing(5)}px`};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultsContainer = styled(Container)`
  margin-bottom: 10px;
`;

const StyledPanel = styled(ExpansionPanel)`
  width: 100%;
  margin-bottom: 15px;
`;

const StyledSummary = styled(ExpansionPanelSummary)`
  background-color: #e0e0e0;
  border-radius: 4px;
`;

const StyledDetails = styled(ExpansionPanelDetails)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectsTitle = styled(Typography)`
  margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
  margin-bottom: ${({ theme }) => `${theme.spacing(3)}px`};
`;

const StyledTypography = styled(Typography)`
  display: flex;
`;

const StyledAvatar = styled(Avatar)`
  width: ${({ theme }) => `${theme.spacing(8)}px`};
  height: ${({ theme }) => `${theme.spacing(8)}px`};
  margin-right: ${({ theme }) => `${theme.spacing(4)}px`};
`;

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {},
      page: 1
    };
  }

  setPage = (event, value) => {
    this.setState({ page: value });
  };

  async componentDidMount() {
    try {
      const response = await fetch(
        "https://v5yyja3u9i.execute-api.us-east-1.amazonaws.com/v0/get-all-projects"
      );
      let responseJson = await response.json();
      this.setState(
        {
          isLoading: false,
          data: responseJson,
          redirect: null
        },
        function() {}
      );
    } catch (error) {
      console.error(error);
    }
  }

  goToEditProject(input, e) {
    let dest = "/EditProject?project_id=" + input;
    this.setState({ redirect: dest });
  }

  render() {
    const columnHeads = ["name", "school", "college", "description"];
    const start = (this.state.page - 1) * 10;
    const end = Math.min(start + 10, this.state.data.length);
    if (this.state.redirect) {
      const { redirect } = this.state;
      return <Redirect to={redirect} />;
    }

    if (this.state.isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <FlexContainer>
          <ProjectsTitle variant="h2" component="h1">
            Projects
          </ProjectsTitle>
          <ResultsContainer>
            {this.state.data.slice(start, end).map((proj, index) => (
              <StyledPanel>
                <StyledSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <StyledTypography>
                    <StyledAvatar alt="avatar" src={AvatarImg} />
                    <div>
                      <Box fontWeight="fontWeightBold" m={1}>
                        {proj.name}
                      </Box>{" "}
                      {proj.college} • {proj.school}
                    </div>
                  </StyledTypography>
                </StyledSummary>
                <StyledDetails>
                  <Typography>
                    <RouterLink
                      to={{
                        pathname: "/ProjectDetail",
                        state: {
                          projData: proj
                        }
                      }}
                    >
                      Link to Project Page
                    </RouterLink>
                  </Typography>
                  <br />
                  <button
                    class="buttonLink"
                    onClick={e => this.goToEditProject(proj.project_id, e)}
                  >
                    Edit the Project
                  </button>
                  <Typography>{proj.description}</Typography>
                </StyledDetails>
              </StyledPanel>
            ))}
          </ResultsContainer>
          <PaginationControlled
            dataLength={this.state.data.length}
            setPage={this.setPage}
            page={this.state.page}
          />
        </FlexContainer>
      );
    }
  }
}

function PaginationControlled(props) {
  return (
    <Pagination
      count={Math.ceil(props.dataLength / 10)}
      page={props.page}
      onChange={props.setPage}
    />
  );
}

export default Projects;

// Daniel Lindsay - Referenced this for the API code: https://medium.com/serverlessguru/serverless-api-with-reactjs-6fa297ac8a27
// Daniel Lindsay - Referenced this for table code: https://stackoverflow.com/questions/47697863/display-data-json-to-table-in-react
