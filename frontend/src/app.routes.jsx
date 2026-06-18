import { createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/login.jsx"
import Register from "./features/auth/pages/register.jsx"
import Home from "./pages/Home.jsx"
import Protected from "./features/auth/components/protected.jsx"
import InterviewPrep from "./features/interview/pages/InterviewPrep.jsx"

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },

    {
        path: "/register",
        element: <Register />
    },

    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path: "/prep",
        element: <Protected><InterviewPrep /></Protected>
    }
])