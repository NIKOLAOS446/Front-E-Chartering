import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter,
  Redirect
} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import MainContainer from './App/MainContainer';
import Navbar from './Auth/Navbar';
import ResetPassword from './Auth/ResetPassword';
import NavigationBar from './App/Navigation/NavigationBar';
import SideBar from './App/Navigation/SideBar';
import {UserProvider} from './UserContext';
import Home from './App/home';



const ProtectedRoute =({isAllowed, RedirectTo, ...props})=>
      isAllowed
      ?<Route {...props}/>
      :<Redirect to ={RedirectTo}/>

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isRegistered: false,
      isAuthenticated:false,
      token:null,
      isShipowner:false,
      isCharterer: false,
      isAdmin: false,
      role:null
    }
  }
  setIsAuthenticated = (token, rememberMe) => {
    this.setState({token: token, isAuthenticated: true})
       
  }
  componentDidMount(){
    const role = localStorage.getItem("role");
    this.setRole(role);
  }

  setRole=(role)=>{
    this.setState({role:role});
    localStorage.setItem('role',role)
    switch(role){

      case role='ShipOwner':
        this.setState({
          isCharterer:false,
          isShipowner:true, 
          isAdmin:false         
        })          
        break;

      case role='Charterer':
        this.setState({
          isCharterer:true,
          isShipowner:false,
          isAdmin:false          
        })          
        break;
      case role='Admin': 
      this.setState({
        isCharterer:false,
        isShipowner:false,
        isAdmin: true          
      })          
      break;
    }

  }
 

  signout =() => {
    this.setState({token: null, isAuthenticated: false})
      localStorage.setItem('token',"");
  }
   
  render(){
    return ( 
      
       <Router> 
         <Redirect exact from="/" to="/Register" />       
        <Switch>
       <ProtectedRoute isAllowed={!this.state.isRegistered}  path="/Register" RedirectTo="/Login">
        <Navbar isRegistered={this.isRegistered}/>
          <Register isRegistered={this.isRegistered}  />
          </ProtectedRoute>                       
        <ProtectedRoute isAllowed={!this.state.isAuthenticated} path="/Login" RedirectTo="/">
        <Navbar/>
          <Login setIsAuthenticated={this.setIsAuthenticated}  setRole ={this.setRole}/>
          </ProtectedRoute>
          <ProtectedRoute isAllowed={!this.state.isRegistered} path="/Forgot" RedirectTo="/Login">
        <Navbar/>
         <ResetPassword/>
          </ProtectedRoute>        
        <ProtectedRoute isAllowed={this.state.isAuthenticated} path="/" RedirectTo="/Login" >
        <UserProvider value={this.state.token} >
        
          <HashRouter>   
          
         
     
          <MainContainer signout={this.signout} role={this.state.role} isShipowner={this.state.isShipowner} isCharterer={this.state.isCharterer} isAdmin={this.state.isAdmin}>
          <home/>
           
          </MainContainer>
          
          </HashRouter>
          </UserProvider>
         
          </ProtectedRoute>        
        </Switch>  
         
    </Router>   
    
    );
  }
}

export default App;
