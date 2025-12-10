import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import { Suspense } from "react";
import { adminLinks } from "./data/NavbarAdmin";
import { publicLinks } from "./data/NavbarUser";
import { appRoutes } from "./routes/config";
import Navbar from "./components/organisms/Navbar";
import Footer from "./components/organisms/Footer";

function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const currentRoute = appRoutes.find((route) =>
    matchPath({ path: route.path, end: true }, location.pathname)
  );

  const showNavbar = isAdminRoute || currentRoute?.showNavbar;

  const navbarLinks = isAdminRoute ? adminLinks : publicLinks;
  const navbarTitle = isAdminRoute ? "Admin Takicardix" : "Takicardix";

  return (
    <>
      {showNavbar && <Navbar links={navbarLinks} title={navbarTitle} />}

      <main>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          }
        >
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return <Layout />;
}

export default App;
