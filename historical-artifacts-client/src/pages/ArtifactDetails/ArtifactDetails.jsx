import { useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const ArtifactDetails = () => {
    const {
        artifactName,
        artifactImage,
        artifactType,
        historicalContext,
        createdAt,
        discoveredAt,
        discoveredBy,
        presentLocation,
        likeCount,
    } = useLoaderData();

    const { id } = useParams();
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(false);

    // Fetch initial liked status
    useEffect(() => {
        fetch(`https://historical-artifacts-server.vercel.app/liked-artifacts/${id}?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.liked) {
                    setIsLiked(true);
                }
            })
            .catch((error) => console.error("Error fetching liked status:", error));
    }, [id, user.email]);

    // Handle like
    const handleLike = () => {
        const likedArtifact = {
            artifact_id: id,
            applicant_email: user.email,
        };

        fetch('https://historical-artifacts-server.vercel.app/liked-artifacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(likedArtifact),
        })
            .then((res) => res.json())
            .then(() => {
                setIsLiked(true);
            })
            .catch((error) => console.error("Error liking artifact:", error));
    };

    // Handle unlike
    const handleUnlike = () => {
        fetch(`https://historical-artifacts-server.vercel.app/liked-artifacts/${id}?email=${user.email}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then(() => {
                setIsLiked(false);
            })
            .catch((error) => console.error("Error unliking artifact:", error));
    };

    return (
        <div className="bg-base-100 min-h-[800px] flex items-center justify-center py-10 px-4">
            <Helmet>
                <title>{artifactName} | Antiqo</title>
            </Helmet>
            <div className="bg-white rounded-lg shadow-lg max-w-7xl w-full flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                    <img
                        src={artifactImage}
                        alt={artifactName}
                        className="rounded-l-lg object-cover w-full h-full max-h-[500px]"
                    />
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-1/2 p-8 flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-800">{artifactName}</h1>
                    <p className="text-gray-600 mt-4 leading-relaxed">{historicalContext}</p>

                    <div className="mt-6 space-y-4 text-sm">
                        <p>
                            <span className="font-semibold text-gray-700">Artifact Type:</span> {artifactType}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">Created At:</span> {createdAt}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">Discovered At:</span> {discoveredAt}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">Discovered By:</span> {discoveredBy}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-700">Present Location:</span> {presentLocation}
                        </p>
                        <p
                            className="text-xl font-semibold text-gray-700"> Like Count: {likeCount}
                        </p>
                    </div>

                    {/* Action Section */}
                    <div className="flex items-center mt-8">
                        {isLiked ? (
                            <button onClick={handleUnlike} className="btn btn-neutral">Unlike</button>
                        ) : (
                            <button onClick={handleLike} className="btn btn-outline">Like</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtifactDetails;
