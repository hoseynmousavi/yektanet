import Table from "./view/components/Table"
import {useEffect, useState} from "react"
import FilterTable from "./view/components/FilterTable"
import parseQueryString from "./functions/parseQueryString"
import setQueryString from "./functions/setQueryString"

function App()
{
    const [filterFields, setFilterFields] = useState({})

    useEffect(() =>
    {
        const params = parseQueryString()
        if (params.filterFields)
        {
            try
            {
                setFilterFields(JSON.parse(params.filterFields))
            }
            catch (e)
            {
                console.log("parsing filters err:", e.message)
            }
        }
    }, [])

    const filterField = ({name, value}) =>
    {
        if (value)
        {
            setFilterFields({...filterFields, [name]: value})
        }
        else
        {
            let tempFilterFields = {...filterFields}
            delete tempFilterFields[name]
            setFilterFields(tempFilterFields)
        }
    }

    useEffect(() =>
    {
        setQueryString({filterFields: JSON.stringify(filterFields)})
    }, [filterFields])

    return (
        <div className="app-container">
            <FilterTable filterFields={filterFields} filterField={filterField}/>
            <Table filterFields={filterFields}/>
        </div>
    )
}

export default App