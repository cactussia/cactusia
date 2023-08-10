import Home from './pages/Home';
import Market from './pages/Market';
import Contact from './pages/Contact';
import About from './pages/About';
import ComplateOrder from './pages/ComplateOrder';
import Admin from './pages/Admin';
import ErrorBoundary from './pages/Error';
import NotFound from './pages/404'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = [
    // 404 - NotFound Error
    {
        path: '*',
        element: <NotFound/>
    },
    // Home Page
    {
        path: '/',
        element: <Home/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: '/market',
        element: <Market/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: '/contact',
        element: <Contact/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: '/about',
        element: <About/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: '/ordernow',
        element: <ComplateOrder/>,
        errorElement: <ErrorBoundary/>
    },
    {
        path: '/admin',
        element: <Admin/>,
        errorElement: <ErrorBoundary/>
    }
];

export default function Router() {
  return (
    <RouterProvider router={createBrowserRouter(router)} />
  )
}