import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet";

const UpdateProfile = () => {
    const { user } = useContext(AuthContext);
    const auth = getAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoURL,
            });
            navigate("/profile");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex flex-col items-center py-12">
            <Helmet>
                <title>Update Profile | Antiqo</title>
            </Helmet>
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="px-8 py-6">
                    <h2 className="text-2xl font-semibold text-slate-800 text-center mb-6">
                        Update Profile Information
                    </h2>
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">
                                Photo URL
                            </label>
                            <input
                                type="text"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                placeholder="Enter photo URL"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-3 rounded-lg shadow-md text-white bg-emerald-500 hover:bg-emerald-600 transition-transform active:scale-95 ${
                                loading ? "cursor-not-allowed opacity-70" : ""
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Information"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;