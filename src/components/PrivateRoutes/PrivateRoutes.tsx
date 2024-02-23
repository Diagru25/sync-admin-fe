import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "configs/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "routes/route.constant";
import { useEffect } from "react";
import { checkSession } from "redux/auth/slice";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.authSlice);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return isLoggedIn ? <Outlet /> : <Navigate to={LOGIN} />;
};

export default PrivateRoutes;
