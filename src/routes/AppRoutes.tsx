import { Routes, Route } from "react-router-dom";
import Enterprise from "../pages/Enterprise/Enterprise"
import LeadProfile from "../pages/LeadProfile/LeadProfile"
import LeadRegistration from "../pages/LeadRegistration/LeadRegistration"
import PropertyRegistration from "../pages/PropertyRegistration/PropertyRegistration"
import App from "../App";



export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<App/>}/>
             <Route path="/Enterprise" element={<Enterprise/>}/>
              <Route path="/LeadProfile" element={<LeadProfile/>}/>
               <Route path="/LeadRegistration" element={<LeadRegistration/>}/>
                <Route path="/PropertyRegistration" element={<PropertyRegistration/>}/>
        </Routes>
    )
}