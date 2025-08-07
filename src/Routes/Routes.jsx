import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Pages/About";
import Auction from "../Pages/Auction";
import BloodDonation from "../Pages/BloodDonation";
import Bulletin from "../Pages/Bulletin";
import Events from "../Pages/Events";
import FloodRelief from "../Pages/FloodRelief";
import Home from "../Pages/Home";
import LostFound from "../Pages/LostFound";
import MedicalAid from "../Pages/MedicalAid";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement: <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary">Go Back Home</a>
    </div>,
    children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/blood-donation",
            element: <BloodDonation/>
        },
        {
            path: "/lost-found",
            element: <LostFound/>
        },
        {
            path: "/flood-relief",
            element: <FloodRelief/>
        },
        {
            path: "/medical-aid",
            element: <MedicalAid/>
        },
        {
            path: "/events",
            element: <Events/>
        },
        {
            path: "/auction",
            element: <Auction/>
        },
        {
            path: "/bulletin",
            element: <Bulletin/>
        },
        {
            path: "/about",
            element: <About/>
        }
    ]
  },
]);
