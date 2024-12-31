import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import AuthContext from '../../context/AuthContext/AuthContext';
import SocialLogin from '../../shared/SocialLogin';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const Signup = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous errors

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const userName = form.userName.value;
        const photoUrl = form.photoUrl.value;

        try {
            // Username validation
            if (userName.length < 5) {
                setError('Username must be at least 5 characters long.');
                throw {
                    code: 'validation/username',
                    message: 'Username must be at least 5 characters long.'
                };
            }

            // Password validation
            const passwordErrors = [];
            if (!/[A-Z]/.test(password)) {
                passwordErrors.push('Password must include at least one uppercase letter');
            }
            if (!/[a-z]/.test(password)) {
                passwordErrors.push('Password must include at least one lowercase letter');
            }
            if (!/[0-9]/.test(password)) {
                passwordErrors.push('Password must include at least one number');
            }
            if (password.length < 6) {
                passwordErrors.push('Password must be at least 6 characters long');
            }

            if (passwordErrors.length > 0) {
                setError(passwordErrors.join(', '));
                throw {
                    code: 'validation/password',
                    message: passwordErrors
                };
            }

            // If all validations pass, create user
            const result = await createUser(email, password, userName, photoUrl);
            console.log(result);
            
            // Show success alert and redirect only if user creation was successful
            await Swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: 'Your account has been created successfully.',
            });
            
            // Clear form and redirect only after successful signup
            form.reset();
            navigate('/', { replace: true });

        } catch (error) {
            console.error('Signup error:', error);
            
            // Handle different types of errors
            if (error.code === 'auth/email-already-in-use') {
                setError('This email is already registered. Please try logging in instead.');
            } else if (error.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else if (!error.code.startsWith('validation/')) { // Don't override validation errors
                setError('An error occurred during signup. Please try again.');
            }

            // Show SweetAlert for the error
            await Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: error.message || error.code
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center">
            <Helmet>
                <title>Signup | Antiqo</title>
            </Helmet>
            <div className="max-w-md w-full bg-base-100 shadow-xl rounded-lg p-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-sm text-gray-500 mt-2">Create your account to get started!</p>
                </div>

                {error && <div className="alert alert-error text-white mb-4">{error}</div>}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="form-control">
                        <label className="label mb-2 text-sm font-medium text-gray-600">
                            <span>User Name</span>
                        </label>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Enter your username (min 5 characters)"
                            className="input input-bordered w-full"
                            required
                            minLength={5}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label mb-2 text-sm font-medium text-gray-600">
                            <span>Profile Photo URL</span>
                        </label>
                        <input
                            type="text"
                            name="photoUrl"
                            placeholder="Enter your photo URL"
                            className="input input-bordered w-full"
                        />
                    </div>
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
                            minLength={6}
                        />
                    </div>

                    <div className="form-control">
                        <button 
                            className={`mt-4 btn btn-primary w-full ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </div>
                    <h2 className="text-center py-5">Already have an Account? &nbsp;
                        <Link to='/login' className="font-semibold">Login</Link>
                    </h2>
                </form>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Signup;