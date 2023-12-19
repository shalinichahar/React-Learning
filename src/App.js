import React from "react";
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
           
        ],
    },
    {
        path: "/login",
        element: <Login />,
      },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);