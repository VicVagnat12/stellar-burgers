// components/protected-route.tsx
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const location = useLocation();

  if (onlyUnAuth && isAuthenticated) {
    // Если пользователь авторизован и роут только для неавторизованных
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    // Если пользователь не авторизован и роут защищенный
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
