import {
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider, RequireAuth, useAuth } from "./providers/AuthProvider";
import LogoutPage from "./pages/auth/LogoutPage";
import LoginPage from "./pages/auth/LoginPage";
import Layout from "./tools/Layout";
import HomePage from "./pages/home/HomePage";
import LayoutAuth from "./tools/LayoutAuth";
import FilmPage from "./pages/sw/FilmsPage";
import PeoplePage from "./pages/sw/PeoplePage";
import PlanetsPage from "./pages/sw/PlanetsPage";
import SpeciesPage from "./pages/sw/SpeciesPage";
import StarshipsPage from "./pages/sw/StarshipsPage";
import VehiclesPage from "./pages/sw/VehiclesPage";


export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
           <Route
            path="/films"
            element={
              <RequireAuth>
                <FilmPage />
              </RequireAuth>
            }
          />
           <Route
            path="/people"
            element={
              <RequireAuth>
                <PeoplePage />
              </RequireAuth>
            }
          />
           <Route
            path="/planets"
            element={
              <RequireAuth>
                <PlanetsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/species"
            element={
              <RequireAuth>
                <SpeciesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/starships"
            element={
              <RequireAuth>
                <StarshipsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/vehicles"
            element={
              <RequireAuth>
                <VehiclesPage />
              </RequireAuth>
            }
          />

        </Route>
        <Route element={<LayoutAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}


