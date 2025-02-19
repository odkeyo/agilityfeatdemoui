export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const formatDateTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatDateForInput = (date: string | Date | undefined | null): string => {
    console.log(date);
    if (!date) return "";
    
    if (typeof date === "string" && date.length === 10) {
        date = `${date}T00:00`;
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "";

    return formatDate(parsedDate);
};
