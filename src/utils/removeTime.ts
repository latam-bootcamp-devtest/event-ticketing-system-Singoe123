
const removeTime = (date: Date) => {
    return new Date(date.toISOString().split("T")[0]);
}

export default removeTime;