import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";

const DEFAULT_USER_IMAGE = "https://www.shutterstock.com/image-vector/3d-realistic-person-people-vector-600nw-2058395777.jpg";

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                console.log('Successful signout');
            })
            .catch(error => {
                console.log("Failed", error);
            });
    };

    const handleImageError = (e) => {
        e.target.src = DEFAULT_USER_IMAGE;
    };

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allartifacts'>All Artifacts</NavLink></li>
        <li><NavLink to='/addartifacts'>Add Artifacts</NavLink></li>
    </>;

    return (
        <div className="navbar bg-base-100 container mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>

                <Link to='/' className="btn btn-ghost text-xl">
                    <img className="w-10 hidden lg:flex" src="/logo.webp" alt="" />
                    Antiqo
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end gap-5">
                {user && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-12 rounded-full">
                                <img
                                    src={user.photoURL || DEFAULT_USER_IMAGE}
                                    alt="User"
                                    onError={handleImageError}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-2 shadow">
                            <li><NavLink to='/profile'>My Profile</NavLink></li>
                            <li><NavLink to='/myartifacts'>My Artifacts</NavLink></li>
                            <li><NavLink to='/likedartifacts'>Liked Artifacts</NavLink></li>
                        </ul>
                    </div>
                )}

                {user ? (
                    <button onClick={handleLogout} className="btn">Logout</button>
                ) : (
                    <div className="flex gap-2">
                        <Link to='/login' className="btn btn-outline">Login</Link>
                        <Link to='/signup' className="btn btn-neutral">Signup</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;