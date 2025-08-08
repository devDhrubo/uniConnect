import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Pages/About";
import Auction from "../Pages/Auction";
import BloodDonation from "../Pages/BloodDonation";
import Bulletin from "../Pages/Bulletin";
import BulletinDashboard from "../Pages/BulletinDashboard";
import Events from "../Pages/Events";
import FloodRelief from "../Pages/FloodRelief";
import Home from "../Pages/Home";
import LostFound from "../Pages/LostFound";
import MedicalAid from "../Pages/MedicalAid";
import Auth from "../Pages/Auth";
import ProtectedRoute from "../components/ProtectedRoute";
import BulletinAdminGuard from "../components/BulletinAdminGuard";

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
            path: "/auth",
            element: <Auth/>
        },
        {
            path: "/about",
            element: <About/>
        },
        // Special bulletin dashboard route (admin only)
        {
            path: "/bulletin-dashboard",
            element: <BulletinAdminGuard><BulletinDashboard/></BulletinAdminGuard>
        },
        // Protected routes - require authentication
        {
            path: "/blood-donation",
            element: <ProtectedRoute><BloodDonation/></ProtectedRoute>
        },
        {
            path: "/lost-found",
            element: <ProtectedRoute><LostFound/></ProtectedRoute>
        },
        {
            path: "/flood-relief",
            element: <ProtectedRoute><FloodRelief/></ProtectedRoute>
        },
        {
            path: "/medical-aid",
            element: <ProtectedRoute><MedicalAid/></ProtectedRoute>
        },
        {
            path: "/events",
            element: <ProtectedRoute><Events/></ProtectedRoute>
        },
        {
            path: "/auction",
            element: <ProtectedRoute><Auction/></ProtectedRoute>
        },
        {
            path: "/bulletin",
            element: <ProtectedRoute><Bulletin/></ProtectedRoute>
        }
    ]
  },
]);
