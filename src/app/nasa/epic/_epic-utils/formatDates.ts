export const formatDateShort = (dateString: string) => {
    const date = new Date(dateString + 'Z'); // Ensure it's treated as UTC
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const formatDateLong = (dateString: string) => {
    const date = new Date(dateString + 'Z'); // Ensure it's treated as UTC

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
        timeZoneName: "short"
    }).format(date);
}