import Image from "next/image";
import technologiesData from "./technologies.json";


const Technologies:React.FC = () => {
    return (
        <section className="flex flex-col w-full items-center">
            <h1 className="text-2xl mb-8">
                My Technologies:
            </h1>

            {technologiesData.map((category, categoryIndex) => (
                <div key={categoryIndex} className="w-full mb-8">
                    <h2 className="text-lg font-bold mb-4 text-center">
                        {category.category}
                    </h2>
                    
                    <div className="flex flex-wrap bg-slate-500 justify-center w-3/4 rounded-xl gap-x-10 gap-y-20 p-6 mx-auto">
                        {category.items.map((tech, key) => (
                            <div key={key}>
                                <div className="w-[100px] h-[100px]">
                                    <Image
                                        className="w-full h-full"
                                        src={tech.src}
                                        alt={tech.alt}
                                        width={500}
                                        height={500}
                                        priority
                                    />
                                </div>
                                <div className="flex justify-center text-black mt-2">
                                    {tech.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Technologies;
