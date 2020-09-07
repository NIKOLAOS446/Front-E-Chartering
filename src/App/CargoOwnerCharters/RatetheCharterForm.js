import React from 'react'


function RatetheCharterForm(props) {

    const { charter, closeForm, loading, selectedValue, handleChange, handleSubmit ,rates} = props;
    


    return (


        <div className={"modal " + (!!charter && " is-active")}>
            <div className="modal-background" onClick={closeForm}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Ratings</p>
                    <button className="delete" aria-label="close" onClick={closeForm}></button>
                </header>
                <section className="modal-card-body">
                    <p>Charter Details</p>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="label">Ship</label>
                            <div className="control">
                                {!!charter &&
                                    <input className="input" type="text" className="form-control" placeholder="Ship" value={charter.ship.type} readOnly/>
                                }
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="label">Cargo </label>
                            <div className="control ">
                                {!!charter &&
                                    <input className="input" type="text" className="form-control" placeholder="Cargo Type" value={charter.cargo.cargoType} readOnly/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="label">Departure Port</label>
                            <div className="control ">
                                {!!charter &&
                                    <input className="input" type="text" className="form-control" placeholder="Departure Port" value={charter.cargo.departurePort} readOnly/>
                                }  </div>
                        </div>

                        <div className="form-group col-md-6">
                            <label className="label">Destination Port</label>
                            <div className="control ">
                                {!!charter &&
                                    <input className="input" type="text" className="form-control" placeholder="Destination Port" value={charter.cargo.destinationPort} readOnly />

                                }  </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="label">Date From </label>
                            <div className="control ">
                                {!!charter &&
                                    <input className="input" type="datetime-local" className="form-control" placeholder="Date From" value={charter.cargo.dateFrom} readOnly/>

                                }  </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="label">Date To </label>
                            <div className="control ">
                                {!!charter &&
                                    <input className="input" type="datetime-local" className="form-control" placeholder="Date To" value={charter.cargo.dateTo} readOnly/>

                                }  </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="label">FixedFreight</label>
                            <div className="control ">
                                {!!charter &&
                                    <input className="input" type="number" className="form-control" placeholder="Freight Idea " value={charter.fixedFreight} readOnly/>

                                }  </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="label">ShipOwner</label>
                            <div className="control ">
                                {!!charter &&
                                    <input className="input" type="text" className="form-control" placeholder="ShipOwner" value={charter.shipUser.email} readOnly />

                                }  </div>
                        </div>

                        <div className="form-group col-md-6">
                            <label className="label">FeedBack</label>
                            <div className="select ">
                                <select
                                    value={selectedValue}
                                    onChange={evt =>
                                        handleChange("selectedValue", evt.target.value)}>

                                    <option disabled key={6}value={6}  >Rate The ShipOwner</option>
                                    {rates.map((rate,i) => <option key={i} value={rate.score}>{rate.description}</option>)}

                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={handleSubmit}>Confirm</button>
                    <button className="button" onClick={closeForm} >Cancel</button>
                </footer>
            </div>
        </div>


    );
}


export default RatetheCharterForm;