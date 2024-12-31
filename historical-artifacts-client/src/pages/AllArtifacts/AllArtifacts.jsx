import { useEffect, useState } from "react";
import HotArtifactCard from "../Home/HotArtifactCard";
import { Helmet } from "react-helmet";

const AllArtifact = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredArtifacts, setFilteredArtifacts] = useState([]);

    useEffect(() => {
        fetch("https://historical-artifacts-server.vercel.app/artifacts")
            .then((res) => res.json())
            .then((data) => {
                setArtifacts(data);
                setFilteredArtifacts(data);
            });
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredArtifacts(artifacts);
        } else {
            const filtered = artifacts.filter((artifact) =>
                artifact.artifactName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredArtifacts(filtered);
        }
    }, [searchTerm, artifacts]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="container mx-auto px-5">
            <Helmet>
                <title>All Artifacts | Antiqo</title>
            </Helmet>
            <h2 className="text-4xl font-medium text-center my-10">All Artifacts</h2>

            <div className="flex items-center gap-4 my-5">
                <input
                    type="text"
                    placeholder="Search artifacts..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="input input-bordered w-full max-w-md"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5">
                {filteredArtifacts.map((artifact) => (
                    <HotArtifactCard key={artifact._id} artifact={artifact} />
                ))}
            </div>
        </div>
    );
};

export default AllArtifact;
