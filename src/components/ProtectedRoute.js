import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {Outlet} from "react-router";


const ProtectedRoute = ({children}) => { 
    if(children.type.name=="AdministratorDashboard")
    {
      return localStorage.getItem("adminToken")=="true" ? children : <Navigate to="/login"/>;
    }
    else if(children.type.name=="StudentDashboard")
    {
      return localStorage.getItem("studentToken")=="true" ? children : <Navigate to="/login"/>;
    }
    else if(children.type.name=="InstructorDashboard")
    {
      return localStorage.getItem("instructorToken")=="true" ? children : <Navigate to="/login"/>;
    }
    else if(children.type.name=="ProgramCoordinatorDashboard")
    {
      return localStorage.getItem("pcToken")=="true" ? children : <Navigate to="/login"/>;
    }
    else
    {
      return localStorage.getItem("qaoToken")=="true" ? children : <Navigate to="/login"/>;
    }
};

export default ProtectedRoute;