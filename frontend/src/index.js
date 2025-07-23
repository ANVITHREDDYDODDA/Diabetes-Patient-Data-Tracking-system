import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/index.css";
import App from "./App";
import Home from "./layouts/Home";
import SignIn from "./layouts/Signin";
import Register from "./layouts/Register";
import PrivateRoute from "./helpers/PrivateRoute";
import AdminRoute from "./helpers/AdminRoute";
import DoctorLogin from "./layouts/DoctorLogin";
import LabLogin from "./layouts/LabLogin";
import Tests from "./layouts/Tests";
import TestInfo from "./layouts/TestInfo";
import Confirm from "./layouts/Confirm";
import Details from "./layouts/Details";
import Appointment from "./layouts/Appointment";
import MyAppointments from "./layouts/MyAppointment";
import EditProfile from "./layouts/EditProfile";
import AdminLogin from "./layouts/AdminLogin";
import Doctors from "./layouts/admin/Doctors";
import Labs from "./layouts/admin/Labs";
import AddDoctor from "./layouts/admin/AddDoctor";
import EditDoctor from "./layouts/admin/EditDoctor";
import AddLab from "./layouts/admin/AddLab";
import EditLab from "./layouts/admin/EditLab";
import TestList from "./layouts/admin/TestList";
import AddTest from "./layouts/admin/AddTest";
import EditTest from "./layouts/admin/EditTest";
import Appointments from "./layouts/admin/Appoinments";
import ReadyAppointments from "./layouts/admin/ReadyAppointments";
import Profile from "./layouts/admin/Profile";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route path="/doctor" element={<DoctorLogin />} />
      <Route path="/lab" element={<LabLogin />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/test/:id" element={<TestInfo />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/details" element={<Details />} />
        <Route path="/appointment/:id" element={<Appointment />} />
        <Route path="/myappointments" element={<MyAppointments />} />
        <Route path="/myprofile" element={<EditProfile />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/doctors" element={<Doctors />} />
        <Route path="/admin/labs" element={<Labs />} />
        <Route path="/admin/doctor/add" element={<AddDoctor />} />
        <Route path="/admin/lab/add" element={<AddLab />} />
        <Route path="/admin/doctor/:id" element={<EditDoctor />} />
        <Route path="/admin/lab/:id" element={<EditLab />} />
        <Route path="/admin/tests" element={<TestList />} />
        <Route path="/admin/test/add" element={<AddTest />} />
        <Route path="/admin/test/:id" element={<EditTest />} />
        <Route path="/admin/appointments" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/admin/readyappointments"
          element={<ReadyAppointments />}
        />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
