import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";
import BloodDonation from "../Pages/BloodDonation";
import LostFound from "../Pages/LostFound";
import FloodRelief from "../Pages/FloodRelief";
import MedicalAid from "../Pages/MedicalAid";
import Events from "../Pages/Events";
import Auction from "../Pages/Auction";
import Bulletin from "../Pages/Bulletin";

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
        }
    ]
  },
]);
