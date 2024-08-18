import LoginPage from '../pages/Auth/LoginPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import OrdersPage from '../pages/OrdersPage';
import MainInventoryPage from '../pages/MainInventoryPage';
import KitchenInventoryPage from '../pages/KitchenInventoryPage';
import CategoriesPage from '../pages/CategoriesPage';
import AddProductPage from '../pages/AddProductPage';
import EditProductPage from '../pages/EditProductPage';
import IngredientsPage from '../pages/IngredientsPage';
import ProductsPage from '../pages/ProductsPage';
import DealsPage from '../pages/DealsPage';
import AddDealPage from '../pages/AddDealPage';
import SettingsPage from '../pages/SettingsPage';
import NotFound from '../pages/NotFound';
import { Navigate } from 'react-router-dom';

const posRoutes = [
  {
    path: 'home',
    element: <HomePage />,
  },
];

const dashboardRoutes = [
  {
    path: '/',
    element: <Navigate to="/home" />,
    index: true,
  },
  {
    path: 'dashboard',
    element: <DashboardPage />,
  },
  {
    path: 'orders',
    element: <OrdersPage />,
  },
  {
    path: 'inventory/main',
    element: <MainInventoryPage />,
  },
  {
    path: 'inventory/kitchen',
    element: <KitchenInventoryPage />,
  },
  {
    path: 'categories',
    element: <CategoriesPage />,
  },
  {
    path: 'products',
    element: <ProductsPage />,
  },
  {
    path: 'products/add',
    element: <AddProductPage />,
  },
  {
    path: 'products/edit/:productId',
    element: <EditProductPage />,
  },
  {
    path: 'ingredients',
    element: <IngredientsPage />,
  },
  {
    path: 'deals',
    element: <DealsPage />,
  },
  {
    path: 'deals/add',
    element: <AddDealPage />,
  },
  {
    path: 'settings',
    element: <SettingsPage />,
  },
];

const authRoutes = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export { authRoutes, posRoutes, dashboardRoutes };
