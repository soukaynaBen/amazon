import React, { useEffect, useState } from 'react'
import {  initializeBasket, selectItems } from '../features/basketSlice';
import { useDispatch, useSelector } from 'react-redux';
function AppWrapper({children}) {
    const dispatch=useDispatch();
    const items= useSelector(selectItems);
    let [initialstate,setInitialState]=useState(true)   ;
    useEffect(() => {
        console.log("1",items);
        if (window.localStorage!== undefined && JSON.parse(window.localStorage.getItem("items"))) { 
        //checking if there already is a state in localstorage
        //if yes, update the current state with the stored one
        setInitialState(false)
        dispatch( initializeBasket(JSON.parse(window.localStorage.getItem("items"))) );
    }
}, []);
useEffect(() => {
    console.log("2",items.length);
    console.log(initialstate)
    if (window.localStorage !== undefined && 
        ((initialstate===false && items.length === 0 ) || items.length !==0 )
        ) {
                window.localStorage.setItem("items", JSON.stringify(items)); 
      
         //create and/or set a new localstorage variable called "state"
      }
   }, [items]);
  return (
    <>
     {children}
    </>
  )
}

export default AppWrapper