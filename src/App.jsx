import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signUp';
import AdminSignUp from './adminComponents/adminSignUp';
import Homepage from './components/homepage';
import Profile from './components/profile'; // ← Example, include your real components
import Home from './components/Home';
import AddPost from './components/addPost';
import Discover from './components/discover';
import Messages from './components/messages';
import Settings from './components/settings';
import AdminHomePage from './adminComponents/adminHomePage';

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
    path: "/admin/home",
    element: <AdminHomePage />,
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
      {
        path: "addPost",
        element: <AddPost />, // Add your actual child routes
      },
      {
        path: "discover",
        element: <Discover />, // Add your actual child routes
      },
      {
        path: "messages",
        element: <Messages />, // Add your actual child routes
      },
      {
        path: "settings",
        element: <Settings />, // Add your actual child routes
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
