import React from 'react'
import axios from 'axios'
import { UserConsumer } from '../../UserContext'
import SearchListShips from './SearchListShips'
import SearchShipForm from './SearchShipForm'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class SearchShips extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ships: [],
            loading: false,
            token: null,
            tempShip: null,
            cargoes: [],
            user: {
                email:''
            },
            selectedCargo: 1,
            tempOffer: null,
            freight: null,
            error: null,
            open: false,
            isSent: false,
            commission: 0
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.get(`https://localhost:44321/api/Ships/All`, {
            headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
            // console.log(this.props.token);
            this.setState({ ships: res.data, loading: false })
            console.log("data prod", res.data)
        })
            .catch(err => this.setState({ loading: false }))
            ;

        axios.get(`https://localhost:44321/api/Cargoes/`, {
            headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
            // console.log(this.props.token);
            this.setState({ cargoes: res.data, loading: false })
            console.log("data prod", res.data)
        })
            .catch(err => this.setState({ loading: false }))
            ;
        axios.get(`https://localhost:44321/api/ApplicationUser/GetUser`, {
            headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
            // console.log(this.props.token);
            this.setState({ user: res.data, loading: false })
            console.log("data prod", res.data)
        })
            .catch(err => this.setState({ loading: false }))
            ;
    }

   

    closeForm = () => {
        this.setState({ tempShip: null })
    }
    editShip = (ships) => {
        this.setState({ tempShip: ships })
    }
    handleChange = e => {

        console.log(e.target.value);
        this.setState({ selectedCargo: e.target.value })
    };
    handleFreightChange = (name, value) => {

        this.setState({ [name]: value })
    }

    openDialog=() =>{
        this.setState({ open: true });
    }
    handleClose=()=>{
        this.setState({open:false});
    }

    handleSubmit = evt => {
        evt.preventDefault();

        this.setState({ loading: true })
        const ship = this.state.tempShip;
        const offer = {
            shipUserId: ship.userId,
            shipid: ship.id,
            cargoUserid: "",
            cargoid: this.state.selectedCargo,
            fixedfreight: this.state.freight,
            commission: this.state.commission
        }

        if (offer.cargoid != null && offer.fixedfreight != null && offer.commission!=0) {
            console.log(offer)
            const config = {
                headers: { Authorization: `Bearer ${this.state.token}` }
            };

            axios.post(`https://localhost:44321/api/ShipCargoRelations/ChartererPostShipCargoRelation`, offer, config)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.setState({ loading: false, isSent:true })
                    this.closeForm();
                    this.openDialog();
                })
                .catch(httpError => this.setState({ error: httpError.response.data }));
        }
        else{
        this.setState({isSent:false})
        this.openDialog();
        }
    }
    render() {
        return (

            <div>
                <UserConsumer>{(token, Userid) => { this.state.token = token }
                }</UserConsumer>

                <SearchListShips
                    ships={this.state.ships}
                    editShip={this.editShip}
                    closeForm={this.closeForm}

                />

                <SearchShipForm
                    ship={this.state.tempShip}
                    closeForm={this.closeForm}
                    loading={this.state.loading}
                    cargoes={this.state.cargoes}
                    selectedCargo={this.state.selectedCargo}
                    handleChange={this.handleChange}
                    user={this.state.user}
                    handleSubmit={this.handleSubmit}
                    handleFreightChange={this.handleFreightChange}
                    error={this.state.error}
                />
                <Dialog open={this.state.open} onEnter={console.log('Hey.')} onClose={this.handleClose}>
            <DialogTitle>Hello {this.state.user.userName}</DialogTitle>
                  {(this.state.isSent!=false) ? <DialogContent>Your Offer sent Successfully </DialogContent>
                  :<DialogContent>Please Fill All Fields </DialogContent>
                  
                  }
                </Dialog>
            </div>
        )
    }
}

export default SearchShips