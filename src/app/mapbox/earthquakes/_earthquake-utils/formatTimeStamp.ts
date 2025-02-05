// export const formatTimestamp = (timestamp: number): string => {
//     const date = new Date(timestamp);

//     return date.toLocaleString(undefined, {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         timeZoneName: "short",
//     });
// }


export const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    
    return {
        date: date.toISOString().split("T")[0], // YYYY-MM-DD format
        time: date.toISOString().split("T")[1].replace("Z", " UTC"), // HH:MM:SS.sss UTC
    };
}
