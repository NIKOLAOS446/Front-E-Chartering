import React from 'react'
import axios from 'axios'
import { UserConsumer } from '../../UserContext';
import UserControlList from './UserControlList';





class UserControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            loading: false,
            token: null,
            users:[],
            tempUser: null       
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        axios.get(`https://localhost:44321/api/ApplicationUser/GetNotApprovedUsers`, {
            headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
            // console.log(this.props.token);
            this.setState({ users: res.data, loading: false })
            console.log("data prod", res.data)
        })
            .catch(err => this.setState({ loading: false }))
            ;

    }
    approveUser = (user) => {
       
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };
       if (user.id != null)
         {
            user.isApproved= true;
            axios.put(`https://localhost:44321/api/ApplicationUser/` + user.id, user, config)
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
    }
    deleteUser = (user) => {       
        this.setState({ loading: true })       
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };
        if (user.id !=null){
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
    }
   
    render() {
        return (
            <div>
                <UserConsumer>{(token, Userid) => { this.state.token = token }
                }</UserConsumer>               
                <UserControlList users={this.state.users}
                approveUser={this.approveUser}
                deleteUser={this.deleteUser}
                />
            </div>)
    }

}
export default UserControl