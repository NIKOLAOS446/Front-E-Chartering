import React from 'react';
import axios from 'axios';
import CargoList from './CargoList';
import CargoForm from './CargoForm';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from 'leaflet';
import Geocode from "react-geocode";
import { UserConsumer } from '../../UserContext';



class Cargoes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            loading: false,
            token: null,
            cargoes: []
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        axios.get(`https://localhost:44321/api/Cargoes/`, {
            headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
            // console.log(this.props.token);
            this.setState({ cargoes: res.data, loading: false })
            console.log("data prod", res.data)
        })
            .catch(err => this.setState({ loading: false }))
            ;

    }

    CargoTemplate = {
        cargoType: "",
        quantity: "",
        departurePort: "",
        destinationPort: "",
        dischargingRate: "",
        loadingRate: "",
        dateFrom: "",
        dateTo: ""
    }

    addCargo = () => {
        const newCargo = { ...this.CargoTemplate };
        this.setState({tempCargo: newCargo});
    }

    closeForm = () => {
        this.setState({ tempCargo: null })
    }

    editCargo= (cargoes) => {
        this.setState({ tempCargo: cargoes });
    }

    handleTempCargoChange = (name, value) => {
        const oldTempCargo  = this.state.tempCargo
        this.setState({ tempCargo: { ...oldTempCargo, [name]: value } });
    }

    saveCargo=()=>{
        this.setState({ loading: true })
        const cargo = this.state.tempCargo;       
        console.log(cargo)
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };
        if (cargo.id == null) {
            axios.post(`https://localhost:44321/api/cargoes/`, cargo, config)
                .then(res => {
                    const newCargoes = [...this.state.cargoes]
                    newCargoes.push(res.data)
                    this.setState({ cargoes: newCargoes, tempCargo: null, loading: false })
                })
                .catch(err => this.setState({ loading: false }));
        }
        else {
            axios.put(`https://localhost:44321/api/cargoes/` + cargo.id, cargo, config)
                .then(res => {
                    const newCargoes = [...this.state.cargoes]
                    const index = newCargoes.findIndex(pr => pr.id == cargo.id)
                    if (index >= 0) {
                        newCargoes.splice(index, 1, cargo);
                        this.setState({ cargoes: newCargoes, tempCargo: null, loading: false })
                    }
                    else {
                        this.setState({ loading: false })
                    }
                })
                .catch(err => this.setState({ loading: false }))
                ;

        }
    }

    deleteCargo = () => {

        this.setState({ loading: true })
        const cargo = this.state.tempCargo;
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };
        axios.delete(`https://localhost:44321/api/cargoes/` + cargo.id, config)
            .then(res => {
                const newCargoes = [...this.state.cargoes]
                const index = newCargoes.findIndex(pr => pr.id == cargo.id)
                if (index >= 0) {
                    newCargoes.splice(index, 1);
                    this.setState({ cargoes: newCargoes, tempCargo: null, loading: false })
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
                <CargoList cargoes={this.state.cargoes} loading={this.state.loading} addCargo={this.addCargo} editCargo={this.editCargo}></CargoList>
                <CargoForm 
                cargo={this.state.tempCargo}
                 onCargoChange={this.handleTempCargoChange}
                 closeForm={this.closeForm}
                 saveCargo={this.saveCargo}
                 deleteCargo={this.deleteCargo}
                 loading = {this.state.loading}  ></CargoForm>
            </div>
        )
    }
}

export default Cargoes