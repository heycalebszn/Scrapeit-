import { useEffect, useState } from "react";
import { Circle } from "../components/Circle";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { main } from "../constants/results";
import { useScanStore } from "../store/store";

const Skeleton = () => (
    <div className="w-full max-w-4xl px-[50px] animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-48 bg-gray-800 rounded mb-4"></div>
        <div className="grid grid-cols-2 gap-10">
            {[...Array(2)].map((_, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg">
                    <div className="h-5 bg-gray-700 rounded w-2/3 mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-700 rounded"></div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const TypingText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState("");
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, [text]);
    return <h1 className="text-gray-400">{displayText}</h1>;
};

const Results = () => {
    const { result, error, loading, url } = useScanStore();

    if (loading) return <Skeleton />;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!result) return <div className="text-white">No results available</div>;

    return (
        <section className="flex flex-col items-center justify-center text-white gap-5 p-6">
            <Navbar />
            <div className="flex flex-col text-center items-center justify-center gap-4">
                <div className="flex flex-col gap-6 items-center justify-center text-center">
                    <h1 className="text-white text-lg font-semibold">Your Result</h1>
                    <Circle percentage={result.hireablePercentage} />
                </div>
                <TypingText text={main[0].note} />
            </div>

            <div className="md:grid grid-cols-2 gap-10 items-start justify-center px-[50px] w-full max-w-4xl mt-[20px]">
                {result.feedback.map((category, index) => (
                    <div 
                        key={index}
                        className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors border border-white/20 shadow-lg"
                    >
                        <h2 className="text-xl font-bold mb-4 capitalize text-white">
                            {category.category}
                        </h2>
                        <ul className="space-y-3">
                            {category.items.map((item, itemIndex) => (
                                <li 
                                    key={itemIndex}
                                    className="text-gray-300 text-sm p-3 bg-black/20 rounded-md hover:bg-black/30 transition"
                                >
                                    <TypingText text={item} />
                                    
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <Footer />
        </section>
    );
};

export default Results;