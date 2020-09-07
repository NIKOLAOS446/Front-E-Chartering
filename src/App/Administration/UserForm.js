import React from 'react'


function UserForm(props){
    const { user, closeForm , onUserChange, loading, saveUser, deleteUser} = props;


    return (
        <div className={"modal " + (!!user && " is-active")}>
      <div className="modal-background" onClick={closeForm}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">User</p>
          <button className="delete" aria-label="close" onClick={closeForm}></button>
        </header>
        <section className="modal-card-body">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="label">Username</label>
            <div className="control">
              {!!user && 
              <input className="input" type="text" className="form-control" placeholder="Username" value={user.userName} onChange={(evt)=>onUserChange("userName", evt.target.value)} />
            }
              </div>
          </div>
          <div className="form-group col-md-6">
            <label className="label">Email</label>
            <div className="control">
              {!!user && 
              <input className="input" type="email"  className="form-control" placeholder="Email" value={user.email} onChange={(evt)=>onUserChange("email", evt.target.value)} />
            }
              </div>
          </div>
          <div className="form-group col-md-6">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password"  onChange={(evt)=>onUserChange("password", evt.target.value)} />
      </div>
     { user && <div className="form-group">
                            <label>Role</label>
                            <select className="custom-select" id="validationDefault04" value={user.role} required onChange={(evt)=>onUserChange("Role", evt.target.value)}>
                                <option  disabled value="6" selected>Choose...</option>
                                <option value="Shipowner">Shipowner</option>
                                <option value="Charterer">Charterer</option>
                            </select>
                        </div>}
          <div className="form-group col-md-6">
            <label className="label">Phone</label>
            <div className="control">
              {!!user && 
              <input className="input"  type="phone" id="phone" className="form-control" placeholder="Phone" value={user.phoneNumber} onChange={(evt)=>onUserChange("phoneNumber", evt.target.value)} />
            }
              </div>
          </div>
         
         </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={saveUser}>Save changes</button>
          <button className="button" onClick={closeForm} >Cancel</button>
          <button className="button is-danger is-pulled-right" onClick={deleteUser}>Delete</button>
        </footer>
      </div>
    </div>
    )
}

export default UserForm;