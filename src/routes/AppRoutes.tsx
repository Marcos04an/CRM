import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard"
import Enterprise from "../pages/Enterprise/Enterprise"
import LeadProfile from "../pages/LeadProfile/LeadProfile"
import LeadRegistration from "../pages/LeadRegistration/LeadRegistration"
import PropertyRegistration from "../pages/PropertyRegistration/PropertyRegistration"



export default function AppRoutes(){
    return(
        <Routes>
            
            <Route path="/" element={<Dashboard/>}/>
             <Route path="/" element={<Enterprise/>}/>
              <Route path="/" element={<LeadProfile/>}/>
               <Route path="/" element={<LeadRegistration/>}/>
                <Route path="/" element={<PropertyRegistration/>}/>
        </Routes>
    )
}