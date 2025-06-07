import NavBar from './Navbar';
import { Outlet } from '@tanstack/react-router';

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full text-gray-800">
      <NavBar />
      <main className="flex-grow container max-w-7xl mx-auto p-4 pt-18 pb-8">
        <Outlet />
      </main>
    </div>
  );
};
