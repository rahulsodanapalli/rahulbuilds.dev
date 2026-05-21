import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export function useAdmin() {
  const { isAdmin, email } = useSelector((state: RootState) => state.auth);
  return {
    isAdmin,
    adminEmail: email,
  };
}
export default useAdmin;
