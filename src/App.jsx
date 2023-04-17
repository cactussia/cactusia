import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Market from './pages/Market';
import Home from './pages/Home';
import { ControlersContext } from './Context/ControlersContext';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/Market",
    element: <Market/>,
  },
]);



function App() {
  const [pot , setPot]=useState(0);
  const [cactus , setCactus ]=useState(0);

  return (
    <ControlersContext.Provider value={{pot,setPot,cactus,setCactus}}>
      <RouterProvider router={router} />
    </ControlersContext.Provider>
  )
}

export default App
