import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center text-center text-white px-4">
            {/* Animated 404 */}
            <div className="relative">
                <h1 className="text-9xl font-extrabold tracking-wider">
                    4<span className="text-teal-500 animate-pulse">0</span>4
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 blur-xl opacity-50"></div>
            </div>

            {/* Error Message */}
            <p className="text-2xl mt-6 font-medium">Oops! Page not found</p>
            <p className="text-gray-400 mt-2">
                It seems the page you’re looking for doesn’t exist. <br /> Let’s get you back on track.
            </p>

            {/* Call-to-Action Button */}
            <Link to="/" className="mt-8">
                <button className="btn btn-outline text-gray-400 rounded-lg shadow-lg font-medium text-lg">
                    Back to Home
                </button>
            </Link>
        </div>
    );
};

export default Error;
