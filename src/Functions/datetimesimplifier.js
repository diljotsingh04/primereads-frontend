export const dateTimeSimplifier = (isoDateString) => {
    
    const date = new Date(isoDateString);

    const dateOptions = {
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    };
    
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // Use AM/PM format
    };

    const formattedDate = date.toLocaleDateString('en-US', dateOptions); 
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions); 

    return `${formattedDate} at ${formattedTime}`
}

export const dateSimplifier = (isoDateString) => {
    
    const date = new Date(isoDateString);

    const dateOptions = {
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    };
    

    const formattedDate = date.toLocaleDateString('en-US', dateOptions); 

    return `${formattedDate}`
}