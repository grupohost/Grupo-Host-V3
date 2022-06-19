import { SetupContext, Loader, Cart } from './utils/generals';
import { Layout } from './pages/Layout';
import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes } from "react-router-dom";
import { routesItems } from './utils/routes';
import { useLocalObservable, Observer } from "mobx-react"

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';


const globalValues = {
  domainBackEnd: document.location.protocol + '//127.0.0.1:8000/api/',
  domainBackEndFile: document.location.protocol + '//127.0.0.1:8000/',
  domainFiles: document.location.protocol + '//grupo.host/'
}


function App() {
    const [loadingMain, setLoadingMain] = useState(true);
    const [ main, setMain ] = useState( JSON.parse(localStorage.getItem('main')) );
    const [loadLang, setLoadLang ] = useState(true);
    const [ global, ] = useState(globalValues);
    
    let getlocalConfig = localStorage.getItem('config');
    let getlocalTranslation = JSON.parse(localStorage.getItem('translations'));

    let cartItem = new Cart();
    const cartVal = useLocalObservable(() => cartItem);

    const getTranslation = () => {
      let url = globalValues.domainBackEndFile + 'translations/'+ getlocalConfig.lang +'_translations.json';
      fetch( url )
      .then(response => response.text())
      .then(re => {
        localStorage.setItem('translations', re);
        setLoadLang(false);
      });
    }

    if(getlocalConfig === null){
        getlocalConfig = {
          lang: 1,
          currency: 3,
          country: 11,
        };
    }else{
      getlocalConfig = JSON.parse(getlocalConfig);
      
    }

    if(getlocalTranslation === null ){
      getTranslation();
    }else if (getlocalTranslation !== null && loadLang === true){
      setLoadLang(false);
    }

    return (
      <>
      {!loadLang ?
        <SetupContext.Provider value={
          { 
            global,
            loading: loadingMain,
            setLoadingMain,
            config : getlocalConfig,
            main,
            setMain,
            cartVal
          }
        }>
            <Layout >
              <BrowserRouter>
                  <Routes>
                    { routesItems.map( (route) => route) }
                  </Routes>
                </BrowserRouter>
            </Layout>
      </SetupContext.Provider>
      :
      <Loader/>
    }
    </>
    );
}

export default App;
