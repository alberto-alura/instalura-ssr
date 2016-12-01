//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from "electrode-redux-router-engine";
import {routes} from "../../client/routes";
import { createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from "../../client/reducers";
import TimelineApi from "../../client/api/TimelineApi";
import authToken from '../../client/helpers/authToken';

function createReduxStore(req, match) { // eslint-disable-line    
    const initialState = {
        listaFotos: [],
        notificacao: ""
    };

    const store = createStore(rootReducer, initialState,applyMiddleware(thunkMiddleware));

    if(match.renderProps.params.login){
        const funcaoCarregaTimelinePublica = TimelineApi.lista(`http://localhost:8080/api/public/fotos/'${match.renderProps.params.login}`);          
        return store.dispatch(funcaoCarregaTimelinePublica).then(() => store);            
    } else {            
        const funcaoCarregaTimelineLogado = TimelineApi.lista(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${authToken(req)}`);    
        return store.dispatch(funcaoCarregaTimelineLogado).then(() => store);               
    }               
}

//
// This function is exported as the content for the webapp plugin.
//
// See config/default.json under plugins.webapp on specifying the content.
//
// When the Web server hits the routes handler installed by the webapp plugin, it
// will call this function to retrieve the content for SSR if it's enabled.
//
//

module.exports = (req) => {
    const app = req.server && req.server.app || req.app;    
    if (!app.routesEngine) {      
      app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
    }    
    return app.routesEngine.render(req);
};
