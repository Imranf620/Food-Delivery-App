import { Route, Routes as SwitchRoutes } from 'react-router-dom';
import { authRoutes, dashboardRoutes, posRoutes } from './Routes';
import MainLayout from '../Components/Layout/MainLayout';
import DashboardLayout from '../Components/Layout/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <SwitchRoutes>
      {/* Auth Routes */}
      <Route>
        {' '}
        {authRoutes.map((route, index) => (
          <Route
            key={index}
            element={
              <ProtectedRoute authPage={true}>{route.element}</ProtectedRoute>
            }
            path={route.path}
          />
        ))}{' '}
      </Route>
      {/* POS Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {posRoutes.map((route, index) => (
          <Route key={index} {...route} />
        ))}{' '}
      </Route>
      {/* Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {dashboardRoutes.map((route, index) => (
          <Route key={index} {...route} />
        ))}{' '}
      </Route>
    </SwitchRoutes>
  );
};

export default Routes;
