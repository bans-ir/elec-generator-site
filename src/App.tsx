import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ElecHomePage from '@components/pages/ElecHome'
import ElecIndustry from '@components/pages/ElecIndustry'
import ElecProductPage from '@components/pages/ElecProduct'
import HomePage from '@components/pages/Home'
import ReceiptPage from '@components/pages/Receipt'

// => React Router Dom Configuration
const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/elec-home',
        element: <ElecHomePage />
    },
    {
        path: '/elec-industry',
        element: <ElecIndustry />
    },
    {
        path: '/elec-product',
        element: <ElecProductPage />
    },
    {
        path: '/receipt',
        element: <ReceiptPage />
    }
])

// => Main App Configuration
function App() {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster />
        </>
    )
}

export default App
