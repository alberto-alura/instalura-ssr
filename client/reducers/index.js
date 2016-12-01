import listaFotos from './listaFotos';
import notificacao from './notificacao';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    listaFotos,
    notificacao
});

export default rootReducer 