import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LoaderButton from "../components/LoaderButton.js";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import { API, Storage } from "aws-amplify";
import "../App.css";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => `${theme.spacing(1)}px`};
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const GrowField = styled.div`
  display: flex;
  flex-grow: 2;
  align-self: center;
  justify-content: center;
  margin-right: ${({ theme }) => `${theme.spacing(1)}px`};
`;

class MyForm extends React.Component {
  constructor() {
    super();
    //initialize the state
    this.state = {
      name: "",
      description: "",
      picture: "",
      team: [{ email: "" }],
      school: "",
      tech: "",
      college: "",
      file: null,
      fileName: "",
      boothNumber:"",
      links: [{ name: "", link: "" }]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  //Following 4 funtions for handling team input
  handleAddTeamMember = () => {
    this.setState({
      team: this.state.team.concat([{ email: "" }])
    });
  };

  handleRemoveTeamMember = idx => () => {
    this.setState({
      team: this.state.team.filter((s, sidx) => idx !== sidx)
    });
  };

  handleTeamMemberChange = idx => evt => {
    const newTeamMembers = this.state.team.map((teamMember, sidx) => {
      if (idx !== sidx) return teamMember;
      return { ...teamMember, email: evt.target.value };
    });

    this.setState({ team: newTeamMembers });
  };

  //Following 4 funtions for handling input reference links
  handleAddLink = () => {
    this.setState({
      links: this.state.links.concat([{ name: "", link: "" }])
    });
  };

  handleRemoveLink = idx => () => {
    this.setState({
      links: this.state.links.filter((s, sidx) => idx !== sidx)
    });
  };

  handleLinkDescChange = idx => evt => {
    // console.log(evt.target)
    const newLinks = this.state.links.map((link, sidx) => {
      if (idx !== sidx) return link;
      return { ...link, name: evt.target.value };
    });

    this.setState({ links: newLinks });
  };

  handleLinkWebsiteChange = idx => evt => {
    // console.log(evt.target)
    const newLinks = this.state.links.map((link, sidx) => {
      if (idx !== sidx) return link;
      return { ...link, link: evt.target.value };
    });

    this.setState({ links: newLinks });
  };

  onUpload = e => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.files[0].name
    });
  };

  async handleSubmit(event) {
    event.preventDefault();

    let team = this.state.team;
    let inputLinks = this.state.links;

    var s3Key;

    s3Key = await Storage.put(
      `userimages/${this.state.fileName}`,
      this.state.file,
      {
        contentType: this.state.file.type
      }
    );

    let postData = {
      name: this.state.name,
      description: this.state.description,
      picture: s3Key.key,
      team: team,
      school: this.state.school,
      tech: this.state.tech,
      boothNumber: this.state.boothNumber,
      college: this.state.college,
      links: inputLinks
    };

    fetch(
      "https://v5yyja3u9i.execute-api.us-east-1.amazonaws.com/v0/create-new-project",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
      }
    ).then(response => {
      alert("Thanks for submitting a project!");
    });
  }

  render() {
    return (
      <Container maxWidth="xs">
        <FormContainer>
          <Typography component="h1" variant="h4">
            Upload Project
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              required
              id="name"
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.name}
              size="small"
              onChange={this.handleFieldChange}
            />

            <TextField
              required
              id="description"
              label="Description"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rowsMax="4"
              value={this.state.description}
              size="small"
              onChange={this.handleFieldChange}
            />

            <TextField
              required
              id="college"
              label="College"
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.college}
              size="small"
              onChange={this.handleFieldChange}
            />

            <TextField
              required
              id="school"
              label="School"
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.school}
              size="small"
              onChange={this.handleFieldChange}
            />

            <TextField
              required
              id="tech"
              label="Technology"
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.tech}
              size="small"
              onChange={this.handleFieldChange}
            />

            <TextField
              required
              id="boothNumber"
              label="Booth Number (100-132)"
              variant="outlined"
              margin="normal"
              fullWidth
              value={this.state.boothNumber}
              size="small"
              onChange={this.handleFieldChange}
            />

            <RowContainer>
              <GrowField>
                <Typography variant="subtitle2">
                  {this.state.fileName.length ? (
                    <span>Photo Selected - {this.state.fileName}</span>
                  ) : (
                    <span>Upload a photo</span>
                  )}
                </Typography>
              </GrowField>
              <Button variant="contained" component="label" sized="small">
                Upload File
                <input
                  accept="image/*"
                  type="file"
                  name="fileName"
                  id="fileName"
                  style={{ display: "none" }}
                  onChange={this.onUpload}
                />
              </Button>
            </RowContainer>

            {this.state.team.map((teamMember, idx) => (
              <RowContainer key={idx + 1}>
                <GrowField>
                  <TextField
                    type="email"
                    required
                    variant="outlined"
                    margin="normal"
                    size="small"
                    fullWidth
                    label={`Team Member Name`}
                    value={teamMember.email}
                    onChange={this.handleTeamMemberChange(idx)}
                  />
                </GrowField>
                <IconButton
                  aria-label="delete team member"
                  onClick={this.handleRemoveTeamMember(idx)}
                  disabled={this.state.team.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="add team member"
                  onClick={this.handleAddTeamMember}
                >
                  <AddIcon />
                </IconButton>
              </RowContainer>
            ))}

            {this.state.links.map((link, idx) => (
              <div key={idx + 1}>
                <RowContainer key={idx + 1}>
                  <GrowField>
                    <TextField
                      type="text"
                      required
                      variant="outlined"
                      margin="normal"
                      size="small"
                      label={`Link Title`}
                      value={link.name}
                      onChange={this.handleLinkDescChange(idx)}
                    />
                  </GrowField>
                  <GrowField>
                    <TextField
                      type="text"
                      required
                      variant="outlined"
                      margin="normal"
                      size="small"
                      label={`Link Url`}
                      value={link.link}
                      onChange={this.handleLinkWebsiteChange(idx)}
                    />
                  </GrowField>
                  <IconButton
                    aria-label="delete link"
                    onClick={this.handleRemoveLink(idx)}
                    disabled={this.state.links.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="add link"
                    onClick={this.handleAddLink}
                  >
                    <AddIcon />
                  </IconButton>
                </RowContainer>
              </div>
            ))}

            <LoaderButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              isLoading={this.state.isLoading}
              //disabled={!validateForm()}
              size="large"
            >
              Submit Project
            </LoaderButton>
          </form>
        </FormContainer>
      </Container>
    );
  }
}
export default MyForm;
