import parseQueryString from "./parseQueryString"

function setQueryString(items)
{
    const preParams = parseQueryString()
    const params = {...preParams, ...items}
    let query = "?"
    Object.keys(params).forEach(item =>
    {
        query += `${item}=${params[item]}&`
    })
    window.history.replaceState("", "", document.location.pathname + query.substring(0, query.length - 1))
}

export default setQueryString