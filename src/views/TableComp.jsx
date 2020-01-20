import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { thArray} from "variables/Variables.jsx";

class TableComp extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            items:[],
            tdArray1:props.tdArray1
          };
        console.log("props=="+props.tdArray1);
       
    }

    render() {
        //console.log("arr="+tdArray);
        return (
          <div>
            <Table hover>
              <thead>
                <tr>
                  {thArray.map((prop, key) => {
                     
                    return <th key={key}>{prop}</th>;
                   
                  })} 
                </tr>
              </thead>
              <tbody>
                {this.state.tdArray1.map((prop, key) => {
                  return (
                    <tr key={key}>
                      {prop.map((prop, key) => {
                        return <td key={key}>{prop}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
              </Table>
          </div>
        );
      }
}
    
export default TableComp;
