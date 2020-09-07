import React from 'react';



function ShipForm(props){

  const { ship, closeForm , onShipChange, saveShip, deleteShip, loading} = props;

    return(    
      
        
    <div className={"modal " + (!!ship && " is-active")}>
      <div className="modal-background" onClick={closeForm}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Vessel Position</p>
          <button className="delete" aria-label="close" onClick={closeForm}></button>
        </header>
        <section className="modal-card-body">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="label">DWCC</label>
            <div className="control">
              {!!ship && 
              <input className="input" type="number" className="form-control" placeholder="DWCC" value={ship.dwcc} onChange={(evt)=>onShipChange("dwcc", evt.target.value)} />
            }
              </div>
          </div>
          <div className="form-group col-md-6">
            <label className="label">Type</label>
            <div className="control ">
            {!!ship && 
              <input className="input" type="text" className="form-control" placeholder="Type" value={ship.type} onChange={(evt)=>onShipChange("type", evt.target.value)} />
            }
              </div>
          </div>
          </div>
          <div className="form-row">
          <div className="form-group col-md-6">
            <label className="label">Location</label>
            <div className="control ">
            {!!ship && 
              <input className="input" type="text" className="form-control" placeholder="Location" value={ship.location} onChange={(evt)=>onShipChange("location", evt.target.value)}/>           
              }  </div>
          </div>
          
          <div className="form-group col-md-6">
            <label className="label">Date</label>
            <div className="control ">
            {!!ship && 
              <input className="input" type="datetime-local" className="form-control" placeholder="Date" value={ship.date} onChange={(evt)=>onShipChange("date",evt.target.value)}/>
            
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
                value={ship.flag} onChange={(evt)=>onShipChange("flag", evt.target.value)}
              />
            }
            </div>
          </div>
          <div className="form-group col-md-6">
            <label className="label">Year</label>
            <div className="control ">
            {!!ship && 
              <input className="input" type="number" className="form-control" placeholder="Year" value={ship.year} onChange={(evt)=>onShipChange("year",evt.target.value)}/>
            
              }  </div>
          </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={saveShip} disabled={loading}>Save changes</button>
          <button className="button" onClick={closeForm} disabled={loading}>Cancel</button>
          <button className="button is-danger is-pulled-right" onClick={deleteShip} disabled={loading}>Delete</button>
        </footer>
      </div>
    </div>
    
   
    );
          }


export default ShipForm;