import React, { Component } from "react";
import "../App.css";
import TableFilter from "react-table-filter";
import { Redirect } from 'react-router-dom'

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {},
      redirect:null
    };
  }

  renderTableHeader(columnHeads) {
    return columnHeads.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>;
    });
  }
  goToUser(input,e){
      let dest = '/UserDetail?user_id='+input
      this.setState({redirect:dest})
  }

  renderTableData() {
    return this.state.data.map((users, key) => {
      return (
        <tr key={key} data-href='google.com'>
          <td>{users.display_name}</td>
          <td>{users.email}</td>
          <td><button class="buttonLink" onClick={(e)=>this.goToUser(users.user_id,e)}>Go!</button></td>
        </tr>
      );
    });
  }

	async componentDidMount() {
		try {
			const response = await fetch('https://v5yyja3u9i.execute-api.us-east-1.amazonaws.com/v0/get-all-users');
			let responseJson = await response.json();
			this.setState(
				{
					isLoading: false,
					data: responseJson
				},
				function() {}
			);
		} catch (error) {
			console.error(error);
		}
	}

  render() {

    const columnHeads = [
    'name',
    'email',
    'details'
  ];

  if(this.state.redirect){
      const {redirect}=this.state;
      return <Redirect to={redirect} />
  }


  if (this.state.isLoading) {
    return <div>Loading...</div>;
  } else {



    return (
      <div id="entireContainer">
        <span id="tableContainer">
            <h1 id="title">Expo Members</h1>
            <table id="users">
              <thead>
              <tr>{this.renderTableHeader(columnHeads)}</tr>
              </thead>
              <tbody>
                {this.renderTableData()}
              </tbody>
            </table>
        </span>
      </div>
    );


  }
}
}
