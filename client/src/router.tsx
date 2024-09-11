import { createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";

const router=createBrowserRouter([
    {
        path:'/login',
        element:<LoginPage/>
    },
    {
        path:'/',
        element:<HomePage/>
    },
    {
        path:'/register',
        element:<RegisterPage/>
    }
]);


export default router;