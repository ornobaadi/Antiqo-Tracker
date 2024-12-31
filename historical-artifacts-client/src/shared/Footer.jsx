import { Facebook, Github, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer footer-center bg-neutral text-primary-content p-10">
            <aside>
                <img className="w-32" src="/logo.webp" alt="" />
                <p className="font-bold">
                    Antiqo Tracker
                    <br />
                    Tracking innovations since 1992
                </p>

                <nav className="grid grid-flow-col gap-4 my-5">
                    <Link to='/' className="link link-hover hover:font-semibold">Home</Link>
                    <Link to='/addartifacts' className="link link-hover hover:font-semibold">Add Artifacts</Link>
                    <Link to='/allartifacts' className="link link-hover hover:font-semibold">All Artifacts</Link>
                    <Link to='/profile' className="link link-hover hover:font-semibold">My Profile</Link>
                </nav>

                <p> © {new Date().getFullYear()} Antiqo Tracker. All rights reserved.</p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://www.facebook.com/">
                        <Facebook></Facebook>
                    </a>
                    <a href="https://www.instagram.com/">
                        <Instagram></Instagram>
                    </a>
                    <a href="https://github.com/">
                        <Github></Github>
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;