import React from 'react'


function SearchCargoesForm(props) {

    const { cargo, closeForm, loading, ships, selectedShip, handleChange, user, handleSubmit, handleFreightChange, error } = props;



    return (


        <div className={"modal " + (!!cargo && " is-active")}>
            <div className="modal-background" onClick={closeForm}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Charter Party</p>
                    <button className="delete" aria-label="close" onClick={closeForm}></button>
                </header>
                <section className="modal-card-body">
                    <p>Cargo Details</p>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="label">Quantity(TN)</label>
                            <div className="control">
                                {!!cargo &&
                                    <input className="input" type="number" className="form-control" placeholder="Quantity" value={cargo.quantity} readOnly />
                                }
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="label">Cargo Type</label>
                            <div className="control ">
                                {!!cargo &&
                                    <input className="input" type="text" className="form-control" placeholder="Cargo Type" value={cargo.cargoType} readOnly/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="label">Departure Port</label>
                            <div className="control ">
                                {!!cargo &&
                                    <input className="input" type="text" className="form-control" placeholder="Departure Port" value={cargo.departurePort} readOnly />
                                }  </div>
                        </div>

                        <div className="form-group col-md-6">
                            <label className="label">Destination Port</label>
                            <div className="control ">
                                {!!cargo &&
                                    <input className="input" type="text" className="form-control" placeholder="Destination Port" value={cargo.destinationPort} readOnly/>

                                }  </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="label">Discharging Rate(TNS/DAY)</label>
                            <div className="control ">
                                {!!cargo &&
                                    <input
                                        className="input"
                                        type="number"
                                        className="form-control"
                                        placeholder="Discharging Rate"
                                        value={cargo.dischargingRate}
                                        readOnly
                                    />
                                }
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="label">Loading Rate(TNS/DAY)</label>
                            <div className="control ">
                                {!!cargo &&
                                    <input className="input" type="number" className="form-control" placeholder="Loading Rate" value={cargo.loadingRate} readOnly />

                                }  </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="label">Date From </label>
                            <div className="control ">
                                {!!cargo &&
                                    <input className="input" type="datetime-local" className="form-control" placeholder="Date From" value={cargo.dateFrom} readOnly/>

                                }  </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="label">Date To </label>
                            <div className="control ">
                                {!!cargo &&
                                    <input className="input" type="datetime-local" className="form-control" placeholder="Date To" value={cargo.dateTo} readOnly/>

                                }  </div>
                        </div>
                        </div>
                        <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="label">Freight Idea ($/TN) </label>
                            <div className="control ">
                                {!!cargo &&
                                    <input className="input" type="number" className="form-control" placeholder="Freight Idea " value={cargo.freightIdea} readOnly/>

                                }  </div>
                        </div>
                    
                    <div className="form-group col-md-6">
                        <label className="label">Charterer</label>
                        <div className="control ">
                            {!!cargo &&
                                <input className="input" type="text" className="form-control" placeholder="Charterer" value={cargo.applicationUser.email} readOnly />

                            }  </div>
                    </div>
                    </div>
                    <p>Ship Details</p>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="label">ShipOwner</label>
                            <div className="control ">
                                {!!ships &&
                                    <input className="input" type="text" className="form-control" placeholder="ShipOwner" value={user.email} readOnly/>

                                }  </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="label">Ships</label>
                            <div className="select ">
                                <select                    
                                    value={selectedShip}
                                    onChange={evt =>
                                        handleFreightChange("selectedShip", evt.target.value)}>
                                    <option disabled value={1}>Choose a Ship</option>
                                    {ships.map(ship => <option key={ship.id} value={ship.id}  >{ship.type},{ship.id} </option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <p>Freight Details</p>
                    <div className="form-row">
                    <div className="form-group col-md-6">
                        <label className="label">Fixed Freight($)</label>
                        <div className="control ">
                            {!!ships &&
                                <input className="input" type="number" className="form-control" placeholder="Fixed Freight" onChange={evt =>
                                    handleFreightChange("freight", evt.target.value)
                                } />

                            }  </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="label">Commission</label>
                        <div className="control ">
                            {!!ships &&
                                <input className="input" type="number" className="form-control" placeholder="Commission" onChange={evt =>
                                    handleFreightChange("commission", evt.target.value)
                                } />

                            }  </div>
                    </div>
                    </div>
                    <div className="field">
                        {error && (
                            <article className="message is-danger">
                                <div className="message-body">{error}</div>
                            </article>
                        )}
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={handleSubmit} >Confirm</button>
                    <button className="button" onClick={closeForm} >Cancel</button>
                </footer>
            </div>
        </div>


    );
}


export default SearchCargoesForm;