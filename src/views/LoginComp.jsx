import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card.jsx";

class LoginComp extends Component{
    constructor(props)
    {
        super(props);
        this.state={};
        this.LoginFun = this.LoginFun.bind(this);
    }
    LoginFun()
    {
        let path = `/admin/employeeList`;
        this.props.history.push(path);
    }
    render(){
        return(
            // <div>
            //     <Button bsStyle="info"  fill  onClick={this.LoginFun}>
            //         Login
            //       </Button>
                  
                  
            // </div>





        <div >
        <Grid>
        <Row>
            <Col md={6}>
            <Card
                //title="Employees Details"
                content={
                    <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
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
export default LoginComp;

