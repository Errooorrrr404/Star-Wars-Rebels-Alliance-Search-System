import {
  Routes,
  Route
} from 'react-router-dom'
import { AuthProvider, RequireAuth } from './providers/AuthProvider'
import LogoutPage from './pages/auth/LogoutPage'
import LoginPage from './pages/auth/LoginPage'
import Layout from './tools/Layout'
import HomePage from './pages/home/HomePage'
import LayoutAuth from './tools/LayoutAuth'
import PeoplePage from './pages/people'
import SpeciesPage from './pages/species'
import VehiclesPage from './pages/vehicles'
import PeopleDetailPage from './pages/people/details'
import VehiclesDetailPage from './pages/vehicles/details'
import PlanetsDetailPage from './pages/planets/details'
import FilmsDetailPage from './pages/films/details'
import SpeciesDetailsPage from './pages/species/details'
import StarshipDetailsPage from './pages/starships/details'
import FilmPage from './pages/films'
import PlanetsPage from './pages/planets'
import StarshipsPage from './pages/starships'
import NotFoundPage from './pages/errors/NotFound'
import Locked from './pages/errors/Locked'

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
            path="/people">
            <Route index element={<RequireAuth><PeoplePage /></RequireAuth>} />
            <Route path=":id" element={<RequireAuth><PeopleDetailPage /></RequireAuth>} />
          </Route>
          <Route
            path="/vehicles">
            <Route index element={<RequireAuth><VehiclesPage /></RequireAuth>} />
            <Route path=":id" element={<RequireAuth><VehiclesDetailPage /></RequireAuth>} />
          </Route>
          <Route
            path="/planets">
            <Route index element={<RequireAuth><PlanetsPage /></RequireAuth>} />
            <Route path=":id" element={<RequireAuth><PlanetsDetailPage /></RequireAuth>} />
          </Route>
          <Route
            path="/films">
            <Route index element={<RequireAuth><FilmPage /></RequireAuth>} />
            <Route path=":id" element={<RequireAuth><FilmsDetailPage /></RequireAuth>} />
          </Route>
          <Route
            path="/species">
            <Route index element={<RequireAuth><SpeciesPage /></RequireAuth>} />
            <Route path=":id" element={<RequireAuth><SpeciesDetailsPage /></RequireAuth>} />
          </Route>
          <Route
            path="/starships">
            <Route index element={<RequireAuth><StarshipsPage /></RequireAuth>} />
            <Route path=":id" element={<RequireAuth><StarshipDetailsPage /></RequireAuth>} />
          </Route>
        </Route>
        <Route element={<LayoutAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/locked" element={<Locked />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}
