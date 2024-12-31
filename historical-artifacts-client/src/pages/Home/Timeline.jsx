import { Zoom } from "react-awesome-reveal";
import { FaGlobe, FaUniversity, FaCompass, FaRocket, FaBrain } from "react-icons/fa";

const Timeline = () => {
    const timelineEvents = [
        {
            year: "3000 BC",
            title: "Ancient Civilizations",
            description: "The beginning of written history and the rise of the earliest known civilizations.",
            icon: <FaGlobe className="text-3xl text-white" />,
        },
        {
            year: "476 AD",
            title: "The Fall of Rome",
            description: "Marking the end of the ancient era and the beginning of the Middle Ages.",
            icon: <FaUniversity className="text-3xl text-white" />,
        },
        {
            year: "1492",
            title: "Age of Exploration",
            description: "Christopher Columbus discovers the New World, changing global history forever.",
            icon: <FaCompass className="text-3xl text-white" />,
        },
        {
            year: "1969",
            title: "Moon Landing",
            description: "Apollo 11 successfully lands on the moon, marking a leap in human achievement.",
            icon: <FaRocket className="text-3xl text-white" />,
        },
        {
            year: "2023",
            title: "Modern Discoveries",
            description: "Advancements in AI and technology transform how we explore the past and the future.",
            icon: <FaBrain className="text-3xl text-white" />,
        },
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-200">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-800">
                    Explore Our Timeline
                </h2>
                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-400 to-blue-500 h-full"></div>

                    <div className="space-y-12">
                        {timelineEvents.map((event, index) => (
                            <Zoom key={index} triggerOnce>
                                <div
                                    className={`relative flex flex-col md:flex-row items-center ${
                                        index % 2 === 0 ? "md:items-start" : "md:items-end"
                                    }`}
                                >
                                    {/* Timeline Marker */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                        {event.icon}
                                    </div>

                                    {/* Connector Line */}
                                    <div
                                        className={`hidden md:block absolute top-6 h-[1px] bg-gray-300 ${
                                            index % 2 === 0 ? "left-0 w-1/2" : "right-0 w-1/2"
                                        }`}
                                    ></div>

                                    {/* Event Content */}
                                    <div
                                        className={`bg-white p-8 rounded-lg shadow-lg max-w-md hover:scale-105 transition-transform duration-300 ${
                                            index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                                        }`}
                                    >
                                        <h3 className="text-2xl font-bold text-blue-600 mb-2">
                                            {event.year}
                                        </h3>
                                        <h4 className="text-xl font-semibold text-gray-700 mb-3">
                                            {event.title}
                                        </h4>
                                        <p className="text-gray-600">{event.description}</p>
                                    </div>
                                </div>
                            </Zoom>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
