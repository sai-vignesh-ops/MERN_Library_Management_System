import { protectedRouteStyles as s } from '../assets/dummyStyles';
import { useAuth } from './AuthContext';
import { useLocation,Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({allowedRole}) => {
    const {currentUser,ready}=useAuth();
    const location=useLocation();
    if(!ready){
        console.log("Protected Route: Auth not ready yet");
        return (
            <div className={s.loadingContainer}>
             <div className={s.loadingCard}>Loading your Library workspace</div>  
            </div>
        )
    }
    if(!currentUser){
    const hasToken=localStorage.getItem("library-auth-token");
     console.log("Protected Route: No CurrentUser.HasToken:",
        !!hasToken,
        "AllowedRole",
         allowedRole, 
     );
     if(hasToken){
        return(
            <div className={s.loadingContainer}>
            <div className={s.loadingCard}>Syncing your workspace...</div>  
            </div>
        )
     }
     return <Navigate to='/login' replace state={{from:location.pathname}}/>
    }
    console.log("Protected Route: CurrentUser:",
        currentUser.role,
        "AllowedRole",
        allowedRole,
    );
    if(currentUser.role !== allowedRole){
        console.warn("Protected Route:Role mismatch! redirecting to login")
        return (
        <Navigate to='/login' replace state={{from:location.pathname}}/>
        );
    }
    console.log("Protected Route: Access Granted")
  return (
    <Outlet/>
  )
}

export default ProtectedRoute;