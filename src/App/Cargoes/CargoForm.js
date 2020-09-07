import React from 'react'


function CargoForm(props){
    const { cargo, closeForm , onCargoChange, saveCargo, deleteCargo, loading} = props;
    

    return (
        <div className={"modal " + (!!cargo && " is-active")}>
      <div className="modal-background" onClick={closeForm}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Cargo Position</p>
          <button className="delete" aria-label="close" onClick={closeForm}></button>
        </header>
        <section className="modal-card-body">
        <div class="form-row">
          <div className="form-group col-md-6">
            <label className="label">Quantity(TN)</label>
            <div className="control">
              {!!cargo && 
              <input className="input" type="number" class="form-control" placeholder="Quantity" value={cargo.quantity} onChange={(evt)=>onCargoChange("quantity", evt.target.value)} />
            }
              </div>
          </div>
          <div className="form-group col-md-6">
            <label className="label">Cargo Type</label>
            <div className="control ">
            {!!cargo && 
              <input className="input" type="text" class="form-control" placeholder="Cargo Type" value={cargo.cargoType} onChange={(evt)=>onCargoChange("cargoType", evt.target.value)} />
            }
              </div>
          </div>
          </div>
          <div class="form-row">
          <div className="form-group col-md-6">
            <label className="label">Departure Port</label>
            <div className="control ">
            {!!cargo && 
              <input className="input" type="text" class="form-control" placeholder="Departure Port" value={cargo.departurePort} onChange={(evt)=>onCargoChange("departurePort", evt.target.value)}/>           
              }  </div>
          </div>
          
          <div className="form-group col-md-6">
            <label className="label">Destination Port</label>
            <div className="control ">
            {!!cargo && 
              <input className="input" type="text" class="form-control" placeholder="Destination Port" value={cargo.destinationPort} onChange={(evt)=>onCargoChange("destinationPort",evt.target.value)}/>
            
              }  </div>
          </div>
          </div>
          <div class="form-row">
          <div className="form-group col-md-6">
            <label className="label">Discharging Rate(TNS/DAY)</label>
            <div className="control ">
            {!!cargo && 
              <input
                className="input"
                type="number"
                class="form-control"
                placeholder="Discharging Rate"
                value={cargo.dischargingRate} onChange={(evt)=>onCargoChange("dischargingRate", evt.target.value)}
              />
            }
            </div>
          </div>
          <div className="form-group col-md-6">
            <label className="label">Loading Rate(TNS/DAY)</label>
            <div className="control ">
            {!!cargo && 
              <input className="input" type="number" class="form-control" placeholder="Loading Rate" value={cargo.loadingRate} onChange={(evt)=>onCargoChange("loadingRate",evt.target.value)}/>
            
              }  </div>
          </div>
          </div>
          <div class="form-row">
          <div className="form-group col-md-6">
            <label className="label">Date From </label>
            <div className="control ">
            {!!cargo && 
              <input className="input" type="datetime-local" class="form-control" placeholder="Date From" value={cargo.dateFrom} onChange={(evt)=>onCargoChange("dateFrom",evt.target.value)}/>
            
              }  </div>
          </div>
          <div className="form-group col-md-6">
            <label className="label">Date To </label>
            <div className="control ">
            {!!cargo && 
              <input className="input" type="datetime-local" class="form-control" placeholder="Date To" value={cargo.dateTo} onChange={(evt)=>onCargoChange("dateTo",evt.target.value)}/>
            
              }  </div>
          </div>
          <div className="form-group col-md-6">
            <label className="label">Freight Idea ($/TN) </label>
            <div className="control ">
            {!!cargo && 
              <input className="input" type="number" className="form-control" placeholder="Freight Idea " value={cargo.freightIdea} onChange={(evt)=>onCargoChange("freightIdea",evt.target.value)}/>
            
              }  </div>
          </div>
          </div>
         
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={saveCargo} disabled={loading}>Save changes</button>
          <button className="button" onClick={closeForm} disabled={loading}>Cancel</button>
          <button className="button is-danger is-pulled-right" onClick={deleteCargo} disabled={loading}>Delete</button>
        </footer>
      </div>
    </div>
    )
}

export default CargoForm;