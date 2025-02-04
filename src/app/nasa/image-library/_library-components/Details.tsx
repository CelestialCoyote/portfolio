import React from "react";
import Image from "next/image";
import { NasaItem } from "../types/nasa";


interface DetailsProps {
	image: NasaItem;
	setDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const Details: React.FC<DetailsProps> = ({ image, setDetails }) => {
	return (
		<div className="flex flex-col bg-black border-purple-500 border-2 rounded-2xl m-2">
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

					<div className="flex flex-col gap-2 mb-2">
						<div className="flex flex-col">
							<p className="text-gray-400">
								Keywords:
							</p>

							<div className="flex space-x-1">
								{image?.data[0].keywords?.map((keyword: string, index: number) => (
									<p key={index}>
										{keyword},{' '}
									</p>
								))}
							</div>
						</div>

						<div className="flex flex-col">
							<p className="text-gray-400">
								Secondary Creator:{' '}
							</p>

							<p>
								{image.data[0].secondary_creator}
							</p>
						</div>

						<div className="flex flex-col">
							<p className="text-gray-400">
								NASA ID:
							</p>

							<p>
								{image.data[0].nasa_id}
							</p>
						</div>

						<div className="flex flex-col">
							<p className="text-gray-400">
								Center:
							</p>

							<p>
								{image.data[0].center}
							</p>
						</div>
					</div>

					<hr className="pt-1 pb-2 border-gray-900" />

					<div className="overflow-y-scroll no-scrollbar break-words">
						{image.data[0].description}
					</div>
				</div>
			</div>

			<div className="flex justify-center mt-4 mb-4">
				<button
					className="flex justify-center items-center bg-black text-white font-bold w-[170px] gap-x-2 border-purple-500 border-2 rounded-lg p-2 hover:bg-purple-700"
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
