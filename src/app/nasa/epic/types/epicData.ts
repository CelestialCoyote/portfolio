interface Position {
    x: number;
    y: number;
    z: number;
}

interface AttitudeQuaternions {
    q0: number;
    q1: number;
    q2: number;
    q3: number;
}

export interface EpicData {
    identifier: string;
    caption: string;
    image: string;
    version: string;
    centroid_coordinates: { lat: number; lon: number };
    dscovr_j2000_position: Position;
    lunar_j2000_position: Position;
    sun_j2000_position: Position;
    attitude_quaternions: AttitudeQuaternions;
    date: string;
    coords: {
        centroid_coordinates: { lat: number; lon: number };
        dscovr_j2000_position: Position;
        lunar_j2000_position: Position;
        sun_j2000_position: Position;
        attitude_quaternions: AttitudeQuaternions;
    };
}