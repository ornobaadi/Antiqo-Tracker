import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const EmptyState = ({ title, message }) => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-center max-w-sm">{message}</p>
    </div>
);

const MyLikedArtifacts = () => {
    const { user } = useAuth();
    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://historical-artifacts-server.vercel.app/liked-artifact?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setLikes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Fetch error:", error);
                setLoading(false);
            });
    }, [user.email]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Liked Artifacts | Antiqo</title>
            </Helmet>
            <h2 className="text-4xl font-medium text-center my-10">My Liked Artifacts: {likes.length}</h2>

            {likes.length === 0 ? (
                <EmptyState 
                    title="No liked artifacts yet"
                    message="Explore our collection and like artifacts that interest you to see them here."
                />
            ) : (
                <div className="overflow-x-auto pb-10">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Artifact Name</th>
                                <th>Artifact Type</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {likes.map((like, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{like.artifactName}</td>
                                    <td>{like.artifactType}</td>
                                    <td>{like.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyLikedArtifacts;