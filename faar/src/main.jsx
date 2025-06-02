import { StrictMode } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/Layout.jsx';
import App from './App.jsx'
import {
    Login,
  Register,
  Home,
  LandingPage,
  Weather,
  CropSuggester,
  CropPrices,
  UpdateProfile,
  MyProfile,
  ChangePassword,
  Vendors,
  Stats
} from './index.js'


const router = createBrowserRouter([
    {
        path:'/',
    element:<Layout/>, //Layout
    children:[
        {
            path:'/',
            element:<LandingPage/>, //it is the landing page here
        },
        {
            path:'/login',
            element:(
                // <Protected authentication={false}>
                    <Login/>
                //  </Protected>
            ),
            
        },
        {
            path: "/register",
            element: (
                
                    <Register />
                
            ),
        },{
            path:"/home",
            element:<Home/>
        },
        {
            path:"/weather",
            element:<Weather/>
        },
        {
            path:"/crops-suggestor",
            element:<CropSuggester/>

        },
        {
            path:"/profile",
            element:<MyProfile/>

        },
        {
            path:"/update-profile",
            element:<UpdateProfile/>

        },
        {
            path:"/crops-prices/:username",
            element:<CropPrices/>

        },
        {
            path:"/stats/:cropName",
            element:<Stats/>

        },
        {
            path:"/change-password",
            element:<ChangePassword/>

        },
        {
            path:"/vendors",
            element:<Vendors/>


        }
    ]
    }

])

createRoot(document.getElementById('root')).render(
  
    // <Provider store={store}>
    <RouterProvider router={router}/>
    // </Provider>
  
)
