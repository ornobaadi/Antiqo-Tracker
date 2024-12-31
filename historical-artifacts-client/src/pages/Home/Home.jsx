import { Helmet } from "react-helmet";
import Banner from "./Banner";
import HotArtifacts from "./HotArtifacts";
import Timeline from "./Timeline";
import Vision from "./Vision";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Antiqo</title>
            </Helmet>
            <Banner></Banner>
            <HotArtifacts></HotArtifacts>
            <Timeline></Timeline>
            <Vision></Vision>
        </div>
    );
};

export default Home;