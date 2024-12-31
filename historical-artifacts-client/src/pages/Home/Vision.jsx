import { Slide } from "react-awesome-reveal";
import { FaLightbulb, FaUserFriends, FaChartLine, FaRobot } from "react-icons/fa";

const Vision = () => {
    const futureGoals = [
        {
            title: "Innovative Technologies",
            description: "Leverage AI and machine learning to uncover new insights from historical data.",
            icon: <FaRobot className="text-4xl text-purple-500" />,
        },
        {
            title: "Global Collaboration",
            description: "Expand partnerships with global institutions to promote education and research.",
            icon: <FaUserFriends className="text-4xl text-blue-500" />,
        },
        {
            title: "Sustainable Growth",
            description: "Ensure environmentally friendly practices in preserving historical artifacts.",
            icon: <FaChartLine className="text-4xl text-green-500" />,
        },
        {
            title: "Inspire Future Generations",
            description: "Create tools to engage with history innovatively.",
            icon: <FaLightbulb className="text-4xl text-yellow-500" />,
        },
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-200">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-800">
                    Vision for the Future
                </h2>

                {/* Goals List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {futureGoals.map((goal, index) => (
                        <Slide key={index} direction={index % 2 === 0 ? "left" : "right"} triggerOnce>
                            <div className="bg-white p-8 rounded-lg shadow-lg flex items-center space-x-6 hover:shadow-xl transition-shadow duration-300">
                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    {goal.icon}
                                </div>
                                {/* Content */}
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-700 mb-2">
                                        {goal.title}
                                    </h3>
                                    <p className="text-gray-600">{goal.description}</p>
                                </div>
                            </div>
                        </Slide>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Vision;
