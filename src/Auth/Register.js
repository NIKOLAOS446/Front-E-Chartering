import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import axios from 'axios';
import styles from './register.module.css';



class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            Role: "",
            error: null,
            message: null,
            Isregistered: false,
        };
    }
    handleSubmit = evt => {
        evt.preventDefault();

        const user = {
            userId: 0,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            Role: this.state.Role
        };
        axios
            .post(`https://localhost:44321/api/ApplicationUser/Register`, user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                // alert("User is registered Successfully");
                this.setState({ message: "User is registered Successfully",Isregistered:true });
            })
            .catch(
                httpError => this.setState({ error: httpError.response.data })


            );
    };

    handleFormChange(name, value) {
        this.setState({ [name]: value });
    }


    render() {
        return (
            <div className={styles.container}>
                <div className="flex-container">
                    <form className="box">
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>User Name</label>
                            <input type="text" className="form-control" placeholder=" username" required value={this.state.username} onChange={evt =>
                                this.handleFormChange("username", evt.target.value)
                            } />
                        </div>

                        <div className="form-group">
                            <label>Bussiness Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={evt =>
                                this.handleFormChange("email", evt.target.value)
                            } />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select className="custom-select" id="validationDefault04" required value={this.state.Role} onChange={evt =>
                                this.handleFormChange("Role", evt.target.value)
                            }>
                                <option  disabled value="">Choose...</option>
                                <option value="Shipowner">Shipowner</option>
                                <option value="Charterer">Charterer</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={evt =>
                                this.handleFormChange("password", evt.target.value)
                            } />
                        </div>
                        <div className="field">
                            {this.state.error && !this.state.Isregistered  &&(
                                <article className="message is-danger">
                                    <div className="message-body">{this.state.error}</div>
                                </article>
                            )}
                         { this.state.Isregistered && (  <div className="notification is-success is-light">
                          <button className="delete"></button> User is registered Successfully. Wait to be approved by Admin
                            </div>)}
                            <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Sign Up</button>
                        </div>

                        <p className="forgot-password text-right">
                            Already registered
                    <Link to={'/Login'} className="nav-link">sign in?</Link>
                            <a href="#" ></a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
export default Register;