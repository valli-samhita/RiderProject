import React from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import Home from "./Home";


const Router=(props)=>{
    return(
        <NavigationContainer>
            <Home/>
            
        </NavigationContainer>
        
        
    
    );

};
export default Router;