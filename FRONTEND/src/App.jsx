import React from "react";
import Home from "./pages/Home";
import LoginClient from "./pages/LoginClient";
import Signup from "./pages/Signup";
import Client_Signup from "./pages/client/Client_Signup";
import Categories from "./pages/client/Categories";
import Addtional from "./pages/client/Additional";
import Appointments from "./pages/client/Appointments";
import Messages from "./pages/client/Messages";
import Profile from "./pages/client/Profile";
import Lawyer_Check from "./pages/client/Lawyer_Check";
import BookAppointment from "./pages/client/BookAppointment";
import PaymentPage from "./pages/client/PaymentPage";
import Payment_done_undone from "./pages/client/Payment_done_undone";
import Reviews from "./pages/client/Reviews";
import { Routes, Route } from "react-router-dom";
import LawyerProfileUpdate1 from "./pages/lawyer/LawyerProfileUpdate/LawyerProfileUpdate1";
import LawyerProfileUpdate2 from "./pages/lawyer/LawyerProfileUpdate/LawyerProfileUpdate2";
import LawyerProfile from "./pages/lawyer/LawyerProfile";
import LawyerMessages from "./pages/lawyer/LawyerMessages";
import LawyerEarnings from "./pages/lawyer/LawyerEarnings";
import Law from "./pages/lawyer/Law";
import LawyersDashboard from "./pages/lawyer/LawyersDashboard";
import LawyerAppointmentsActive from "./pages/lawyer/LawyerAppointments/LawyerAppointmentsActive";
import LawyerAppointmentsRequest from "./pages/lawyer/LawyerAppointments/LawyerAppointmentsRequest";
import LawyerAppointmentsCompleted from "./pages/lawyer/LawyerAppointments/LawyerAppointmentsCompleted";
import AppointmentsCompleted from "./pages/client/AppointmentsCompleted";
import AppointmentsActive from "./pages/client/Appointments";
import Contact from "./pages/client/Contact";
import LoginAs from "./pages/LoginAs";
import LoginLawyer from "./pages/LoginLawyer";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/loginClient"
          element={<LoginClient></LoginClient>}
        ></Route>
        <Route path="/loginAs" element={<LoginAs></LoginAs>}></Route>
        <Route
          path="/loginLawyer"
          element={<LoginLawyer></LoginLawyer>}
        ></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route
          path="/client_signup"
          element={<Client_Signup></Client_Signup>}
        ></Route>
        <Route
          path="/additional_client"
          element={<Addtional></Addtional>}
        ></Route>
        <Route path="/categories" element={<Categories></Categories>}></Route>
        <Route path="/messages" element={<Messages></Messages>}></Route>
        <Route
          path="/appointments"
          element={<Appointments></Appointments>}
        ></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route
          path="/lawyer_check"
          element={<Lawyer_Check></Lawyer_Check>}
        ></Route>
        <Route path="/book-appointment" element={<BookAppointment />}></Route>

        {/* Remove old appointment routes */}
        {/* <Route path="/appointments/active" element={<AppointmentsActive />} />
        <Route
          path="/appointments/completed"
          element={<AppointmentsCompleted />}
        /> */}

        <Route path="/payment" element={<PaymentPage />}></Route>
        <Route
          path="/payment_done_undone"
          element={<Payment_done_undone></Payment_done_undone>}
        ></Route>
        <Route path="/reviews" element={<Reviews></Reviews>}></Route>

        <Route
          path="/lawyerprofileUpdate1"
          element={<LawyerProfileUpdate1 />}
        />
        <Route
          path="/lawyerprofileupdate2"
          element={<LawyerProfileUpdate2 />}
        />
        <Route path="/lawyerprofile" element={<LawyerProfile />} />
        <Route path="/lawyermessages" element={<LawyerMessages />} />
        <Route path="/lawyerearnings" element={<LawyerEarnings />} />
        <Route path="/law" element={<Law />} />
        <Route path="/lawyerdashboard" element={<LawyersDashboard />} />
        <Route
          path="/lawyerappointments/active"
          element={<LawyerAppointmentsActive />}
        />
        <Route
          path="/lawyerappointments/request"
          element={<LawyerAppointmentsRequest />}
        />
        <Route
          path="/lawyerappointments/completed"
          element={<LawyerAppointmentsCompleted />}
        />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
