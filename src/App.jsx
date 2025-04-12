import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signUp';
import AdminSignUp from './adminComponents/adminSignUp';
import Homepage from './components/homepage';
import Profile from './components/profile'; // ← Example, include your real components
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/adminSignUp",
    element: <AdminSignUp />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
    children: [
      {
        index: true, // This will match /homepage exactly
        element: <Navigate to="home" />, // Redirect /homepage → /homepage/home
      },
      {
        path: "home",
        element: <Home />, // Your actual homepage content
      },
      {
        path: "profile",
        element: <Profile />, // Add your actual child routes
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
