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
import NotFoundPage from './components/errorPage';
import AdminDashboard from './adminComponents/dashboard';
import ManageUsers from './adminComponents/manageUsers';
import AdminSettings from './adminComponents/adminSettings';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFoundPage />,
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
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminHomePage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/admin/manageRequests",
    element: <AdminHomePage />,
    children: [
      {
        index: true,
        element: <ManageRequests />,
      },
    ],
  },
  {
    path: "/admin/manageUsers",
    element: <AdminHomePage />,
    children: [
      {
        index: true,
        element: <ManageUsers/>,
      },
    ],
  },
  {
    path: "/admin/settings",
    element: <AdminHomePage />,
    children: [
      {
        index: true,
        element: <AdminSettings/>,
      },
    ],
  },
  {
    path: "/homepage",
    element: <Homepage />,
    children: [
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
        path: "messages/:chatId",
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
