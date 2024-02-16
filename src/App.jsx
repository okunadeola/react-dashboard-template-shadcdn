import RootLayout from "./layout/RootLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Others from "./pages/Others";
import Teacher from "./pages/Teacher";
import Search from "./pages/Search";
import Analytics from "./pages/Analytics";
import Cloud from "./pages/cloudinary/Cloud";
import Payment from "./pages/payment/Payment";
import { onMessageListener, requestForToken } from "./firebase";
import toast from "react-hot-toast";
import { useEffect } from "react";

import CalendarComponent from "./pages/calendar";
import "flatpickr/dist/themes/material_green.css";

function App() {
  // firebase notification token request on load
  useEffect(() => {
    const notification = async () => {
      const res = await requestForToken();
      if (res !== "" && res !== null) {
        const json = {
          token: res,
        };

        console.log(json);
      }
    };
    notification();
  }, []);
  // firebase notification token request on load

  // firebase notification listerner
  onMessageListener()
    .then((payload) => {
      return payload;
    })
    .then(async (val) => {
      console.log("got notification...", val);

      const json = {
        title: val?.notification?.title,
        body: val?.notification?.body,
      };

      console.log(json);
      toast.success(val?.notification?.body);
    })
    .catch((err) => console.log("failed: ", err));
  // firebase notification listerner

  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/others" element={<Others />} />

        <Route path="/teacher/courses" element={<Teacher />} />

        <Route path="/search" element={<Search />} />

        <Route path="/calendar" element={<CalendarComponent />} />

        <Route path="/cloud" element={<Cloud />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/search" element={<Search />} />

        <Route path="/teacher/analytics" element={<Analytics />} />
      </Routes>
    </RootLayout>
  );
}

export default App;
