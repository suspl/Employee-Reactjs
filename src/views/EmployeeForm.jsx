
import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import "../assets/css/customDatePickerWidth.css";
import "../assets/css/custom_css.css";

import store from "../redux/employee/store"
//import {Provider,connect} from "react-redux";
import {useSelector,useDispatch} from "react-redux";
import {addEmployee} from "redux/employee/employeeAction";
import employeeReducer from "redux/employee/employeeReducer";
import EmpList from "views/EmployeeName.jsx";
import Select from "react-select";

import {
  Grid,
  Row,
  Col,
 
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { thArray, tdArray ,updateId,nodeAPI} from "variables/Variables.jsx";
import avatar from "assets/img/faces/face-3.jpg";



class EmployeeForm extends Component {


  constructor(props)
  {
    super(props);
    this.state={
      items:[],
      userDetails:[],
      configDetails:[],
      firstname:"",
      middlename:"",
      lastname:"",
      initial:"",
      fathername:"",
      spousename:"",
      dob: new Date(),
      companyid:"",
      department:"",
      businesstitle:"",
      reportingperson:"",
      employmentType:"",
      jobband:"",
      joiningdate:new Date(),
      mobilenumber:"",
      alternatenumber:"",
      pannumber:"",
      aadhernumber:"",
      uannumber:"",
      passportnumber:"",
      employeeactive:"",
      companyemail:"",
      personalemail:"",
      employeeid:"",
      bloodgroup:"",
      gender:"",
      Emergencycontactname:"",
      Emergencycontactnumber:"",
      Emergencycontactrelationship:"",
      resignationdate:null,
      leavingdate:null,
      value: 'dddddd',
      assigneesvalue:"1003",
      startDate: '',
      Id:'',
      updateProfile:false,
      n_dob:'',//update profile
      n_joiningdate:'',
      n_resignationdate:'',
      n_leavingdate:'',
      current_Desgination :"",
      reportingpersonDetails:[],
      errors: {},
      selectedOption:null
    };

    

    this.submitFunction = this.submitFunction.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.fetchUserFullDetailById = this.fetchUserFullDetailById.bind(this);
    this.getAllConfigDetails = this.getAllConfigDetails.bind(this);
    this.getAllUserDetails = this.getAllUserDetails.bind(this);
    this.updateFunction = this.updateFunction.bind(this);
    this.fetchReportingPerson =this.fetchReportingPerson.bind(this);
    
  }
  

  componentDidMount(){
    console.log("updateId11111111="+updateId[0]);

    if(this.props.match.params.id!=undefined){
      // this.state.Id = updateId[0];
       this.state.Id = this.props.match.params.id;
     }

    this.getAllUserDetails();
    this.getAllConfigDetails();
    //==============
    if(updateId[0]!=0)
    {
      this.setState({updateProfile:true});
      this.setState({Id:updateId[0]});
      console.log("updateId22222="+updateId[0]);
      
      const requestBody = {
        query: `
            query GetEmpDetailsById($id: ID!) {
              getEmpDetailsById(Id: $id) {
                _id
                EmpID 
                FirstName
                MiddleName
                LastName
                Initials
                FatherName
                SpouseName
                DOB
                Department
                JoiningDate
                BusinessTitle
                MobileNo
                AlternateContactNo
                PAN
                AADHAAR
                PF_UAN
                PassportNo
                JobBand
                EmploymentType
                CompanyID
                LeavingDate
                ResignationDate
                ReportingPerson
                email
                personalEmailId 
                bloodGroup 
                gender
                EmergencyContactName
                EmergencyContactNumber
                EmergencyContactRelationship
                Active
              }
            }
          `,
        variables: {
          id: updateId[0]
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
      .then(res=>res.json())
      .then(json=>{

        if(json.data!=null){
          const EmpDetails = json.data.getEmpDetailsById;
          console.log(EmpDetails);
          this.setState({
            userDetails:EmpDetails,
            selectedOption:{ value: EmpDetails._id, label: EmpDetails.FirstName},
            department:EmpDetails.Department?EmpDetails.Department:'',
          });
          console.log(this.state.userDetails.FirstName);
          this.fetchReportingPerson(this.state.userDetails.BusinessTitle);
          this.setState({
            firstname:this.state.userDetails.FirstName?this.state.userDetails.FirstName:'',
            middlename:this.state.userDetails.MiddleName?this.state.userDetails.MiddleName:'',
            lastname:this.state.userDetails.LastName?this.state.userDetails.LastName:'',
            initial:this.state.userDetails.Initials?this.state.userDetails.Initials:'',
            fathername:this.state.userDetails.FatherName?this.state.userDetails.FatherName:'',
            spousename:this.state.userDetails.SpouseName?this.state.userDetails.SpouseName:'',
            dob:this.state.userDetails.DOB?new Date(this.state.userDetails.DOB):new Date(),
            n_dob:this.state.userDetails.DOB?new Date(this.state.userDetails.DOB):new Date(),
            companyid:this.state.userDetails.CompanyID?this.state.userDetails.CompanyID:'',
            department:this.state.userDetails.Department?this.state.userDetails.Department:'',
            businesstitle:this.state.userDetails.BusinessTitle?this.state.userDetails.BusinessTitle:'',
            reportingperson:this.state.userDetails.ReportingPerson?this.state.userDetails.ReportingPerson:'',
            employmentType:this.state.userDetails.EmploymentType?this.state.userDetails.EmploymentType:'',
            jobband:this.state.userDetails.JobBand?this.state.userDetails.JobBand:'',
            joiningdate:this.state.userDetails.JoiningDate?new Date(this.state.userDetails.JoiningDate):new Date(),
            n_joiningdate:this.state.userDetails.JoiningDate?new Date(this.state.userDetails.JoiningDate):new Date(),
            mobilenumber:this.state.userDetails.MobileNo?this.state.userDetails.MobileNo:'',
            alternatenumber:this.state.userDetails.AlternateContactNo?this.state.userDetails.AlternateContactNo:'',
            pannumber:this.state.userDetails.PAN?this.state.userDetails.PAN:'',
            aadhernumber:this.state.userDetails.AADHAAR?this.state.userDetails.AADHAAR:'',
            uannumber:this.state.userDetails.PF_UAN?this.state.userDetails.PF_UAN:'',
            passportnumber:this.state.userDetails.PassportNo?this.state.userDetails.PassportNo:'',
            employeeactive:this.state.userDetails.Active?this.state.userDetails.Active:'',
            companyemail:this.state.userDetails.email?this.state.userDetails.email:'',
            personalemail:this.state.userDetails.personalEmailId?this.state.userDetails.personalEmailId:'',
            employeeid:this.state.userDetails.EmpID?this.state.userDetails.EmpID:'',
            bloodgroup:this.state.userDetails.bloodGroup?this.state.userDetails.bloodGroup:'',
            gender:this.state.userDetails.gender?this.state.userDetails.gender:'',
            resignationdate:this.state.userDetails.ResignationDate?new Date(this.state.userDetails.ResignationDate):new Date(),
            n_resignationdate:this.state.userDetails.ResignationDate?new Date(this.state.userDetails.ResignationDate):new Date(),
            leavingdate:this.state.userDetails.LeavingDate?new Date(this.state.userDetails.LeavingDate):new Date(),
            n_leavingdate:this.state.userDetails.LeavingDate?new Date(this.state.userDetails.LeavingDate):new Date(),
            Emergencycontactname:this.state.userDetails.EmergencyContactName?this.state.userDetails.EmergencyContactName:'',
            Emergencycontactnumber:this.state.userDetails.EmergencyContactNumber?this.state.userDetails.EmergencyContactNumber:'',
            Emergencycontactrelationship:this.state.userDetails.EmergencyContactRelationship?this.state.userDetails.EmergencyContactRelationship:''
            
          });
          updateId[0]=0;
          console.log("items=="+this.state.userDetails,this.state.userDetails.FirstName,this.state.userDetails.LastName);
        }
      });
    
    }
    else{
      this.setState({employeeactive:"Yes"})
    }
    //===============
  }
  // componentWillMount()
  // {
  //   this.getAllUserDetails();
  // }

  handleInputChange(event)
  {
    //console.log("name-----"+event.target.name,event.target.value);
    
    this.setState({[event.target.name]:event.target.value});
    if(event.target.name==="department")
    {
      this.setState({businesstitle:""});
    }
    if(event.target.name==="businesstitle")
    {
     // console.log(event.target.key);

      var current_Desgination = event.target.value;
      this.fetchReportingPerson(current_Desgination);
      // //------------reportingpersonDetails-----
      // var Des_Level=0;
      // var reportingPL=[];
      // this.state.configDetails.map(data=>{
      //  if(data.BusinessTitle == current_Desgination && data.DepID == this.state.department){
      //    Des_Level=data.Level;
      //    console.log("Des_Level=="+Des_Level);
      //    console.log(this.state.department);
      //    this.state.configDetails.filter(configdata=>{
      //      if(this.state.department == configdata.DepID && configdata.Level<Des_Level)
      //      {
      //        console.log("new Des=="+configdata.BusinessTitle);
      //        this.state.items.filter(item=>
      //         {
      //           if(item.Department == this.state.department && item.BusinessTitle == configdata.BusinessTitle)
      //           {
      //             console.log("Name=="+item);
      //             //return item;
      //             reportingPL.push(item);
      //           }
      //         });
              
      //      }
      //    });
        
      //  }
      // });
      // console.log("reportingPL=");
      // console.log(reportingPL);
      // this.setState({
      //           reportingpersonDetails:reportingPL
      //         });
      // console.log("rep--"+this.state.reportingpersonDetails);
      // //-----------------
     
    }
    if(event.target.name==="aadhernumber")
    {
      var value = event.target.value;
      value = value.replace(/\D/g, "").split(/(?:([\d]{4}))/g).filter(s => s.length > 0).join("-");
      //console.log("value--"+value);
      this.setState({aadhernumber:value});
    }

    
  }

  // fetchReportingPerson(current_Desgination)
  // {
  //   var Role_hierarchy_List =["CEO","President","VP","Manager","Assistant Manager","Developer"];
  //   if(current_Desgination!="CEO")
  //   {
  //     var reporting_personrole = Role_hierarchy_List[Role_hierarchy_List.indexOf(current_Desgination)-1];
  //     console.log("reporting_personrole=="+reporting_personrole);
  //     const requestBody = {
  //       query: `
  //           query GetReportingPersonsIDByRole($BT: String!) {
  //             getReportingPersonsIDByRole(BusinessTitle: $BT) {
  //               _id
  //               EmpID 
  //               FirstName
  //             }
  //           }
  //         `,
  //       variables: {
  //         BT: reporting_personrole
  //       }
  //     };

  //     fetch(nodeAPI+'/graphql' ,{
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(requestBody),
  //     })
  //     .then(res=>res.json())
  //     .then(json=>{
  //       if(json.data!=null){
  //         const reportingPersonsDetails = json.data.getReportingPersonsIDByRole;
  //         //console.log("dbConnectionDetails---"+dbConnectionDetails.dbType);
  //         this.setState({
  //           reportingpersonDetails:reportingPersonsDetails
  //         });
  //       }
  //       else{
  //         this.setState({reportingpersonDetails:[]});
  //       }
  //     });
  //   }
  //   else if(current_Desgination=="CEO")
  //   {
  //     this.setState({reportingpersonDetails:[]});
  //   }
  // }

  fetchReportingPerson(current_Desgination){
    //------------reportingpersonDetails-----
    console.log("Dep=="+this.state.department);
    var Des_Level=0;
    var reportingPL=[];
    this.state.configDetails.filter(data=>{
     if(data.BusinessTitle == current_Desgination && data.DepID == this.state.department){
       Des_Level=data.Level;
       console.log("Des_Level=="+Des_Level);
      // console.log(this.state.department);
       this.state.configDetails.map(configdata=>{
         if(this.state.department == configdata.DepID && configdata.Level<Des_Level)
         {
           console.log("new Des=="+configdata.BusinessTitle);
           this.state.items.filter(item=>
            {
              if(item.Department == this.state.department && item.BusinessTitle == configdata.BusinessTitle)
              {
                console.log("Name=="+item);
                //return item;
                reportingPL.push(item);
              }
            });
            
         }
       });
       console.log(reportingPL);
     }
    });
    //console.log("reportingPL=");
    
    this.setState({
              reportingpersonDetails:reportingPL
            });
    //console.log("rep--"+this.state.reportingpersonDetails);
    //-----------------
  }

  handleDateChange = (date) => {
    if(date!=null){
      var n_date = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
      this.setState({
        n_dob: n_date
      });
  
      this.setState({
        dob: date
      });
      console.log("n_date="+n_date);
    }
   
  };

  handleDateChange2 = (date) => {
    if(date!=null){
      var n_date = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
      this.setState({
        n_joiningdate: n_date
      });

      this.setState({
        joiningdate: date
      });
      console.log("n_date="+n_date);
    }
  };
  handleDateChange3 = (date) => {
    if(date!=null){
      var n_date = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
      this.setState({
        n_resignationdate: n_date
      });

      this.setState({
        resignationdate: date
      });
      console.log("n_date="+n_date);
    }
  };

  handleDateChange4 = (date) => {
    if(date!=null){
      console.log("date=="+date);
      var n_date = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
      this.setState({
        n_leavingdate: n_date
      });

      this.setState({
        leavingdate: date
      });
      console.log("n_date="+n_date);
    }
  };

  getAllUserDetails()
  {
    const requestBody = {
      query: `
          query {
            getemployeeDetails {
              _id
              EmpID 
              FirstName
              Department
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
      const employeeDetails = json.data.getemployeeDetails;
      console.log("employeeDetails="+employeeDetails);
      this.setState({
        items:employeeDetails
      });
      }
    );
  }

  getAllConfigDetails()
  {
    const requestBody = {
      query: `
          query {
            getConfigDetails {
              _id
              Department
              DepID 
              JobBand 
              BusinessTitle
              EmploymentType
              PayPeriodType
              Period
              CompanyId
              Level
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
      const ConfigDetails = json.data.getConfigDetails;
      console.log("ConfigDetails="+ConfigDetails);
      this.setState({
        configDetails:ConfigDetails
      });
    })
  }

  submitFunction(e)
  {
    console.log(this.state.firstname,this.state.lastname);
  
    e.preventDefault();
     if (this.validateForm())   //----validation---
    {
      let myobj =  {
            FirstName:this.state.firstname,
            MiddleName:this.state.middlename,
            LastName:this.state.lastname,
            Initials:this.state.initial,
            FatherName:this.state.fathername,
            SpouseName:this.state.spousename,
            DOB:this.state.n_dob?this.state.n_dob:new Date(),
            CompanyID:this.state.companyid,
            Department:this.state.department,
            BusinessTitle:this.state.businesstitle,
            ReportingPerson:this.state.reportingperson,
            EmploymentType:this.state.employmentType,
            JobBand:this.state.jobband,
            JoiningDate:this.state.n_joiningdate?this.state.n_joiningdate:new Date(),
            MobileNo:this.state.mobilenumber,
            AlternateContactNo:this.state.alternatenumber,
            PAN:this.state.pannumber,
            AADHAAR:this.state.aadhernumber,
            PF_UAN:this.state.uannumber,
            PassportNo:this.state.passportnumber,
            Active:this.state.employeeactive,
            email:this.state.companyemail,
            personalEmailId:this.state.personalemail,
            EmpID:this.state.employeeid,
            bloodGroup:this.state.bloodgroup,
            gender:this.state.gender,
            ResignationDate:this.state.n_resignationdate?this.state.n_resignationdate:new Date(),
            LeavingDate:this.state.n_leavingdate?this.state.n_leavingdate:new Date(),
            EmergencyContactName:this.state.Emergencycontactname,
            EmergencyContactNumber:this.state.Emergencycontactnumber,
            EmergencyContactRelationship:this.state.Emergencycontactrelationship,
            Active:"Yes"
    };
    const requestBody = {
      query: `
          mutation AddEmpDetails($EmpID: String!, $FirstName: String!, $MiddleName: String, $LastName: String, 
            $Initials: String, $FatherName: String, $SpouseName: String, $DOB: String!, $Department: String!,
            , $JoiningDate: String!, $BusinessTitle: String!, $MobileNo: String!, $AlternateContactNo: String!, $PAN: String!
            , $AADHAAR: String!, $PF_UAN: String!, $PassportNo: String!, $JobBand: String!, $EmploymentType: String!
            , $CompanyID: String!, $LeavingDate: String!, $ResignationDate: String!, $ReportingPerson: String,
             $email: String!,$personalEmailId: String!,$bloodGroup: String!,$gender: String!,
             $EmergencyContactName: String!, $EmergencyContactNumber: String!,
             $EmergencyContactRelationship: String!, $Active: String!) 
          {
            addEmpDetails(empInput: {EmpID: $EmpID, FirstName: $FirstName, MiddleName: $MiddleName, LastName: $LastName
              , Initials: $Initials, FatherName: $FatherName, SpouseName: $SpouseName, DOB: $DOB, Department: $Department
              , JoiningDate: $JoiningDate, BusinessTitle: $BusinessTitle, MobileNo: $MobileNo, AlternateContactNo: $AlternateContactNo
              , PAN: $PAN, AADHAAR: $AADHAAR, PF_UAN: $PF_UAN, PassportNo: $PassportNo
              , JobBand: $JobBand, EmploymentType: $EmploymentType, CompanyID: $CompanyID, LeavingDate: $LeavingDate
              , ResignationDate: $ResignationDate, ReportingPerson: $ReportingPerson, email: $email, personalEmailId: $personalEmailId
              , bloodGroup: $bloodGroup, gender: $gender, EmergencyContactName: $EmergencyContactName
              , EmergencyContactNumber: $EmergencyContactNumber, EmergencyContactRelationship: $EmergencyContactRelationship,Active: $Active}) {
              _id
             
            }
          }
        `,
       
        variables:myobj
    };

    fetch(nodeAPI+'/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then((res)=>{
      console.log("length---"+res.status);
      if(res.status==200){
        this.setState({
                firstname:"",
                middlename:"",
                lastname:"",
                initial:"",
                fathername:"",
                spousename:"",
                n_dob:"",
                dob:new Date(),
                companyid:"",
                department:"",
                businesstitle:"",
                reportingperson:"",
                employmentType:"",
                jobband:"",
                n_joiningdate:"",
                joiningdate:new Date(),
                mobilenumber:"",
                alternatenumber:"",
                pannumber:"",
                aadhernumber:"",
                uannumber:"",
                passportnumber:"",
                employeeactive:"",
                companyemail:"",
                personalemail:"",
                employeeid:"",
                bloodgroup:"",
                gender:"",
                n_resignationdate:"",
                resignationdate:new Date(),
                n_leavingdate:"",
                leavingdate:new Date(),
                Emergencycontactname:"",
                Emergencycontactnumber:"",
                Emergencycontactrelationship:"",
                Id:"",
                selectedOption:null});
              this.getAllUserDetails();
              window.alert('New Profile Added');
          }
        });
    
    }
   
  }

  updateFunction(e)
  {
    console.log(this.state.firstname,this.state.lastname,this.state.Id);
    e.preventDefault();
    console.log(this.state.firstname,this.state.lastname,this.state.Id);
    if (this.validateForm())   //----validation---
    {
      console.log(this.state.firstname,this.state.lastname,this.state.Id);
   
    //====================
      let myobj =  {
          FirstName:this.state.firstname,
          MiddleName:this.state.middlename,
          LastName:this.state.lastname,
          Initials:this.state.initial,
          FatherName:this.state.fathername,
          SpouseName:this.state.spousename,
          DOB:this.state.n_dob?this.state.n_dob:new Date(),
          CompanyID:this.state.companyid,
          Department:this.state.department,
          BusinessTitle:this.state.businesstitle,
          ReportingPerson:this.state.reportingperson,
          EmploymentType:this.state.employmentType,
          JobBand:this.state.jobband,
          JoiningDate:this.state.n_joiningdate?this.state.n_joiningdate:new Date(),
          MobileNo:this.state.mobilenumber,
          AlternateContactNo:this.state.alternatenumber,
          PAN:this.state.pannumber,
          AADHAAR:this.state.aadhernumber,
          PF_UAN:this.state.uannumber,
          PassportNo:this.state.passportnumber,
          Active:this.state.employeeactive,
          email:this.state.companyemail,
          personalEmailId:this.state.personalemail,
          EmpID:this.state.employeeid,
          bloodGroup:this.state.bloodgroup,
          gender:this.state.gender,
          ResignationDate:this.state.n_resignationdate?this.state.n_resignationdate:new Date(),
          LeavingDate:this.state.n_leavingdate?this.state.n_leavingdate:new Date(),
          EmergencyContactName:this.state.Emergencycontactname,
          EmergencyContactNumber:this.state.Emergencycontactnumber,
          EmergencyContactRelationship:this.state.Emergencycontactrelationship,
          Active:"Yes"
  };
  console.log("Uid--"+this.state.userDetails._id);
  myobj["id"] = this.state.userDetails._id;
  const requestBody = {
    query: `
        mutation UpdateEmpDetailsById($id: ID!, $EmpID: String!, $FirstName: String!, $MiddleName: String, $LastName: String, 
          $Initials: String, $FatherName: String, $SpouseName: String, $DOB: String!, $Department: String!,
          , $JoiningDate: String!, $BusinessTitle: String!, $MobileNo: String!, $AlternateContactNo: String!, $PAN: String!
          , $AADHAAR: String!, $PF_UAN: String!, $PassportNo: String!, $JobBand: String!, $EmploymentType: String!
          , $CompanyID: String!, $LeavingDate: String!, $ResignationDate: String!, $ReportingPerson: String,
          $email: String!,$personalEmailId: String!,$bloodGroup: String!,$gender: String!,
          $EmergencyContactName: String!, $EmergencyContactNumber: String!,
               $EmergencyContactRelationship: String!, $Active: String!) 
        {
          updateEmpDetailsById(Id:$id,empInput: {EmpID: $EmpID, FirstName: $FirstName, MiddleName: $MiddleName, LastName: $LastName
            , Initials: $Initials, FatherName: $FatherName, SpouseName: $SpouseName, DOB: $DOB, Department: $Department
            , JoiningDate: $JoiningDate, BusinessTitle: $BusinessTitle, MobileNo: $MobileNo, AlternateContactNo: $AlternateContactNo
            , PAN: $PAN, AADHAAR: $AADHAAR, PF_UAN: $PF_UAN, PassportNo: $PassportNo
            , JobBand: $JobBand, EmploymentType: $EmploymentType, CompanyID: $CompanyID, LeavingDate: $LeavingDate
            , ResignationDate: $ResignationDate, ReportingPerson: $ReportingPerson, email: $email, personalEmailId: $personalEmailId
            , bloodGroup: $bloodGroup, gender: $gender, EmergencyContactName: $EmergencyContactName, EmergencyContactNumber: $EmergencyContactNumber
            , EmergencyContactRelationship: $EmergencyContactRelationship, Active: $Active}) {
            _id
          
          }
        }
      `,
      variables:myobj
    };

  fetch(nodeAPI+'/graphql', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(requestBody),
  })
  .then((res)=>{
  console.log("length---"+res.status);
  if(res.status==200){
        this.setState({
          firstname:"",
          middlename:"",
          lastname:"",
          initial:"",
          fathername:"",
          spousename:"",
          n_dob:"",
          dob:new Date(),
          companyid:"",
          department:"",
          businesstitle:"",
          reportingperson:"",
          employmentType:"",
          jobband:"",
          n_joiningdate:"",
          joiningdate:new Date(),
          mobilenumber:"",
          alternatenumber:"",
          pannumber:"",
          aadhernumber:"",
          uannumber:"",
          passportnumber:"",
          employeeactive:"",
          companyemail:"",
          personalemail:"",
          employeeid:"",
          bloodgroup:"",
          gender:"",
          n_resignationdate:"",
          resignationdate:new Date(),
          n_leavingdate:"",
          leavingdate:new Date(),
          Emergencycontactname:"",
          Emergencycontactnumber:"",
          Emergencycontactrelationship:"",
          Id:"",
          updateProfile:false,
          selectedOption:null
        });
        window.alert('Updation successful');
        this.getAllUserDetails();
      }
    });
    }
  }
  
  fetchUserFullDetailById(event)
  {
    console.log(event);
    console.log("value=="+event.value);

    if(event.value!=''){
      
      this.setState({
        Id:event.value,
        errors: {},
        selectedOption:event
      });
      this.setState({updateProfile:true});

      const requestBody = {
        query: `
            query GetEmpDetailsById($id: ID!) {
              getEmpDetailsById(Id: $id) {
                _id
                EmpID 
                FirstName
                MiddleName
                LastName
                Initials
                FatherName
                SpouseName
                DOB
                Department
                JoiningDate
                BusinessTitle
                MobileNo
                AlternateContactNo
                PAN
                AADHAAR
                PF_UAN
                PassportNo
                JobBand
                EmploymentType
                CompanyID
                LeavingDate
                ResignationDate
                ReportingPerson
                email
                personalEmailId 
                bloodGroup 
                gender
                EmergencyContactName
                EmergencyContactNumber
                EmergencyContactRelationship
                Active
              }
            }
          `,
        variables: {
          id: event.value
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
      .then(res=>res.json())
      .then(json=>{

        if(json.data!=null){
          const EmpDetails = json.data.getEmpDetailsById;
          console.log(EmpDetails);
          this.setState({
            userDetails:EmpDetails,
            department:EmpDetails.Department?EmpDetails.Department:'',
          });
          console.log(this.state.userDetails.FirstName);
          this.fetchReportingPerson(this.state.userDetails.BusinessTitle);
          this.setState({
            firstname:this.state.userDetails.FirstName?this.state.userDetails.FirstName:'',
            middlename:this.state.userDetails.MiddleName?this.state.userDetails.MiddleName:'',
            lastname:this.state.userDetails.LastName?this.state.userDetails.LastName:'',
            initial:this.state.userDetails.Initials?this.state.userDetails.Initials:'',
            fathername:this.state.userDetails.FatherName?this.state.userDetails.FatherName:'',
            spousename:this.state.userDetails.SpouseName?this.state.userDetails.SpouseName:'',
            dob:this.state.userDetails.DOB?new Date(this.state.userDetails.DOB):new Date(),
            n_dob:this.state.userDetails.DOB?new Date(this.state.userDetails.DOB):new Date(),
            companyid:this.state.userDetails.CompanyID?this.state.userDetails.CompanyID:'',
            department:this.state.userDetails.Department?this.state.userDetails.Department:'',
            businesstitle:this.state.userDetails.BusinessTitle?this.state.userDetails.BusinessTitle:'',
            reportingperson:this.state.userDetails.ReportingPerson?this.state.userDetails.ReportingPerson:'',
            employmentType:this.state.userDetails.EmploymentType?this.state.userDetails.EmploymentType:'',
            jobband:this.state.userDetails.JobBand?this.state.userDetails.JobBand:'',
            joiningdate:this.state.userDetails.JoiningDate?new Date(this.state.userDetails.JoiningDate):new Date(),
            n_joiningdate:this.state.userDetails.JoiningDate?new Date(this.state.userDetails.JoiningDate):new Date(),
            mobilenumber:this.state.userDetails.MobileNo?this.state.userDetails.MobileNo:'',
            alternatenumber:this.state.userDetails.AlternateContactNo?this.state.userDetails.AlternateContactNo:'',
            pannumber:this.state.userDetails.PAN?this.state.userDetails.PAN:'',
            aadhernumber:this.state.userDetails.AADHAAR?this.state.userDetails.AADHAAR:'',
            uannumber:this.state.userDetails.PF_UAN?this.state.userDetails.PF_UAN:'',
            passportnumber:this.state.userDetails.PassportNo?this.state.userDetails.PassportNo:'',
            employeeactive:this.state.userDetails.Active?this.state.userDetails.Active:'',
            companyemail:this.state.userDetails.email?this.state.userDetails.email:'',
            personalemail:this.state.userDetails.personalEmailId?this.state.userDetails.personalEmailId:'',
            employeeid:this.state.userDetails.EmpID?this.state.userDetails.EmpID:'',
            bloodgroup:this.state.userDetails.bloodGroup?this.state.userDetails.bloodGroup:'',
            gender:this.state.userDetails.gender?this.state.userDetails.gender:'',
            resignationdate:this.state.userDetails.ResignationDate?new Date(this.state.userDetails.ResignationDate):new Date(),
            n_resignationdate:this.state.userDetails.ResignationDate?new Date(this.state.userDetails.ResignationDate):new Date(),
            leavingdate:this.state.userDetails.LeavingDate?new Date(this.state.userDetails.LeavingDate):new Date(),
            n_leavingdate:this.state.userDetails.LeavingDate?new Date(this.state.userDetails.LeavingDate):new Date(),
            Emergencycontactname:this.state.userDetails.EmergencyContactName?this.state.userDetails.EmergencyContactName:'',
            Emergencycontactnumber:this.state.userDetails.EmergencyContactNumber?this.state.userDetails.EmergencyContactNumber:'',
            Emergencycontactrelationship:this.state.userDetails.EmergencyContactRelationship?this.state.userDetails.EmergencyContactRelationship:'',
          });
          updateId[0]=0;
          console.log("items=="+this.state.userDetails,this.state.userDetails.FirstName,this.state.userDetails.LastName);
        }
      });
    
    }
    else if(event.value==''){
      this.setState({
        firstname:"",
        middlename:"",
        lastname:"",
        initial:"",
        fathername:"",
        spousename:"",
        n_dob:"",
        dob:new Date(),
        companyid:"",
        department:"",
        businesstitle:"",
        reportingperson:"",
        employmentType:"",
        jobband:"",
        n_joiningdate:"",
        joiningdate:new Date(),
        mobilenumber:"",
        alternatenumber:"",
        pannumber:"",
        aadhernumber:"",
        uannumber:"",
        passportnumber:"",
        employeeactive:"",
        companyemail:"",
        personalemail:"",
        employeeid:"",
        bloodgroup:"",
        gender:"",
        n_resignationdate:"",
        resignationdate:new Date(),
        n_leavingdate:"",
        leavingdate:new Date(),
        Emergencycontactname:"",
        Emergencycontactnumber:"",
        Emergencycontactrelationship:"",
        Id:"",
        updateProfile:false
      });
    }
  }
  setStartDate(date)
  {
    this.setState({startDate:date})
  }
  //---------validation------
  validateForm() {

  //  let fields = this.state.fields;
  console.log("valid==="+this.state.firstname,typeof this.state.firstname);
    let errors = {};
    let formIsValid = true;

    if (!this.state.firstname) {
      formIsValid = false;
      errors["firstname"] = "*Please enter First Name.";
    }

    if (this.state.firstname != "") {
      if (!this.state.firstname.match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["firstname"] = "*Please enter alphabet characters only.";
      }
    }

    // if (!this.state.middlename) {
    //   formIsValid = false;
    //   errors["middlename"] = "*Please enter Middle Name.";
    // }

    if (this.state.middlename != "") {
      if (!this.state.middlename.match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["middlename"] = "*Please enter alphabet characters only.";
      }
    }

    // if (!this.state.lastname) {
    //   formIsValid = false;
    //   errors["lastname"] = "*Please enter Last Name.";
    // }

    if (this.state.lastname != "") {
      if (!this.state.lastname.match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["lastname"] = "*Please enter alphabet characters only.";
      }
    }

    if (!this.state.initial) {
      formIsValid = false;
      errors["initial"] = "*Please enter initial.";
    }

    if (this.state.initial != "") {
      if (!this.state.initial.match(/^[a-zA-Z.]*$/)) {
        formIsValid = false;
        errors["initial"] = "*Please enter alphabet characters only.";
      }
    }

    if (!this.state.fathername) {
      formIsValid = false;
      errors["fathername"] = "*Please enter Father Name.";
    }

    if (this.state.fathername != "") {
      if (!this.state.fathername.match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["fathername"] = "*Please enter alphabet characters only.";
      }
    }

    // if (!this.state.spousename) {
    //   formIsValid = false;
    //   errors["spousename"] = "*Please enter Spouse Name.";
    // }

    if (this.state.spousename != "") {
      if (!this.state.spousename.match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["spousename"] = "*Please enter alphabet characters only.";
      }
    }

    if (!this.state.dob) {
      formIsValid = false;
      errors["dob"] = "*Please select Date of Birth.";
    }

    if (!this.state.companyid) {
      formIsValid = false;
      errors["companyid"] = "*Please select Company ID.";
    }

    if (!this.state.department) {
      formIsValid = false;
      errors["department"] = "*Please select Department.";
    }

    if (!this.state.businesstitle) {
      formIsValid = false;
      errors["businesstitle"] = "*Please select Business Title.";
    }

    if (!this.state.reportingperson) {
      formIsValid = false;
      errors["reportingperson"] = "*Please select Reporting Person.";
    }

    if (!this.state.employmentType) {
      formIsValid = false;
      errors["employmentType"] = "*Please select Employment Type.";
    }

    if (!this.state.jobband) {
      formIsValid = false;
      errors["jobband"] = "*Please select Job Band.";
    }

    if (!this.state.joiningdate) {
      formIsValid = false;
      errors["joiningdate"] = "*Please select Joining Date.";
    }

    if (!this.state.mobilenumber) {
      formIsValid = false;
      errors["mobilenumber"] = "*Please enter Mobile Number.";
    }

    if (this.state.mobilenumber != "") {
      if (!this.state.mobilenumber.match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["mobilenumber"] = "*Please enter valid Mobile Number.";
      }
    }

    if (!this.state.alternatenumber) {
      formIsValid = false;
      errors["alternatenumber"] = "*Please enter Alternate Number.";
    }

    if (this.state.alternatenumber != "") {
      if (!this.state.alternatenumber.match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["alternatenumber"] = "*Please enter valid Alternate Number.";
      }
    }

    if (!this.state.pannumber) {
      formIsValid = false;
      errors["pannumber"] = "*Please enter PAN Number.";
    }

    if (this.state.pannumber != "") {
      if (!this.state.pannumber.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) {
        formIsValid = false;
        errors["pannumber"] = "*Please enter valid PAN Number.";
      }
    }

    if (!this.state.aadhernumber) {
      formIsValid = false;
      errors["aadhernumber"] = "*Please enter AADHAR Number.";
    }

    if (this.state.aadhernumber != "") {
     // if (!this.state.aadhernumber.match(/^\d{4}-\d{4}-\d{4}$/)) {
      if (!this.state.aadhernumber.match(/^\d{4}-\d{4}-\d{4}$/)) {
        formIsValid = false;
        errors["aadhernumber"] = "*Please enter valid AADHAR Number.";
      }
    }

    if (!this.state.uannumber) {
      formIsValid = false;
      errors["uannumber"] = "*Please enter UAN Number.";
    }

    if (this.state.uannumber != "") {
      if (!this.state.uannumber.match(/^[a-zA-Z]{5}\d{17}$/)) {
        formIsValid = false;
        errors["uannumber"] = "*Please enter valid UAN Number.";
      }
    }

    if (!this.state.passportnumber) {
      formIsValid = false;
      errors["passportnumber"] = "*Please enter Passport Number.";
    }

    if (this.state.passportnumber != "") {
      if (!this.state.passportnumber.match(/^[a-zA-Z]{1}[0-9]{7}$/)) {
        formIsValid = false;
        errors["passportnumber"] = "*Please enter valid Passport Number.";
      }
    }

    if (!this.state.employeeactive) {
      formIsValid = false;
      errors["employeeactive"] = "*Please Select Employee Active.";
    }

    if (!this.state.companyemail) {
      formIsValid = false;
      errors["companyemail"] = "*Please enter Company Email.";
    }

    if (this.state.companyemail != "") {
      if (!this.state.companyemail.match(/^((([a-zA-Z0-9]+[-._]*){0,2})[a-zA-Z0-9]+@[a-z0-9][a-z0-9-]*\.[a-z]+[[\.]?[a-z]+]*)$/)) {
        formIsValid = false;
        errors["companyemail"] = "*Please enter valid Email-ID.";
      }
    }

    if (!this.state.personalemail) {
      formIsValid = false;
      errors["personalemail"] = "*Please enter Personal Email.";
    }

    if (this.state.personalemail != "") {
      if (!this.state.personalemail.match(/^((([a-zA-Z0-9]+[-._]*){0,2})[a-zA-Z0-9]+@[a-z0-9][a-z0-9-]*\.[a-z]+[[\.]?[a-z]+]*)$/)) {
        formIsValid = false;
        errors["personalemail"] = "*Please enter valid Email-ID.";
      }
    }

    if (!this.state.employeeid) {
      formIsValid = false;
      errors["employeeid"] = "*Please enter Employee ID.";
    }

    // if (this.state.employeeid != "") {
    //   if (!this.state.employeeid.match(/^[a-zA-Z]{1}[0-9]{7}$/)) {
    //     formIsValid = false;
    //     errors["employeeid"] = "*Please enter valid Passport Number.";
    //   }
    // }
    if (!this.state.bloodgroup) {
      formIsValid = false;
      errors["bloodgroup"] = "*Please enter Blood Group.";
    }

    if (!this.state.gender) {
      formIsValid = false;
      errors["gender"] = "*Please select Gender.";
    }

    // ------------------------------------------------------------
    if (!this.state.Emergencycontactname) {
      formIsValid = false;
      errors["Emergencycontactname"] = "*Please enter Emergency contact name.";
    }

    if (this.state.Emergencycontactname != "") {
      if (!this.state.Emergencycontactname.match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["Emergencycontactname"] = "*Please enter alphabet characters only.";
      }
    }

    if (!this.state.Emergencycontactrelationship) {
      formIsValid = false;
      errors["Emergencycontactrelationship"] = "*Please enter Emergency contact relationship.";
    }

    if (this.state.Emergencycontactrelationship != "") {
      if (!this.state.Emergencycontactrelationship.match(/^[a-zA-Z]*$/)) {
        formIsValid = false;
        errors["Emergencycontactrelationship"] = "*Please enter alphabet characters only.";
      }
    }

    if (!this.state.Emergencycontactnumber) {
      formIsValid = false;
      errors["Emergencycontactnumber"] = "*Please enter Emergency contact number.";
    }

    if (this.state.Emergencycontactnumber != "") {
      if (!this.state.Emergencycontactnumber.match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["Emergencycontactnumber"] = "*Please enter valid Emergency contact number.";
      }
    }
    // if (!this.state.resignationdate) {
    //   formIsValid = false;
    //   errors["resignationdate"] = "*Please enter Resignation Date.";
    // }

    // if (!this.state.leavingdate) {
    //   formIsValid = false;
    //   errors["leavingdate"] = "*Please enter Leaving Date.";
    // }

    

    this.setState({
      errors: errors
    });
    return formIsValid;


  }
  //-------------------------
  render() {
   
    var {items,firstnameval,configDetails,reportingpersonDetails} = this.state;
    let button;
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];
    
    
    //console.log("updateProfile=="+this.state.updateProfile);
    if(this.state.updateProfile==false){
      button=<Button bsStyle="info"  pullRight fill onClick={this.submitFunction}>
               Save Profile
              </Button>
    }
    else{
      button=<Button bsStyle="info" pullRight fill  onClick={this.updateFunction}>
                Update Profile
             </Button>
    }
    //-----redux--------
    //const employeeDetails = useSelector(state=>state.EmployeeDetails);
    //const dispatch = useDispatch();
    //----------------
        
   
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Employees Details:"
                content={
                  <form>
                    
                    <div className="row">
                     
                     {/* <div className="col-md-3"> 
                        <select className="form-control" onChange={this.fetchUserFullDetailById} value={this.state.Id}>
                        <option key='0' value=''>- Choose Employee -</option>
                          {items.map(item=>(
                            <option key={item._id} value={item._id}>
                              {item.FirstName}
                            </option>
                          ))}
                        </select>
                     </div> */}
                     <div className="col-md-3">
                       {/* <EmpList/> */}
                       <Select
                        value={this.state.selectedOption}
                        options={items.map(item=>({ value: item._id, label: item.FirstName}))}
                        onChange={this.fetchUserFullDetailById}
                        placeholder ="Select Employee"
                      />
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>First Name:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="firstname" value={this.state.firstname}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.firstname}</div>
                     </div>
                     <div className="col-md-3"><label>Middle Name:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="middlename" value={this.state.middlename}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.middlename}</div>
                     </div>
                     <div className="col-md-3"><label>Last Name:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="lastname" value={this.state.lastname}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.lastname}</div>
                     </div>
                     <div className="col-md-3"><label>Initial:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="initial" value={this.state.initial}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.initial}</div>
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>Father Name:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="fathername" value={this.state.fathername}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.fathername}</div>
                     </div>
                     <div className="col-md-3"><label>Spouse Name:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="spousename" value={this.state.spousename}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.spousename}</div>
                     </div>
                     <div className="col-md-3"><label>Date of Birth:</label>
                        {/* <input type="text" className="form-control" name="dob" value={this.state.dob}  onChange={this.handleInputChange} /> */}
                        <DatePicker className="form-control customDatePickerWidth"
                        selected={ this.state.dob }
                       // onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleDateChange} //only when value has changed
                        name="dob"
                      />
                      <div className="errorMsg">{this.state.errors.dob}</div>
                     </div>
                     <div className="col-md-3"><label>Entity:</label>
                      <select className="form-control" name="companyid" value={this.state.companyid} onChange={this.handleInputChange}>
                        <option key='0' value=''>- Choose Entity -</option>
                          {configDetails.map(data=>(
                            data.CompanyId?<option key={data.CompanyId} value={data.CompanyId}>
                              {data.CompanyId}
                            </option>:''
                          ))}
                      </select>
                      <div className="errorMsg">{this.state.errors.companyid}</div>
                        {/* <input type="text" className="form-control" name="companyid " value={this.state.companyid}  onChange={this.handleInputChange} /> */}
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>Department:</label>
                        <select className="form-control" name="department" onChange={this.handleInputChange} value={this.state.department}>
                        <option key='0' value=''>- Choose Department -</option>
                          {configDetails.map(data=>(
                            data.Department?<option key={data.Department} value={data.Department}>
                              {data.Department}
                            </option>:''
                          ))}
                        </select>
                        <div className="errorMsg">{this.state.errors.department}</div>
                     </div>
                     <div className="col-md-3"><label>Designation:</label>
                        <select className="form-control" name="businesstitle" onChange={this.handleInputChange} value={this.state.businesstitle}>
                        <option key='0' value=''>- Choose Designation -</option>
                          {configDetails.map(data=>(
                            data.BusinessTitle && data.DepID == this.state.department?<option key={data.BusinessTitle} value={data.BusinessTitle}>
                              {/* {console.log("Level=="+data.Level)} */}
                              {data.BusinessTitle}
                            </option>:''
                          ))}
                        </select>
                        <div className="errorMsg">{this.state.errors.businesstitle}</div>
                     </div>
                     <div className="col-md-3"><label>Reporting Person:</label>
                        {/* <input type="text" className="form-control" name="reportingperson" value={this.state.reportingperson}  onChange={this.handleInputChange} /> */}
                        <select className="form-control" name="reportingperson" onChange={this.handleInputChange} value={this.state.reportingperson}>
                        <option key='0' value=''>- Choose Reporting Person -</option>
                          {reportingpersonDetails.map(data=>(
                            data.EmpID?<option key={data.EmpID} value={data.EmpID}>
                              {data.FirstName}
                            </option>:''
                          ))}
                        </select>
                        <div className="errorMsg">{this.state.errors.reportingperson}</div>
                     </div>
                     <div className="col-md-3"><label>Employment Type:</label>
                        <select className="form-control" name="employmentType" onChange={this.handleInputChange} value={this.state.employmentType}>
                        <option key='0' value=''>- Choose Employment Type -</option>
                         {configDetails.map(data=>(
                            data.EmploymentType?<option key={data.EmploymentType} value={data.EmploymentType}>
                            {data.EmploymentType}
                          </option>:''
                          ))}
                        </select>
                        <div className="errorMsg">{this.state.errors.employmentType}</div>
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>Job Band:</label>
                        {/* <input type="text" className="form-control" name="jobband " value={this.state.jobband}  onChange={this.handleInputChange} /> */}
                        <select className="form-control" name="jobband" onChange={this.handleInputChange} value={this.state.jobband}>
                        <option key='0' value=''>- Choose Job Band -</option>
                         {configDetails.map(data=>(
                            data.JobBand?<option key={data.JobBand} value={data.JobBand}>
                            {data.JobBand}
                          </option>:''
                          ))}
                        </select>
                        <div className="errorMsg">{this.state.errors.jobband}</div>
                     </div>
                     <div className="col-md-3"><label>Joining Date:</label>
                        {/* <input type="text" className="form-control" name="joiningdate" value={this.state.joiningdate}  onChange={this.handleInputChange} /> */}
                        <DatePicker className="form-control customDatePickerWidth"
                        selected={ this.state.joiningdate }
                       // onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleDateChange2} //only when value has changed
                        name="joiningdate"
                        />
                        <div className="errorMsg">{this.state.errors.joiningdate}</div>
                     </div>
                     <div className="col-md-3"><label>Mobile Number:</label>
                        <input type="text" autoComplete="off" className="form-control" name="mobilenumber" value={this.state.mobilenumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.mobilenumber}</div>
                     </div>
                     <div className="col-md-3"><label>Alternate Number:</label>
                        <input type="text" autoComplete="off" className="form-control" name="alternatenumber" value={this.state.alternatenumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.alternatenumber}</div>
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>PAN Number:</label>
                        <input type="text" autoComplete="off" className="form-control" name="pannumber" value={this.state.pannumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.pannumber}</div>
                     </div>
                     <div className="col-md-3"><label>AADHAR Number:</label>
                        <input type="text" autoComplete="off" className="form-control" name="aadhernumber" value={this.state.aadhernumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.aadhernumber}</div>
                     </div>
                     <div className="col-md-3"><label>UAN (PF):</label>
                        <input type="text" autoComplete="off" className="form-control" name="uannumber" value={this.state.uannumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.uannumber}</div>
                     </div>
                     <div className="col-md-3"><label>Passport Number:</label>
                        <input type="text" autoComplete="off" className="form-control" name="passportnumber" value={this.state.passportnumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.passportnumber}</div>
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>Employee Status:</label>
                        {/* <input type="text" autoComplete="off" className="form-control" name="employeeactive " value={this.state.employeeactive}  onChange={this.handleInputChange} /> */}
                        <select className="form-control" name="employeeactive" onChange={this.handleInputChange} value={this.state.employeeactive}>
                        <option key='0' value=''>- Choose -</option>
                        <option key='1' value='Yes'>Active</option>
                        <option key='2' value='No'>Inactive</option>
                        </select>
                        <div className="errorMsg">{this.state.errors.employeeactive}</div>
                     </div>
                     <div className="col-md-3"><label>Company Email:</label>
                        <input type="text" autoComplete="off" className="form-control" name="companyemail" value={this.state.companyemail}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.companyemail}</div>
                     </div>
                     <div className="col-md-3"><label>Personal Email:</label>
                        <input type="text" autoComplete="off" className="form-control" name="personalemail" value={this.state.personalemail}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.personalemail}</div>
                     </div>
                     <div className="col-md-3"><label>Employee ID:</label>
                        <input type="text" autoComplete="off" className="form-control" name="employeeid" value={this.state.employeeid}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.employeeid}</div>
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                     <div className="col-md-3"><label>Blood Group:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="bloodgroup" value={this.state.bloodgroup}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.bloodgroup}</div>
                     </div>
                     <div className="col-md-3"><label>Gender:</label>
                        {/* <input type="text" autoComplete="off" className="form-control" name="gender" value={this.state.gender}  onChange={this.handleInputChange} /> */}
                        <select className="form-control" name="gender" onChange={this.handleInputChange} value={this.state.gender}>
                        <option key='0' value=''>- Choose Gender -</option>
                        <option key='1' value='Male'>Male</option>
                        <option key='2' value='Female'>Female</option>
                        <option key='3' value='Transgender'>Transgender</option>
                        </select>
                        <div className="errorMsg">{this.state.errors.gender}</div>
                     </div>
                     <div className="col-md-3"><label>Resignation Date:</label>
                        <DatePicker className="form-control customDatePickerWidth"
                        selected={ this.state.resignationdate }
                       // onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleDateChange3} //only when value has changed
                        name="resignationdate"
                        autoComplete="off"
                        />
                        <div className="errorMsg">{this.state.errors.resignationdate}</div>
                     </div>
                     <div className="col-md-3"><label>Leaving Date:</label>
                        <DatePicker className="form-control customDatePickerWidth"
                        selected={ this.state.leavingdate }
                       // onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleDateChange4} //only when value has changed
                        name="leavingdate"
                        autoComplete="off"
                        minDate={moment(new Date('02-01-1970'))}
                        />
                        <div className="errorMsg">{this.state.errors.leavingdate}</div>
                     </div>
                   </div>
                   <hr></hr>
                   <div className="row">
                   <div className="col-md-3"><label>Emergency Contact Name:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="Emergencycontactname" value={this.state.Emergencycontactname}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.Emergencycontactname}</div>
                     </div>
                     <div className="col-md-3"><label>Emergency Contact Number:</label>
                        <input type="text" autoComplete="off" className="form-control" name="Emergencycontactnumber" value={this.state.Emergencycontactnumber}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.Emergencycontactnumber}</div>
                     </div>
                     <div className="col-md-3"><label>Emergency Contact Relationship:</label>
                        <input type="text" autoComplete="off" className="form-control Capitalize_class" name="Emergencycontactrelationship" value={this.state.Emergencycontactrelationship}  onChange={this.handleInputChange} />
                        <div className="errorMsg">{this.state.errors.Emergencycontactrelationship}</div>
                     </div>
                   </div>
                   
                   {/* <Button bsStyle="info"  fill  onClick={this.submitFunction}>
                      Save Profile
                    </Button>
                    <Button bsStyle="info" pullRight fill  onClick={this.updateFunction}>
                      Update Profile
                    </Button> */}

                    {button}
                   
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            
          </Row>
        </Grid>
      </div>
    );
  }
}

export default EmployeeForm;
