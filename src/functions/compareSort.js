function compareSort({sortType, sortField, a, b})
{
    if (sortType === "descending")
    {
        return a[sortField] <= b[sortField] ? 1 : -1
    }
    else
    {
        return a[sortField] <= b[sortField] ? -1 : 1
    }
}

export default compareSort