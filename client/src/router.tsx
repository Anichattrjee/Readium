import { createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import Bookspage from "./pages/Bookspage";
import AuthLayout from "./layouts/AuthLayout";

const router=createBrowserRouter([
    {
        path:'/dashboard',
        element:<DashboardLayout />,
        children:[
            {
                path:'home',
                element:<HomePage/>
            },
            {
                path:'books',
                element:<Bookspage/>
            }
        ]
    },
    {
        path:'/auth',
        element:<AuthLayout/>,
        children:[
            {
                path:'register',
                element:<RegisterPage/>
            },
            {
                path:'login',
                element:<LoginPage/>
            }
        ]
    }
]);


export default router;