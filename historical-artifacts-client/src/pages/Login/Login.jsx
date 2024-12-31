import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet";
import axios from "axios";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");

    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await loginUser(email, password);
            console.log('login', result.user.email)
            const user = { email: email }
            axios.post('https://historical-artifacts-server.vercel.app/jwt', user, { withCredentials: true })
                .then(res => {
                    console.log(res.data);
                })
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
            setError(error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        }
    }


    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center">
            <Helmet>
                <title>Login | Antiqo</title>
            </Helmet>
            <div className="max-w-md w-full bg-base-100 shadow-xl rounded-lg p-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-sm text-gray-500 mt-2">Welcome back! Please login to continue.</p>
                </div>
                {error && <div className="alert alert-error text-white mb-4">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="form-control">
                        <label className="label mb-2 text-sm font-medium text-gray-600">
                            <span>Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label mb-2 text-sm font-medium text-gray-600">
                            <span>Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                            required
                        />
                        <div className="text-right mt-2">
                            <a href="#" className="text-xs text-primary hover:underline">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div className="form-control">
                        <button className="btn btn-primary w-full">Login</button>
                    </div>
                    <h2 className="text-center py-5">Don&apos;t have an Account? &nbsp;
                        <Link to='/signup' className="font-semibold">Signup</Link>
                    </h2>
                </form>
                <SocialLogin />
            </div>
        </div>

    );
};

export default Login;