import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const AdminRoute = ({children}: any) => {
    const { user, loading } = useAuth();

    if(loading) return null;

    if(!user){
        return <Navigate to="/login" />
    }

    if(user.role !== 'admin'){
        return <Navigate to="/" />
    }
    return children;
}

export default AdminRoute