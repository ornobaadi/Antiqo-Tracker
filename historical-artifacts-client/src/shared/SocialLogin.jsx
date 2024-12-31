import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = async () => {
        try {
            const result = await loginWithGoogle();
            console.log(result.user);
            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'You have successfully logged in.',
            }).then(() => {
                // Redirect after clicking OK
                navigate(from, { replace: true });
            });
        } catch (error) {
            console.error(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        }
    }

    return (
        <>
            <div className="divider">OR</div>
            <div className="flex justify-center my-5">
                <button onClick={handleGoogleLogin} className="btn w-full">
                    <FaGoogle />
                    Login with Google
                </button>
            </div>
        </>
    );
};

export default SocialLogin;