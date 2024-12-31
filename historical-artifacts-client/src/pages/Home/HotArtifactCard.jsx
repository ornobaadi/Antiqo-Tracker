/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const HotArtifactCard = ({ artifact }) => {

    const { _id, artifactName, artifactImage, artifactType, historicalContext, createdAt, discoveredAt, discoveredBy, presentLocation } = artifact;

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img src={artifact.artifactImage} alt={artifact.artifactName} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg font-bold">{artifact.artifactName}</h2>
                <p className="text-sm text-gray-500">{artifact.historicalContext}</p>
                <div className="text-sm mt-2">
                    <p
                        className="text-xl font-semibold">Like Count: {artifact.likeCount}
                    </p>
                </div>
                <div className="card-actions justify-end mt-4">
                    <Link
                        to={`/artifacts/${_id}`}
                        className="btn btn-outline"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotArtifactCard; 