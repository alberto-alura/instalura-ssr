import React from "react";
import {Route, IndexRoute} from "react-router";
import Home from "./components/Home";
import Login from './components/Login';

const verificaAutenticacao = (nextState, replace) => {				
	if(localStorage.getItem("auth-token")==='undefined'){		
		replace('/?msg=precisa fazer o login');
	}	
}

export const routes = (
  <Route path="/">
	  <IndexRoute component={Login}/>
	  <Route path="/timeline(/:login)" component={Home} onEnter={verificaAutenticacao}/>  
  </Route>
);
