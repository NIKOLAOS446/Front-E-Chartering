import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from 'axios';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          rememberme: false,
          error: null,
          role:null
          
        };
    }

    componentDidMount() {
      //Check existing token if valid
      const token = localStorage.getItem("token");
      if (!!token) {
        axios
          .get(`https://localhost:44321/api/ApplicationUser/check`, {
            headers: { Authorization: "Bearer " + token }
          })
          .then(res => {
            this.props.setIsAuthenticated(token);
          });
      }
    }

    handleSubmit = evt => {
      evt.preventDefault();
  
      const user = {
        userId: 0,
        firstName: null,
        lastName: null,
        userName: null,
        email: this.state.email,
        password: this.state.password
      };
      axios
      .post(`https://localhost:44321/api/ApplicationUser/Authenticate`, user)
      .then(res => {
        console.log(res);
        console.log(res.data);
        const role = res.data.role;
        const userId = res.data.id;
        this.props.setRole(role);
        const token = res.data.token;
        this.props.setIsAuthenticated(token);
        if (this.state.rememberme) localStorage.setItem("token", token);
      })
      .catch(
        httpError => this.setState({ error: httpError.response.data })
        //console.log(httpError.response)
      );
    };

    handleFormChange(name, value) {
      this.setState({ [name]: value });
    }


    render(){      
    return(
      
      <div className="flex-container">
      <form  className="box">
        <h3>Sign In</h3>
      <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email"  value={this.state.email}  onChange={evt =>
             this.handleFormChange("email", evt.target.value)
              }/>
      </div>

      <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={evt =>
             this.handleFormChange("password", evt.target.value)
              }/>
      </div>

      <div className="form-group">
          <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1"checked={this.state.rememberme}
                    onChange={evt =>
                      this.handleFormChange(
                        "rememberme",
                        evt.target.checked
                      )
                    } />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
          </div>
      </div>
      <div className="field">
                {this.state.error && (
                      <article class="message is-danger">
                        <div class="message-body">{this.state.error}</div>
                      </article>
                    )}

      <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
      <p className="forgot-password text-right">
          <Link to={'/Forgot'} className="nav-link"> Forgot password?</Link>
      </p>
      </div>
  </form>
  </div>
  
    );
    }  
}

export default Login;