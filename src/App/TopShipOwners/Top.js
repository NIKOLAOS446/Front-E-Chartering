import React from 'react';
import axios from 'axios';
import { UserConsumer } from '../../UserContext';
import TopList from './TopList';



class Top extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            // ratings: [],
            loading: null,
            Countratings: []

        }
    }
    componentDidMount() {
        // this.setState({ loading: true })
        // axios.get(`https://localhost:44321/api/Ratings`, {
        //     headers: { Authorization: "Bearer " + this.state.token }
        // }).then(res => {
        //     // console.log(this.props.token);
        //     this.setState({ ratings: res.data, loading: false })
        //     console.log("data prod", res.data);
        // })
        //     .catch(err => this.setState({ loading: false }))
        //     ;
        axios.get(`https://localhost:44321/api/Ratings/GetCountRatingsss`, {
            headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
            // console.log(this.props.token);
            this.setState({ Countratings: res.data, loading: false })
            console.log("data prod", res.data);
        })
            .catch(err => this.setState({ loading: false }))
            ;
    }

    render() {
        return (
        <div>
            <UserConsumer>{(token, Userid) => { this.state.token = token }
            }</UserConsumer>

            <TopList Countratings={this.state.Countratings} />
            </div>
        )
    }
}
export default Top