import React from 'react'
import axios from 'axios'
import { UserConsumer } from '../../UserContext'
import CargoOwnerChartersList from './CargoOwnerChartersList';
import RatetheCharterForm from './RatetheCharterForm';

const rates = [
    {
        description: "Positive",
        score: 5,
    },
    {
        description: "Neutral",
        score: 3,
    },
    {
        description: "Negative",
        score: 1,
    },
]
class CargoOwnerCharters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charters: [],
            loading: false,
            token: null,
            tempCharter: null,
            selectedValue: 6,
            loading: false,
            tempRate: null,
            isSent: false,
            currentDate:null

        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.get(`https://localhost:44321/api/ShipCargoRelations/GetApprovedShipCargoRelationsByCharterer`, {
            headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
            // console.log(this.props.token);
            this.setState({ charters: res.data, loading: false })
            console.log("data prod", res.data)
        })
            .catch(err => this.setState({ loading: false }))
            ;
            var today = new Date();

            var time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            console.log(time);
            this.setState({currentDate: time})
    }
    editCharter = (charters) => {
        this.setState({ tempCharter: charters })
    }
    closeForm = () => {
        this.setState({ tempCharter: null })
    }
    handleChange = (name, value) => {
        this.setState({ [name]: value })
        // console.log(e.target.value);
        // this.setState({ selectedValue: e.target.value })
    };
    handleRate = (rates) => {
        this.setState({ tempRate: rates })
    }
    handleSubmit = evt => {
        evt.preventDefault();

        this.setState({ loading: true })
        const charter = this.state.tempCharter;
        const rating = {
            ShipOwnerId: charter.shipUserId,
            Score: this.state.selectedValue
        }

        if (rating.ShipOwnerId != null && rating.Score != null) {
            console.log(rating)
            const config = {
                headers: { Authorization: `Bearer ${this.state.token}` }
            };

            axios.post(`https://localhost:44321/api/Ratings`, rating, config)
                .then(res => {
                    this.setState({ loading: false, isSent: true });
                    console.log(res);
                    console.log(res.data);

                    this.closeForm();

                })
                .catch(httpError => this.setState({ error: httpError.response.data }));
        }
        else
            this.setState({ isSent: false })

    }

    render() {
        return (
            <div>
                <UserConsumer>{(token, Userid) => { this.state.token = token }
                }</UserConsumer>
                <CargoOwnerChartersList
                    charters={this.state.charters}
                    editCharter={this.editCharter}
                    currentDate={this.state.currentDate}
                />
                <RatetheCharterForm
                    charter={this.state.tempCharter}
                    closeForm={this.closeForm}
                    handleChange={this.handleChange}
                    loading={this.state.loading}
                    handleSubmit={this.handleSubmit}
                    handleRate={this.handleRate}
                    rates={rates}
                    selectedValue={this.state.selectedValue}
                />
            </div>
        )
    }
}

export default CargoOwnerCharters