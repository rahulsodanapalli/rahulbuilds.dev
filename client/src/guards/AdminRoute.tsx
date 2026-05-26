import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { useGetMeQuery } from '../services/api/authApi';
import { setCredentials, logOutState } from '../store/authSlice';

interface AdminRouteProps {
  children?: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state: RootState) => state.auth);
  
  // Call getMe on mount to auto-authenticate if a valid HttpOnly cookie is present
  const { data, isLoading, isError } = useGetMeQuery(undefined, {
    skip: isAdmin, // Skip if already authenticated in memory
  });

  useEffect(() => {
    if (data?.success && data?.data) {
      dispatch(setCredentials(data.data));
    } else if (isError) {
      dispatch(logOutState());
    }
  }, [data, isError, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center font-sans text-xs uppercase tracking-widest text-luxury-gold animate-pulse font-bold">
        Verifying security clearance...
      </div>
    );
  }

  // If not authenticated and not loading, redirect to login
  if (!isAdmin && !data?.success) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
