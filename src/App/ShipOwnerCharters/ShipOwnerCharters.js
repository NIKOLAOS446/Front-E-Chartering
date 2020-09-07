import React from 'react'
import axios from 'axios'
import { UserConsumer } from '../../UserContext'
import ShipOwnerChartersList from './ShipOwnerChartersList';

class ShipOwnerCharters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charters: [],
            loading: false,
            token: null,
            tempCharter: {},
            currentDate: null
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        axios.get(`https://localhost:44321/api/ShipCargoRelations/GetApprovedShipCargoRelationsByShipOwner`, {
            headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
               // console.log(this.props.token);
                this.setState({ charters: res.data, loading: false })
                console.log("data prod", res.data)
            })
            .catch(err => this.setState({ loading: false }))
            ;
    
    }

    render() {
        return (
            <div>
                   <UserConsumer>{(token, Userid)=>
                {this.state.token=token}              
            }</UserConsumer>
                <ShipOwnerChartersList
                charters={this.state.charters}
                currentDate={this.state.currentDate}
                />
            </div>
        )
    }
}

export default ShipOwnerCharters