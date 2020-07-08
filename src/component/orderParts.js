import React, { Component } from 'react';
import {Table, Button} from 'react-bootstrap';
import axios from 'axios';

export default class orderParts extends Component {
    constructor() {
        super();

        this.constructFinalArray = this.constructFinalArray.bind(this)

        this.state = {
            jobDetails: [],
            tableData: [],
            partDetails: [],
            jobs: [],
            JobID: localStorage.getItem('jobID')
        }
}

constructFinalArray(jobID){

  //console.log("jobID: " + jobID)
  const url = "http://129.173.67.163:1337/getJobsById/" + jobID;
  var finalArray = [];
  
  axios.get(url)
   .then(
     (result) => {
       //console.log(result.data)
       result.data.forEach(element => {
         //console.log("partID: " + element.partId)
         const url2 = 'http://129.173.67.174:1337/getPartsById/' + element.partId;
         axios.get(url2)
           .then(
             (result2) => {
               //console.log(result2);
               var finalObject = {}
               finalObject.qoh = result2.data[0].qoh;
               finalObject.partName = result2.data[0].partName;
               finalObject.partId = element.partId;
               finalObject.qty = element.qty;
               finalObject.id = element.id;

               finalArray.push(finalObject);

               this.setState({
                tableData: finalArray
              });          
             },
             (error) => {
               console.log(error);
             }
           );
       }
       );
       console.log(finalArray);
     },
     (error) => {
       console.log(error)
     }
   );
  }

componentDidMount(){
  //alert('Fetching Job details!');

  this.constructFinalArray(this.state.JobID);
}

 renderTable() {
   console.log(this.state.tableData)
   if(!this.state.tableData){
      return null;
   }
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Part ID</th>
            <th>Part Name</th>
            <th>Required Quantity</th>
            <th>Available Quantity</th>
          </tr>
        </thead>
        <tbody>{this.renderJobs()}</tbody>
      </Table>
    );
}

sendToLogin(){
  localStorage.setItem('jobDetails',JSON.stringify(this.state.tableData))
  localStorage.removeItem("logInResults");
  this.props.history.push('/login')
}
  
isQuantityValid(){
  var BreakException= {};

  let {tableData} = this.state;
  if(!tableData)
    return true;
  
    var failure = false;

    try{
      tableData.forEach(element => {
        // console.log('QTY: ' + element.qty)
        // console.log('QOH: ' + element.qoh)
        
            if(element.qoh < element.qty){
            //  console.log("Returning true")
              throw BreakException;
            }
          });
    } catch(e){
      failure = true;
    }
  console.log("Returning " + failure)
  return failure;
}

 renderJobs() {
   
  const { tableData } = this.state;
  console.log(tableData);
    return tableData.map((index) => (
      <>
        <tr>
          <td>{index.id}</td>
          <td>{index.partId}</td>
          <td>{index.partName}</td>
          <td>{index.qty}</td>
          <td>{index.qoh}</td>
        </tr>
      </>
    ));
}

    render() {
        return (<React.Fragment>
          <div className="inner">
            <h1>Job Details</h1>
            <br />
            <br />
            {this.renderTable()}
            <br />
            <br />
            <Button size="sm" variant="dark" disabled={this.isQuantityValid()} type="submit" onClick={() => this.sendToLogin()}>
            Login to Confirm order
            </Button>
          </div>
        </React.Fragment>);
    }
}