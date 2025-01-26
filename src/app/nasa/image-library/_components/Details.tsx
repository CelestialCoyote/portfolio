import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NasaImageData } from "../interfaces/NasaImageInterfaces";


interface DetailsProps {
	image: {
		links: { href: string }[];
		data: NasaImageData[]; // Use the NasaImageData interface for data
		keywords?: string[];
	};
	setDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const Details: React.FC<DetailsProps> = ({ image, setDetails }) => {
	return (
		<div className="flex flex-col bg-slate-600 rounded-2xl m-2">
			<div className="flex gap-6">
				<div className="flex w-1/2 items-center p-6">
					<Image
						className="w-full h-auto rounded-xl"
						src={image.links[0].href}
						alt="thumbnail"
						placeholder="blur"
						blurDataURL={image.links[0].href}
						width="0"
						height="0"
						sizes="100vh"
					/>
				</div>

				<div className="flex flex-col w-1/2 overflow-hidden p-6">
					<div className="text-2xl font-bold">
						{image.data[0].title}
					</div>

					<div className="mt-4 mb-2">
						{image.data[0].date_created.slice(0, 10)}
					</div>

					<hr className="pt-1 pb-2 border-gray-900" />

					<div className="flex flex-col gap-2">
						<div>
							<p className='inline text-lg text-gray-400'>
								Keywords:
							</p>
							<div className='inline'>
								{image?.keywords?.map((keyword: string, index: number) => (
									<Link href={`/images?q=${keyword}`} key={index}>
										<a className='text-lg rounded-md cursor-pointer text-primary-light hover:underline'>
											{keyword},{' '}
										</a>
									</Link>
								))}
							</div>
						</div>
						<div className="">
							<div>
								<p className="inline text-lg text-gray-400">
									Secondary Creator:{' '}
								</p>
								<p className='inline'>
									{image.data[0].secondary_creator}
								</p>
							</div>
						</div>

						<div>
							<p className='inline text-lg text-gray-400'>
								NASA ID:
							</p>
							<p className='inline'>
								{image.data[0].nasa_id}
							</p>
						</div>

						<div>
							<p className='inline text-lg text-gray-400'>
								Center:
							</p>
							<p className='inline'>
								{image.data[0].center}
							</p>
						</div>

					</div>

					<hr className='pt-1 pb-2 border-gray-900' />

					<div className="overflow-y-scroll no-scrollbar break-words">
						{image.data[0].description}
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-6 mb-6">
				<button
					className="border-2 w-36 p-2 rounded-xl"
					onClick={() => {
						setDetails(false);
					}}
				>
					Back to Search
				</button>
			</div>
		</div>
	);
}

export default Details;