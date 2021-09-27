import React from "react";
import { NavLink } from "react-router-dom";
import './style.css'
function ShowData(props) {
  function firstName(emailId) {
    let regx = /\w+[\.]?\w+/gi;
    let name = emailId.match(regx)[0];
    return name;
  }
  return (
    <> 
    {props.type === "employee"?
      props.data.map((value, index) => (
        <div className="card" key={index}>
          <div className="card-body">          
            <NavLink to={`/${props.type}/${firstName(value.pField2)}`}>
                {value.pField1}
              </NavLink>
          </div>
        </div>
      )):(
        <table className="table space-table">
           <thead className="thead-dark">
          <tr>
            <th>Conference ID</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
            {props.data.map((value, index) => (
              <tr key={index}>
                <td className="col">

                  <NavLink
                    to={`/${props.type}/${value.pField1}`}
                    className="link-conference"
                  >
                    {value.pField1}
                  </NavLink>
                </td>
                <td className="col">{value.pField2}</td>
              </tr>
            ))}
          </tbody>
       
        </table>
      )}
    </>
  );
}
export default ShowData;
