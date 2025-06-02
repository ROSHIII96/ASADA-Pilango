import { RootLayout } from './Components/RootLayout';
import { createRootRoute, createRoute, createRouter, createBrowserHistory } from "@tanstack/react-router"
//Se importan todas las paginas que vamos a usar
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage"
import ListaAbonadosPage from "./Pages/ListaAbonadosPage";
import ListaReportesPage from './Pages/ListaReportesPage'
import QuienesSomosPage from './Pages/QuienesSomosPage'
import ReportesPage from "./Pages/ReportesPage";
import ContactanosPage from './Pages/ContactanosPage'
//Para hacer privada la ruta que queramos
import PrivateRoute from "./Components/PrivateRoute";

const rootRoute = createRootRoute({ //Crea una ruta base o raiz
    component: RootLayout,          //indica que el componente RootLayout sera el componente principal
})

//Se crean todas las rutas hijas de la ruta raiz, las cuales son las page que tengamos.
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
    component: () => (
        //Si no se usa redirectTo="/login", se redirige a la pagina default en privateRoute, en ese caso seria "/""
        <PrivateRoute redirectTo="/login">
            <QuienesSomosPage />
        </PrivateRoute>
    ),
})

const contactanosRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/contactanos',
    component: ContactanosPage,
})

rootRoute.addChildren([  //Se agrega rutas hijas a la ruta raiz
    homeRoute,
    loginRoute,
    listaAbonadosRoute,
    listaReportesRoute,
    reportesRoute,
    quienesSomosRoute,
    contactanosRoute,
]);

const router = createRouter({ //Crea el router
    routeTree: rootRoute,
    history: createBrowserHistory(),
    defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;