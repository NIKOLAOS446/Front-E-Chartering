import React from 'react'

function SearchShipForm(props) {
    
    const { ship, closeForm, loading, cargoes, selectedCargo, handleChange, user,handleSubmit,handleFreightChange,error } = props;



    return (


        <div className={"modal " + (!!ship && " is-active")}>
            <div className="modal-background" onClick={closeForm}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Charter Party</p>
                    <button className="delete" aria-label="close" onClick={closeForm}></button>
                </header>
                <section className="modal-card-body">
                    <p>Ship Details</p>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="label">DWCC</label>
                            <div className="control">
                                {!!ship &&
                                    <input className="input" type="number" className="form-control" placeholder="DWCC" value={ship.dwcc} readOnly />
                                }
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="label">Type</label>
                            <div className="control ">
                                {!!ship &&
                                    <input className="input" type="text" className="form-control" placeholder="Type" value={ship.type} readOnly/>
                                }
                            </div>
                        </div>


                        <div className="form-group col-md-6">
                            <label className="label">Location</label>
                            <div className="control ">
                                {!!ship &&
                                    <input className="input" type="text" className="form-control" placeholder="Location" value={ship.location} readOnly/>
                                }  </div>
                        </div>

                        <div className="form-group col-md-6">
                            <label className="label">Date</label>
                            <div className="control ">
                                {!!ship &&
                                    <input className="input" type="datetime-local" className="form-control" placeholder="Date" value={ship.date} readOnly />

                                }  </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="label">Flag</label>
                            <div className="control ">
                                {!!ship &&
                                    <input
                                        className="input"
                                        type="text"
                                        className="form-control"
                                        placeholder="Flag"
                                        value={ship.flag}
                                        readOnly
                                    />
                                }
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="label">Year</label>
                            <div className="control ">
                                {!!ship &&
                                    <input className="input" type="number" className="form-control" placeholder="Year" value={ship.year} readOnly/>

                                }  </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="label">ShipOwner</label>
                            <div className="control ">
                                {!!ship &&
                                    <input className="input" type="text" className="form-control" placeholder="ShipOwner" value={ship.applicationUser.email} readOnly/>

                                }  </div>
                        </div>
                    </div>
                    <p>Cargo Details</p>
                    <div className="form-row">                    
                    <div className="form-group col-md-6">
                        <label className="label">Charterer</label>
                        <div className="control ">
                            {!!cargoes &&
                                <input className="input" type="text" className="form-control" placeholder="Charterer" value={user.email} readOnly/>

                            }  </div>
                    </div>
                    <div className="form-group col-md-6">
                    <label className="label">Cargoes</label>
                        <div className="select ">
                            <select                                                     
                            value={selectedCargo}            
                            onChange={evt =>
                                handleFreightChange("selectedCargo", evt.target.value)}>
                                    <option disabled value={1}>Choose a Cargo</option>
                        {cargoes.map(cargo=><option  key={cargo.id} value={cargo.id}  >{cargo.cargoType},{cargo.id} </option>)} 
                            </select>
                        </div>
                    </div>
                    </div>
                    <p>Freight Details</p>
                    <div className="form-row">
                    <div className="form-group col-md-6">
                    <label className="label">Fixed Freight($)</label>
                    <div className="control ">
                            {!!cargoes &&
                                <input className="input" type="number"  className="form-control" placeholder="Fixed Freight" onChange={evt =>
                                    handleFreightChange("freight", evt.target.value)
                                     } />

                            }  </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="label">Commission</label>
                        <div className="control ">
                            {!!cargoes &&
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


export default SearchShipForm;