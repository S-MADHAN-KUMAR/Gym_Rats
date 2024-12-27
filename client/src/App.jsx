import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy-loaded components
const CartPage = lazy(() => import('./pages/user/CartPage'));
const ProtectRoute = lazy(() => import('./pages/user/ProtectRoute'));
const RegisterPage = lazy(() => import('./pages/user/RegisterPage'));
const LoginPage = lazy(() => import('./pages/user/LoginPage'));
const HomePage = lazy(() => import('./pages/user/HomePage'));
const AboutPage = lazy(() => import('./pages/user/AboutPage'));
const CheckoutPage = lazy(() => import('./pages/user/CheckoutPage'));
const ShopPage = lazy(() => import('./pages/user/ShopPage'));
const WishlistPage = lazy(() => import('./pages/user/WishlistPage'));
const ProductDetailPage = lazy(() => import('./pages/user/ProductDetailPage'));
const NotFountPage = lazy(() => import('./pages/user/NotFountPage'));

const App = () => {
  const userRoutes = [
    { path: '/', element: <HomePage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '/wishlist', element: <WishlistPage /> },
    { path: '/shop', element: <ShopPage /> },
    { path: '/checkout', element: <CheckoutPage /> },
    { path: '/cart', element: <CartPage /> },
    { path: '/products/:id', element: <ProductDetailPage /> },
    { path: '/register', element: <ProtectRoute isProtectedForLoggedIn={true}><RegisterPage /></ProtectRoute> },
    { path: '/login', element: <ProtectRoute isProtectedForLoggedIn={true}><LoginPage /></ProtectRoute> },
    { path: '*', element: <NotFountPage /> },
  ];

  return (
    <Router>
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {userRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
