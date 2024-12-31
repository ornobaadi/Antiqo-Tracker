import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
    const slides = [
        {
            image: "/slide1.jpg",
            title: "Unlock the Secrets of the Past",
            subtitle: "Discover the fascinating stories behind humanity's greatest historical treasures.",
        },
        {
            image: "/slide2.jpg",
            title: "Your Gateway to Ancient Wonders",
            subtitle: "Explore artifacts like the Rosetta Stone and Antikythera Mechanism—masterpieces of history.",
        },
        {
            image: "/slide3.jpg",
            title: "Contribute to History",
            subtitle: "Add your discoveries, share insights, and become part of preserving human heritage.",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative w-full h-96 min-h-[800px]">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50 text-white text-center px-4">
                        <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
                        <p className="text-lg mb-4">{slide.subtitle}</p>
                        <Link to='/allartifacts'
                            className="btn font-semibold">
                            Explore More
                        </Link>
                    </div>
                </div>
            ))}

            {/* Left Arrow */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-4 rounded-full hover:bg-gray-700 focus:outline-none"
                onClick={prevSlide}
            >
                ←
            </button>

            {/* Right Arrow */}
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-4 rounded-full hover:bg-gray-700 focus:outline-none"
                onClick={nextSlide}
            >
                →
            </button>
        </div>
    );
};

export default Banner;
