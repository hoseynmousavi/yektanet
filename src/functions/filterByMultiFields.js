function filterByMultiFields({filterFields, item})
{
    let appear = true
    for (let i = 0; i < Object.keys(filterFields).length; i++)
    {
        appear = item[Object.keys(filterFields)[i]].includes(Object.values(filterFields)[i])
        if (!appear) break
    }
    return appear
}

export default filterByMultiFields