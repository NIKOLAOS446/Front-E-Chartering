import React from 'react'
import axios from 'axios'
import { UserConsumer } from '../../UserContext';
import UsersList from './UsersList';
import UserForm from './UserForm';



class Administration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            loading: false,
            token: null,
            tempUser:null,
            users: []
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        axios.get(`https://localhost:44321/api/ApplicationUser/GetApprovedUsers`, {
            headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
            // console.log(this.props.token);
            this.setState({ users: res.data, loading: false })
            console.log("data prod", res.data)
        })
            .catch(err => this.setState({ loading: false }))
            ;

    }

    UserTemplate = {
        userName: "",
        email: "",
        phoneNumber: "",
        Role:"",
        password:""
    }

    addUser = () => {
        const newUser = { ...this.UserTemplate };
        this.setState({ tempUser: newUser });
    }

    closeForm = () => {
        this.setState({ tempUser: null })
    }

    editUser = (users) => {
        this.setState({ tempUser: users });
    }

    handleTempUserChange = (name, value) => {
        const oldTempUser = this.state.tempUser
        this.setState({ tempUser: { ...oldTempUser, [name]: value } });
    }

    saveUser=()=>{
        this.setState({ loading: true })
        const user = this.state.tempUser;       
        console.log(user)
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };
        if (user.id == null) {
            axios.post(`https://localhost:44321/api/ApplicationUser/Register`, user, config)
                .then(res => {
                    const newUsers = [...this.state.users]
                    newUsers.push(res.data)
                    this.setState({ users: newUsers, tempUser: null, loading: false })
                })
                .catch(err => this.setState({ loading: false }));
        }
        else {
            axios.put(`https://localhost:44321/api/ApplicationUser/UpdateUser` + user.id, user, config)
                .then(res => {
                    const newUsers = [...this.state.users]
                    const index = newUsers.findIndex(pr => pr.id == user.id)
                    if (index >= 0) {
                        newUsers.splice(index, 1, user);
                        this.setState({ users: newUsers, tempUser: null, loading: false })
                    }
                    else {
                        this.setState({ loading: false })
                    }
                })
                .catch(err => this.setState({ loading: false }))
                ;

        }
    }

    deleteUser = () => {

        this.setState({ loading: true })
        const user = this.state.tempUser
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };
        axios.delete(`https://localhost:44321/api/ApplicationUser/` + user.id, config)
            .then(res => {
                const newUsers = [...this.state.users]
                const index = newUsers.findIndex(pr => pr.id == user.id)
                if (index >= 0) {
                    newUsers.splice(index, 1);
                    this.setState({ users: newUsers, tempUser: null, loading: false })
                }
                else {
                    this.setState({ loading: false })
                }
            })
            .catch(err => this.setState({ loading: false }))
            ;

    }
    render() {
        return (
            <div>
                <UserConsumer>{(token, Userid) => { this.state.token = token }
                }</UserConsumer>

                <UsersList
                    users={this.state.users}
                    addUser={this.addUser}
                    editUser={this.editUser}
                />

                <UserForm user={this.state.tempUser}
                    closeForm={this.closeForm}
                    onUserChange={this.handleTempUserChange}
                    saveUser={this.saveUser}
                    deleteUser={this.deleteUser}
                />
            </div>)
    }

}
export default Administration