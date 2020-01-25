
import React, { Component } from "react";
import TableComp from "views/TableComp.jsx";

import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { thArray, tdArray ,updateId,nodeAPI} from "variables/Variables.jsx";





class TableList extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      items:[],
      tdarr1:[],
      gotData:false
    };
    
    this.getAllUserDetails = this.getAllUserDetails.bind(this);
    this.viewProfileFun = this.viewProfileFun.bind(this);
    this.createNewProfile = this.createNewProfile.bind(this);
    this.deleteProfileFun = this.deleteProfileFun.bind(this);
    this.getAllUserDetails();
    
  }
  componentDidMount()//called after render method
  {
   // console.log("updateId="+updateId);
   // this.getAllUserDetails();
   console.log("nodeAPI="+nodeAPI);
  }
  //componentWillMount()//called before render method
  //{
    //this.getAllUserDetails();
  //}

  createNewProfile(event)
  {
    let path = `/admin/employeeDetail`;
    this.props.history.push(path);
  }

  getAllUserDetails()
  {
    this.state.tdarr1=[];
    var temparr2=[];
    
    const requestBody = {
      query: `
          query {
            getemployeeDetails {
              _id
              EmpID 
              FirstName
              LastName
              BusinessTitle
            }
          }
        `
    };
    fetch(nodeAPI+'/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(res=>res.json())
    .then(json=>{
      console.log(json);
      const employeeDetails = json.data.getemployeeDetails;
      console.log("employeeDetails="+employeeDetails);
      this.setState({
        items:employeeDetails
      });

      for(let i=0;i<this.state.items.length;i++)
      {
        var temparr=[];
        temparr.push(
          i+1,
          this.state.items[i].EmpID,
          this.state.items[i].FirstName,
          this.state.items[i].LastName,
          this.state.items[i].BusinessTitle,
          <div>
          <Button bsStyle="info"  fill id= {this.state.items[i]._id} onClick={this.viewProfileFun}>
          View
          </Button>
          {/* &nbsp;&nbsp;
          <Button bsStyle="danger"  fill id= {this.state.items[i]._id} onClick={this.deleteProfileFun}>
          Delete
          </Button> */}
          </div>
        
        );
        this.state.tdarr1.push(temparr);
      }
      console.log("temparr="+this.state.tdarr1);
      this.setState({
        gotData:true
      });

      }
    );

  }

  viewProfileFun(event)
  {
    console.log("updateId="+updateId);
    console.log("viewProfile="+event.target.id);
    //this.updateId = "ds";
    //console.log("updateId="+updateId,this.updateId);
   // updateId.push(event.target.id);
    updateId[0] = event.target.id;
    console.log("updateId="+updateId[0]);
    let path = `/admin/employeeDetail`;
    this.props.history.push(path); 
    // let path = `/admin/employeeDetail`+event.target.id;
    // this.props.history.push(path);
  }
  
  deleteProfileFun(event)
  {
    console.log("deleteProfile="+event.target.id);
    const requestBody = {
      query: `
          mutation DeleteEmpDetailsById($id: ID!) {
            deleteEmpDetailsById(Id: $id) {
            _id
            }
          }
        `,
      variables: {
        id: event.target.id
      }
    };
    fetch(nodeAPI+'/graphql' ,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then((res)=>{
      window.alert('Profile Deleted');
      this.setState({gotData:false});
      this.getAllUserDetails();
    });
  

  }
  

  render() {
    console.log("render");
    let temptable;
    //console.log("arr11="+this.state.tdarr1);
    if(this.state.gotData==true){
      temptable = <TableComp tdArray1={this.state.tdarr1} name="ss"/>
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              {/* <Card
              content={ */}
                  <Button bsStyle="info"  fill  onClick={this.createNewProfile}>
                    Create New Profile
                  </Button>
              {/* }
              /> */}
            </Col>
          </Row>
          <br/>
          <Row>
            <Col md={12}>
              
              <Card
                // title="Striped Table with Hover"
                // category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                   <div>
                     {temptable}
                   </div> 
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
