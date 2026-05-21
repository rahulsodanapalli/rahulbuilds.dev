import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { useLoginMutation, useLogoutMutation } from '../api/authApi';
import { setCredentials, logOutState } from '../store/authSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const { isAdmin, email, loading, error } = useSelector((state: RootState) => state.auth);
  
  const [loginApi, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  const login = async (credentials: any) => {
    try {
      const res = await loginApi(credentials).unwrap();
      if (res.success && res.data) {
        dispatch(setCredentials(res.data));
      }
      return res;
    } catch (err: any) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logOutState());
    } catch (err) {
      console.error('Logout failed:', err);
      // Fallback: logout locally anyway
      dispatch(logOutState());
    }
  };

  return {
    isAdmin,
    email,
    loading: loading || isLoggingIn || isLoggingOut,
    error,
    login,
    logout,
  };
}
export default useAuth;
