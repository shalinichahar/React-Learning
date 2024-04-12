 import React, { lazy , Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.jsx";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from"./components/Contact.js";
import Login from "./components/Login";
import { createBrowserRouter , RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error.js";
import RestaurantMenu from "./components/RestaurantMenu.js"; 
import Profile from "./components/Profile.js"; 
import Shimmer from "./components/Shimmer.js";
import UserContext from "./utils/UserContext.js";
import { AuthProvider } from "./utils/AuthContext.js";

// Chunking
// Code Splitting
// Dynamic Bundling
// On demand Loading
// Dynamic Import
// Lazy loading

const Instamart = lazy(() => import("./components/Instamart.js"));

const AppLayout = () => {
    return(
        
        <> 
            <Header/>
            <Outlet/>
            <Footer/>     
        </>    
       
    );
};

const appRouter = createBrowserRouter([
    {
        path:"/",
        element: <AppLayout />,
        errorElement: <Error/>, 
        children:[
            {
                path:"/",
                element:<Body />,
                
            },
            {
                path:"/about",
                element:<About />,
                children:[
                    {
                        path:"profile",
                        element:<Profile/>
                    }
                ] 
            },
            {
                path:"/contact",
                element:<Contact />,
            },
            {
                path:"/restaurant/:resId",
                element:<RestaurantMenu />,
            },
            {
                path:"/instamart",
                element:<Suspense fallback={<Shimmer/>}><Instamart/></Suspense>
            }          
        ],
    },
    {
        path: "/login",
        element: <Login />,
      },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <RouterProvider router={appRouter} />
    </AuthProvider>);