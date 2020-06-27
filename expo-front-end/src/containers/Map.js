import React from 'react';
import expo from '../Images/trade-show-floor-plan.png'; 
import Image from'react-image-resizer';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import ReactTooltip from 'react-tooltip';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import styled from "styled-components";
import Container from "@material-ui/core/Container";


/*This is the class that will create the tooltip Divs. Setting the positions based on percentages will allow the divs to show up in the same relative position on the Map regardless of where the page is opened up on (web vs. phone)
Each Component has an id passed into it that can be used to reference the booth.
There are two components MyComponent and Mycomponenet Left. The only difference is the position of the tooltip but the Lambda function must go in both of them */
class MyComponent extends React.Component{

    constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };
    }
	
  	async componentDidMount() {
		try {
			const response = await fetch('https://v5yyja3u9i.execute-api.us-east-1.amazonaws.com/v0/get-all-projects');
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
	
	
  render(){
    var name = "NULL";
    if(this.state.data == {}){
     name = "NULL";
    }
    else if(this.data != {}){
    for (var i = 0; i < this.state.data.length; i++ ){
      var obj = this.state.data[i];
        if (obj.hasOwnProperty('booth_number')){
          console.log(obj.booth_number);
          console.log(this.id);
          if (obj.booth_number == parseInt(this.props.id)){
            name = obj.tech;
            console.log(name);
          }
        }
    }
  }
    return (
      <div style={{ position:"absolute", top: this.props.t, left:this.props.l, width:this.props.w, height:this.props.h }}> 
        <button style={{ 
          background: 'transparent', 
          outline: 'none', border: 'none', height: '100%', width: '100%'}} ref={ref => this.fooRef = ref} 
          data-tip= {'Team Name: '+ name } 
          data-place= 'right' 
          data-type= 'info' 
          text-align= 'left' 
          data-multiline ='true' 
          onClick={() => {ReactTooltip.show(this.fooRef) }} 
          data-event='click'> 
        </button>
      <ReactTooltip />
      </div>);
  }
}

class MyComponentLeft extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {}
    };
    }
	
  	async componentDidMount() {
		try {
			const response = await fetch('https://v5yyja3u9i.execute-api.us-east-1.amazonaws.com/v0/get-all-projects');
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

  render(){
    var name = "NULL";
    if(this.state.data == {}){
    name = "NULL";
    }
    else if(this.data != {}){
    for (var i = 0; i < this.state.data.length; i++ ){
      var obj = this.state.data[i];
        if (obj.hasOwnProperty('booth_number')){
          console.log(obj.booth_number);
          if (obj.booth_number == parseInt(this.props.id)){
            name = obj.tech;
            console.log(name);
          }
        }
    }
  }
    return (
      <div style={{ position:"absolute", top: this.props.t, left:this.props.l, width:this.props.w, height:this.props.h }}> 
        <button style={{ 
          background: 'transparent', 
          outline: 'none', border: 'none', height: '100%', width: '100%'}} ref={ref => this.fooRef = ref} 
          data-tip={'Team Name: '+ name }  
          data-place= 'left' 
          data-type= 'info' 
          text-align= 'left' 
          data-multiline ='true' 
          onClick={() => {ReactTooltip.show(this.fooRef) }} 
          data-event='click'> 
        </button>
      <ReactTooltip />
      </div>);
  }
}
class Map extends React.Component{

	constructor(props) {
	  super(props);
	  this.state ={
	    open: false
	  };
        }

render(){
 
  return(
<Container><div style={{ 
          backgroundImage: "url(/trade-show-floor-plan.png)",
          backgroundSize: "contain",
          width: "100%",
          height:"0",
          paddingBottom: "60%",
          backgroundPosition: "center",
          alignItems:'center',
          justifyContent: 'center',
          position: "relative",
          display:"flex",
          backgroundRepeat: "no-repeat",
          overflowX: "auto",
          overflowY: "auto" }} >
   <componentDidMount/>
{/*top row of Map*/}
  {/*Div for Booth 100*/}

  <MyComponent t="16%" l="17%" w="4%" h="5%" id="100"/>
  {/*Div for Booth 101*/}
  <MyComponent t="16%" l="24%" w="4%" h="5%" id="101" />
  {/*Div for Booth 102*/}
  <MyComponent t="16%" l="31%" w="4%" h="5%" id="102" />
  {/*Div for Booth 103*/}
  <MyComponent t="16%" l="39%" w="4%" h="5%" id="103"/>
  {/*Div for Booth 104*/}
   <MyComponentLeft t="16%" l="46%" w="4%" h="5%" id="104" /> 
  {/*Div for Booth 105*/}
   <MyComponentLeft t="16%" l="53%" w="4%" h="5%" id="105"/>  
  {/*Div for Booth 106*/}
   <MyComponentLeft t="16%" l="60%" w="4%" h="5%" id="106"/> 
  {/*Div for Booth 107*/}
   <MyComponentLeft t="16%" l="67%" w="4%" h="5%" id="107"/> 
  {/*Div for Booth 108*/}
   <MyComponentLeft t="16%" l="74%" w="4%" h="5%" id="108"/> 

{/*Second row of Map*/} 
  {/*Div for Booth 109*/}
   <MyComponent t="26%" l="17%" w="4%" h="10%" id="109"/> 
  {/*Div for Booth 113*/}
   <MyComponent t="26%" l="24%" w="4%" h="10%" id="113"/> 
  {/*Div for Booth 116*/}
   <MyComponent t="26%" l="38%" w="4%" h="22%" id="116"/> 
  {/*Div for Booth 118*/}
   <MyComponentLeft t="26%" l="51.0%" w="4%" h="10%" id="118"/> 
  {/*Div for Booth 122*/}
   <MyComponentLeft t="26%" l="58.0%" w="4%" h="10%" id="122"/> 
   {/*Div for Booth 126*/}
   <MyComponentLeft t="26%" l="71%" w="4%" h="10%" id="126"/> 
     {/*Div for Booth 129*/}
   <MyComponentLeft t="26%" l="78.0%" w="4%" h="10%" id="129"/>

{/*Third row of Map*/} 
  {/*Div for Booth 110*/}
   <MyComponent t="39%" l="17%" w="4%" h="10%" id="110"/> 
  {/*Div for Booth 114*/}
   <MyComponent t="39%" l="24%" w="4%" h="10%" id="114"/> 
   {/*Div for Booth 119*/} 
   <MyComponentLeft t="39%" l="51.0%" w="4%" h="10%" id="119"/> 
  {/*Div for Booth 123*/}
   <MyComponentLeft t="39%" l="58.0%" w="4%" h="10%" id="123"/> 
   {/*Div for Booth 127*/}
   <MyComponentLeft t="39%" l="71%" w="4%" h="10%" id="127"/> 
     {/*Div for Booth 130*/}
   <MyComponentLeft t="39%" l="78.%" w="4%" h="10%" id="130"/>
{/*Fourth row of Maps*/}
   {/*Div for Booth 111*/}
   <MyComponent t="50%" l="17%" w="4%" h="10%" id="111"/> 
  {/*Div for Booth 115*/}
   <MyComponent t="50%" l="24%" w="4%" h="22%" id="115"/> 
   {/*Div for Booth 117*/}
   <MyComponent t="50%" l="38%" w="4%" h="22%" id="117"/> 
   {/*Div for Booth 120*/} 
   <MyComponentLeft t="50%" l="51.0%" w="4%" h="10%" id="120"/> 
  {/*Div for Booth 124*/}
   <MyComponentLeft t="50%" l="58.0%" w="4%" h="10%" id="124"/>  
   {/*Div for Booth 128*/}
   <MyComponentLeft t="50%" l="71%" w="4%" h="22%" id="128"/>  
   {/*Div for Booth 131*/}
   <MyComponentLeft t="50%" l="78%" w="4%" h="10%" id="131"/>  
{/*FInal row of things*/}
 {/*Div for Booth 112*/}
   <MyComponent t="62%" l="17%" w="4%" h="10%" id="112"/>
  {/*Div for Booth 121*/}
   <MyComponentLeft t="62%" l="51%" w="4%" h="10%" id="121"/>
  {/*Div for Booth 125*/}
   <MyComponentLeft t="62%" l="58%" w="4%" h="10%" id="125"/>
    {/*Div for Booth 132*/}
   <MyComponentLeft t="62%" l="78%" w="4%" h="10%" id="132"/>
  </div></Container>
);
}
}

export default Map;

// Daniel Lindsay - Referenced this for the API code: https://medium.com/serverlessguru/serverless-api-with-reactjs-6fa297ac8a27
