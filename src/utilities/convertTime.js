
export default function fromUnixToDate(unix){


        const timestampMillis = unix * 1000;

        // Create a new Date object using the timestamp
        const date = new Date(timestampMillis);

        // Get the components of the date
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Format the date components as desired (e.g., MM/DD/YYYY HH:MM:SS)
        const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

        //console.log(formattedDate);

        return formattedDate;


}