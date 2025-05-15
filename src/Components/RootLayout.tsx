import NavBar from './Navbar'
import { Outlet } from '@tanstack/react-router'

export const RootLayout = () => {

    return (
        <div>
           <NavBar />
            <div className="container mx-auto p-4 py-8">
                {/* Outlet for nested routes */}
                <Outlet />
            </div>
        </div>
    )
}