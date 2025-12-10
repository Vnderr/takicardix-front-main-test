import { lazy } from "react";


const Home = lazy(() => import("../pages/user/Home"));
const Products = lazy(() => import("../pages/user/Products"));
const ProductDetail = lazy(() => import("../pages/user/ProductDetail"));
const Cart = lazy(() => import("../pages/user/Cart"));
const Contact = lazy(() => import("../pages/user/Contact"));
const About = lazy(() => import("../pages/user/About"));
const Profile = lazy(() => import("../pages/user/Profile"));
const Checkout = lazy(() => import("../pages/user/Checkout"));
const Orders = lazy(() => import("../pages/user/Orders"));
const OrderDetail = lazy(() => import("../pages/user/ordenDetail"));


const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));

const HomeAdmin = lazy(() => import("../pages/admin/Dashboard/HomeAdmin"));
const HomeProductos = lazy(() =>
  import("../pages/admin/Productos/HomeProductos")
);
const ListarProductos = lazy(() =>
  import("../pages/admin/Productos/ListarProductos")
);
const HomeVentas = lazy(() => import("../pages/admin/Ventas/HomeVentas"));
const ListarVentas = lazy(() => import("../pages/admin/Ventas/ListarVentas"));
const HomeUsuarios = lazy(() => import("../pages/admin/Usuarios/HomeUsuarios"));
const ListarUsuarios = lazy(() =>
  import("../pages/admin/Usuarios/ListarUsuarios")
);
const HomeLogistica = lazy(() =>
  import("../pages/admin/Logistica/HomeLogistica")
);
const ListarEnvios = lazy(() =>
  import("../pages/admin/Logistica/ListarEnvios")
);

const publicRoutes = [
  { path: "/", element: <Home />, showNavbar: true },
  { path: "/products", element: <Products />, showNavbar: true },
  { path: "/product/:id", element: <ProductDetail />, showNavbar: true },
  { path: "/cart", element: <Cart />, showNavbar: true },
  { path: "/contact", element: <Contact />, showNavbar: true },
  { path: "/about", element: <About />, showNavbar: true },
  { path: "/login", element: <Login />, showNavbar: true },
  { path: "/register", element: <Register />, showNavbar: true },
  { path: "/profile", element: <Profile />, showNavbar: true },
  { path: "/checkout", element: <Checkout />, showNavbar: true },
  { path: "/orders", element: <Orders />, showNavbar: true },
  { path: "/order/:id", element: <OrderDetail />, showNavbar: true },
];

const adminRoutes = [
  { path: "/admin/dashboard", element: <HomeAdmin />, isAdmin: true },
  { path: "/admin/productos", element: <HomeProductos />, isAdmin: true }, 
  {
    path: "/admin/productos/listar",
    element: <ListarProductos />,
    isAdmin: true,
  },
  { path: "/admin/ventas", element: <HomeVentas />, isAdmin: true },
  { path: "/admin/ventas/listar", element: <ListarVentas />, isAdmin: true },
  { path: "/admin/usuarios", element: <HomeUsuarios />, isAdmin: true },
  {
    path: "/admin/usuarios/listar",
    element: <ListarUsuarios />,
    isAdmin: true,
  },
  { path: "/admin/logistica", element: <HomeLogistica />, isAdmin: true },
  { path: "/admin/logistica/envios", element: <ListarEnvios />, isAdmin: true },
];


const notFoundRoute = {
  path: "*",
  element: (
    <div className="text-center py-10 text-2xl">404 - Página no encontrada</div>
  ),
  showNavbar: false,
};


export const appRoutes = [
  ...publicRoutes,
  ...adminRoutes, 
  notFoundRoute,
];
