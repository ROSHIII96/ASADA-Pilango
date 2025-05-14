import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ListaAbonadosPage from "./Pages/ListaAbonadosPage";
import ListaReportesPage from './Pages/ListaReportesPage'
import QuienesSomosPage from './Pages/QuienesSomosPage'
import ReportesPage from "./Pages/ReportesPage";
import { RootLayout } from './Components/RootLayout';
import { createRootRoute, createRoute, createRouter, createBrowserHistory } from "@tanstack/react-router"


const rootRoute = createRootRoute({ //Crea una ruta base o raiz
    component: RootLayout,          //indica que el componente RootLayout sera el componente principal
})

const homeRoute = createRoute({ 
    getParentRoute: () => rootRoute, 
    path: '/',
    component: HomePage,
})

const loginRoute = createRoute({ 
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage,
})

const listaAbonadosRoute = createRoute({ 
    getParentRoute: () => rootRoute,
    path: '/abonados',
    component: ListaAbonadosPage,
})

const listaReportesRoute = createRoute({ 
    getParentRoute: () => rootRoute,
    path: '/listareportes',
    component: ListaReportesPage,
})

const reportesRoute = createRoute({ 
    getParentRoute: () => rootRoute,
    path: '/reportes',
    component: ReportesPage,
})

const quienesSomosRoute = createRoute({ 
    getParentRoute: () => rootRoute,
    path: '/quienes-somos',
    component: QuienesSomosPage,
})

rootRoute.addChildren([  //adChildren agrega rutas hijas a la ruta raiz
    homeRoute,
    loginRoute,
    listaAbonadosRoute,
    listaReportesRoute,
    reportesRoute,
    quienesSomosRoute,
]);

const router = createRouter({
    routeTree: rootRoute,
    history: createBrowserHistory(),
    defaultErrorComponent: () => <div>Something went wrong</div>,
});


/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/quienes-somos",
    element: <QuienesSomosPage />,
  },
]);
*/
export default router;
