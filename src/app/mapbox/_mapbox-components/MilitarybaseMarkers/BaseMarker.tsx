import React from "react";
import Image from "next/image";
import { MapRef, Marker } from "react-map-gl";


type Properties = {
	installation: string;
	branch: string;
	state: string;
	jointBase: boolean | null;
	locationLat: string;
	locationLong: string;
	STATEFP: string;
	NAME: string;
	STUSPS: string;
	zip_codes: string[];
};

// Define the types for the GeoJSON data and its structure
type Geometry = {
	type: "Point";
	coordinates: [number, number];
}

type Feature = {
	type: "Feature";
	geometry: Geometry;
	properties: Properties;
}

type GeoJSONData = {
	type: "FeatureCollection";
	features: Feature[];
}

// Props type definition for BaseMarker component
type BaseMarkerProps = {
	mapRef: React.RefObject<MapRef | null>;
	data: GeoJSONData;
	imagePath: string;
	setSelectedBase: (base: Feature) => void;
	setHoveredBase: (base: Feature | null) => void;
}

const BaseMarker: React.FC<BaseMarkerProps> = ({
	mapRef,
	data,
	imagePath,
	setSelectedBase,
	// setSelectedArea,
	setHoveredBase,
}) => {
	return (
		<>
			{data?.features?.map((base: Feature, index: number) => (
				<Marker
					key={index}
					latitude={base.geometry.coordinates[1]}
					longitude={base.geometry.coordinates[0]}
					onClick={(event) => {
						event.originalEvent.stopPropagation();
						setSelectedBase(base);

						mapRef.current?.flyTo({
							center: [base.geometry.coordinates[0], base.geometry.coordinates[1]],
							zoom: 9,
							duration: 4000,
						});
					}}
				>
					<Image
						className="w-6 h-6 object-contain"
						src={imagePath}
						alt="Branch Icon"
						placeholder="blur"
						blurDataURL={imagePath}
						width={0}
						height={0}
						sizes="100vh"
						onMouseEnter={() => setHoveredBase(base)}
						onMouseLeave={() => setHoveredBase(null)}
					/>
				</Marker>
			))}
		</>
	);
}

export default BaseMarker;
