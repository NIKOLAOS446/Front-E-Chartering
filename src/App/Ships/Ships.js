import React from 'react';
import axios from 'axios';
import ShipList from './ShipsList';
import ShipForm from './ShipForm';

import {UserConsumer} from '../../UserContext';

class Ships extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ships: [],
            tempShip: null,
            loading: false,
            token:null
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.get(`https://localhost:44321/api/Ships/`, {
            headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
               // console.log(this.props.token);
                this.setState({ ships: res.data, loading: false })
                console.log("data prod", res.data)
            })
            .catch(err => this.setState({ loading: false }))
            ;
    }
    shipTemplate = {
        dwcc: "",
        type: "",
        location: "",
        date: "",
        flag: "",
        year: ""            
    }
    addShip = () => {
        const newShip = { ...this.shipTemplate };
        this.setState({ tempShip: newShip })
    }

    closeForm = () => {
        this.setState({ tempShip: null })
    }

    editShip = (ships) => {
        this.setState({ tempShip: ships })
    }

    handleTempShipChange = (name, value) => {
        const oldTempShip = this.state.tempShip
        this.setState({ tempShip: { ...oldTempShip, [name]: value } })
    }
    saveShip = () => {
        this.setState({ loading: true })
        const ship = this.state.tempShip;       
        console.log(ship)
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };
        if (ship.id == null) {
            axios.post(`https://localhost:44321/api/ships/`, ship, config)
                .then(res => {
                    const newShips = [...this.state.ships]
                    newShips.push(res.data)
                    this.setState({ ships: newShips, tempShip: null, loading: false })
                })
                .catch(err => this.setState({ loading: false }));
        }
        else {
            axios.put(`https://localhost:44321/api/ships/` + ship.id, ship, config)
                .then(res => {
                    const newShips = [...this.state.ships]
                    const index = newShips.findIndex(pr => pr.id == ship.id)
                    if (index >= 0) {
                        newShips.splice(index, 1, ship);
                        this.setState({ ships: newShips, tempShip: null, loading: false })
                    }
                    else {
                        this.setState({ loading: false })
                    }
                })
                .catch(err => this.setState({ loading: false }))
                ;

        }
    }
        deleteShip = () => {

            this.setState({ loading: true })
            const ship = this.state.tempShip;
            const config = {
                headers: { Authorization: `Bearer ${this.state.token}` }
            };
            axios.delete(`https://localhost:44321/api/ships/` + ship.id, config)
                .then(res => {
                    const newShips = [...this.state.ships]
                    const index = newShips.findIndex(pr => pr.id == ship.id)
                    if (index >= 0) {
                        newShips.splice(index, 1);
                        this.setState({ ships: newShips, tempShip: null, loading: false })
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
                 
                <UserConsumer>{(token, Userid)=>
                {this.state.token=token}              
            }</UserConsumer>
                <ShipList 
                ships = {this.state.ships}
                editShip={this.editShip}
                addShip={this.addShip}
                loading = {this.state.loading}
                
                />
                <ShipForm
                 ship={this.state.tempShip}
                 onShipChange={this.handleTempShipChange}
                 closeForm={this.closeForm}
                 saveShip={this.saveShip}
                 deleteShip={this.deleteShip}
                 loading = {this.state.loading}
                
                />
            </div>
        )
    }
}

export default Ships;