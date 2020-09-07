import React from 'react'
import axios from 'axios'
import { UserConsumer } from '../../UserContext'
import SearchListCargoes from './SearchListCargoes'
import SearchCargoesForm from './SearchCargoesForm'
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


class SearchCargoes extends React.Component{
    constructor(props){
        super(props)
        this.state={
            token: null,
            loading:false,
            user:{
                email: ''
            },
            cargoes:[],
            ships:[],
            tempCargo:null,
            selectedShip:1,
            freight:null,
            isSent:false,
            open: false,
            commission: 0
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

        axios.get(`https://localhost:44321/api/Cargoes/All`, {
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
        this.setState({ tempCargo: null })
    }
    editCargo = (cargoes) => {
        this.setState({ tempCargo: cargoes })
    }
    handleChange = e => {

        console.log(e.target.value);
        this.setState({ selectedShip: e.target.value })
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
        const cargo = this.state.tempCargo;
        const offer = {
            CargoUserId: cargo.userId,
            cargoid: cargo.id,
            shipUserid: "",
            shipid: this.state.selectedShip,
            fixedfreight: this.state.freight,
            commission: this.state.commission
        }

        if (offer.shipid != null && offer.fixedfreight != null && offer.commission !=0) {
            console.log(offer)
            const config = {
                headers: { Authorization: `Bearer ${this.state.token}` }
            };

             axios.post(`https://localhost:44321/api/ShipCargoRelations/ShipownerPostShipCargoRelation`, offer, config)
                .then(res => {
                    this.setState({ loading: false, isSent:true });
                     console.log(res);
                    console.log(res.data);
                    
                     this.closeForm();
                     this.openDialog();
                 })
                 .catch(httpError => this.setState({ error: httpError.response.data }));
         }
        else
        this.setState({isSent:false})
        this.openDialog();
    }
    render(){
        return(
            <div>
                <UserConsumer>{(token, Userid) => { this.state.token = token }
                }</UserConsumer>
                <SearchListCargoes cargoes={this.state.cargoes} editCargo={this.editCargo}/>


                <SearchCargoesForm cargo ={this.state.tempCargo} ships={this.state.ships}
                selectedShip={this.state.selectedShip}
                handleChange={this.handleChange}
                user={this.state.user}
                closeForm={this.closeForm}
                loading={this.state.loading}
                handleFreightChange={this.handleFreightChange}
                error={this.state.error}
                handleSubmit={this.handleSubmit}
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

export default SearchCargoes