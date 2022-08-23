import React, { useState } from "react"
import Router from "./Router"
import  { useEffect } from 'react'
import { ToastContainer, } from "react-toastify"
import "./components/@vuexy/rippleButton/RippleButton"


import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"

import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/plugins/extensions/toastr.scss'

import ReactGA from 'react-ga'
const App = props => {

  const [theme, setTheme] = useState(false)
  
  useEffect(()=>{
    const varia = window.location.pathname.split('/').pop();
    if(varia === 'tvapp'){
      console.log('tv')
      setTheme(true)
      // document.body.style.backgroundColor = 'red !important'
    }else{
      setTheme(false)
    }
  },[])

  // useEffect(() => {
  //   ReactGA.initialize('UA-199921078-1')
  //   ReactGA.pageview(window.location.pathname + window.location.search);

  // })
 
  return (
  <div className={theme?"dark":"light"}>
      <Router />
      <ToastContainer />  
  </div>
    )
}

export default App
