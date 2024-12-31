import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Helmet } from "react-helmet";

const AddArtifact = () => {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const handleAddArtifact = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData.entries());
        const initialData = Object.fromEntries(formData.entries());
        console.log(initialData);
        const { ...newArtifact } = initialData;
        console.log(newArtifact);

        fetch('https://historical-artifacts-server.vercel.app/artifacts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newArtifact)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Artifact has been added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myartifacts')
                }

            })


    }

    return (
        <>
            <Helmet>
                <title>Add Artifacts | Antiqo</title>
            </Helmet>

            <div className="container mx-auto px-5 py-10">
                <h2 className="text-4xl text-center font-medium text-gray-800 mb-10">Add a New Artifact</h2>
                <form onSubmit={handleAddArtifact} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
                    {/* Artifact name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Artifact Name</span>
                        </label>
                        <input type="text" name="artifactName" placeholder="Enter artifact name" className="input input-bordered w-full" required />
                    </div>
                    {/* Artifact image */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Artifact Image (URL)</span>
                        </label>
                        <input type="url" name="artifactImage" placeholder="Enter valid image URL" className="input input-bordered w-full" required />
                    </div>
                    {/* Artifact Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Artifact Type</span>
                        </label>
                        <select defaultValue="Select a type" name="artifactType" className="select select-bordered w-full" required>
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
                        <textarea name="historicalContext"
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
                            <input type="text" name="createdAt" placeholder="e.g., 100 BC" className="input input-bordered w-full" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Discovered At</span>
                            </label>
                            <input type="text" name="discoveredAt" placeholder="e.g., 1799" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    {/* Discovered by */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Discovered By</span>
                        </label>
                        <input type="text" name="discoveredBy" placeholder="Enter name of discoverer" className="input input-bordered w-full" required />
                    </div>
                    {/* Current location */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Present Location</span>
                        </label>
                        <input type="text" name="presentLocation" placeholder="Enter present location" className="input input-bordered w-full" required />
                    </div>
                    {/* User Name & Email */}
                    <div className="form-control grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Your Name</span>
                            </label>
                            <input type="text" name="username" defaultValue={user?.name} className="input input-bordered w-full" readOnly />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Your Email</span>
                            </label>
                            <input type="email"
                                defaultValue={user?.email}
                                name="userEmail" className="input input-bordered w-full" readOnly />
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-neutral w-full text-lg">Add Artifact</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddArtifact;
