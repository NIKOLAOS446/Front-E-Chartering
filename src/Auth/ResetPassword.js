import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";



class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
         
        };
    }

    

    render() {
        return (
<div className="flex-container">
          <form  className="box">
                <h3>Reset Password</h3>              

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value ={this.state.email} />
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
           
        );
    }
}
export default ResetPassword;