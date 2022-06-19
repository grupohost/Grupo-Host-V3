import { useState, useContext } from 'react';
import { SetupContext } from '../utils/generals';

export const useConfig = () =>{
    let local = JSON.parse(localStorage.getItem('config'));
    
    const [ config, setInternalConfig ] = useState(local);
    const { setLoadingMain, setMain } = useContext(SetupContext);

    const setConfig = ( newobject ) => {
        setLoadingMain(true);
        localStorage.removeItem('main');
        setMain(null);
        localStorage.setItem('config', JSON.stringify({ ...config, ...newobject}));
        setInternalConfig( { ...config, ...newobject} );
    }

    if(config === null){
        setConfig({
            lang: 1,
            currency: 3,
            country: 11,
        })
    }

    return [config, setConfig];
}