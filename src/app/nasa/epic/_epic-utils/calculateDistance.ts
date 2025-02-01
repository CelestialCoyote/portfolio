export const calculateDistance = (vector: { x: number, y: number, z: number }) => {
    return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
}