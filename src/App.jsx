import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signUp';
import AdminSignUp from './adminComponents/adminSignUp';
import Homepage from './components/homepage';
import Profile from './components/profile';
import Home from './components/Home';
import AddPost from './components/addPost';
import Discover from './components/discover';
import Messages from './components/messages';
import Settings from './components/settings';
import AdminHomePage from './adminComponents/adminHomePage';
import ManageRequests from './adminComponents/manageRequests';
import { UserProvider } from './userContext';

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
    path: "/admin",
    element: <Navigate to="/admin/home" replace />,
  },
  {
    path: "/admin/home",
    element: <AdminHomePage />,
    children: [
      {
        index: true,
        element: <div>Admin Dashboard Coming Soon</div>,
      },
      {
        path: "manageRequests", // ✅ RELATIVE path, NOT "/manageRequests"
        element: <ManageRequests/>,
      },
      {
        path: "manageUsers",
        element: <div>Manage Users Coming Soon</div>,
      },
      {
        path: "settings",
        element: <div>Admin Settings Coming Soon</div>,
      },
      {
        path: "dashboard",
        element: <div>Admin dashboard Coming Soon</div>,
      }
    ],
  },
  {
    path: "/homepage",
    element: <Homepage />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "addPost",
        element: <AddPost />,
      },
      {
        path: "discover",
        element: <Discover />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
