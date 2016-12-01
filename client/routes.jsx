import React from "react";
import {Route, IndexRoute} from "react-router";
import Home from "./components/Home";
import Login from './components/Login';
import Logout from './components/Logout';

const verificaAutenticacao = (nextState, replace) => {				
	if(localStorage.getItem("auth-token")===null){		
		replace('/?msg=precisa fazer o login');
	}	
}

export const routes = (
  <Route path="/">
	  <IndexRoute component={Login}/>
		<Route path="/logout" component={Logout}/>	    	    	
	  <Route path="/timeline(/:login)" component={Home} onEnter={verificaAutenticacao}/>  
  </Route>
);
