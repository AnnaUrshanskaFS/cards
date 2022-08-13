import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
const Logout = ({ redirect }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    if (redirect) {
      navigate(redirect);
    }
  }, []);
  return null;
};

export default Logout;
