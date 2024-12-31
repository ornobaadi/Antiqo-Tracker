import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const UpdateArtifact = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const [artifact, setArtifact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://historical-artifacts-server.vercel.app/artifacts/${id}`)
            .then(res => res.json())
            .then(data => {
                setArtifact(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching artifact:", error);
                setLoading(false);
            });
    }, [id]);

    const handleUpdateArtifact = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());
    
        fetch(`https://historical-artifacts-server.vercel.app/artifacts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...updatedData, userEmail: user.email })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myartifacts');
                } else {
                    throw new Error(data.error || 'Failed to update artifact');
                }
            })
            .catch(error => {
                console.error("Update error:", error);
                Swal.fire({
                    title: "Error!",
                    text: error.message || "Failed to update artifact",
                    icon: "error"
                });
            });
    }
    

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!artifact) {
        return <div className="text-center py-10">Artifact not found</div>;
    }


    return (
        <>
            <Helmet>
                <title>Update Artifact | Antiqo</title>
            </Helmet>

            <div className="container mx-auto px-5 py-10">
                <h2 className="text-4xl text-center font-medium text-gray-800 mb-10">Update Artifact</h2>
                <form onSubmit={handleUpdateArtifact} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
                    {/* Artifact name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Artifact Name</span>
                        </label>
                        <input type="text" name="artifactName" defaultValue={artifact.artifactName} placeholder="Enter artifact name" className="input input-bordered w-full" required />
                    </div>
                    {/* Artifact image */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Artifact Image (URL)</span>
                        </label>
                        <input type="url" name="artifactImage" defaultValue={artifact.artifactImage} placeholder="Enter valid image URL" className="input input-bordered w-full" required />
                    </div>
                    {/* Artifact Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Artifact Type</span>
                        </label>
                        <select defaultValue={artifact.artifactType} name="artifactType" className="select select-bordered w-full" required>
                            <option disabled>Select a type</option>
                            <option value="Tools">Tools</option>
                            <option value="Monument">Monument</option>
                            <option value="Art">Art</option>
                            <option value="Sculptures">Sculptures</option>
                            <option value="Technology">Technology</option>
                            <option value="Documents">Documents</option>
                            <option value="Writings">Writings</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    {/* Historical context */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Historical Context</span>
                        </label>
                        <textarea 
                            name="historicalContext"
                            defaultValue={artifact.historicalContext}
                            placeholder="Provide historical context..."
                            className="textarea textarea-bordered w-full"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    {/* Created and Discovered */}
                    <div className="form-control grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Created At</span>
                            </label>
                            <input type="text" name="createdAt" defaultValue={artifact.createdAt} placeholder="e.g., 100 BC" className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Discovered At</span>
                            </label>
                            <input type="text" name="discoveredAt" defaultValue={artifact.discoveredAt} placeholder="e.g., 1799" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    {/* Discovered by */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Discovered By</span>
                        </label>
                        <input type="text" name="discoveredBy" defaultValue={artifact.discoveredBy} placeholder="Enter name of discoverer" className="input input-bordered w-full" required />
                    </div>
                    {/* Current location */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Present Location</span>
                        </label>
                        <input type="text" name="presentLocation" defaultValue={artifact.presentLocation} placeholder="Enter present location" className="input input-bordered w-full" required />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-neutral w-full text-lg">Update Artifact</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateArtifact;