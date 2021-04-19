import TableRow from "./TableRow"
import tableFieldsConstant from "../../constant/tableFieldsConstant"
import data from "../../data/test.json"
import compareSort from "../../functions/compareSort"
import filterByMultiFields from "../../functions/filterByMultiFields"
import {useEffect, useState} from "react"
import PropTypes from "prop-types"
import parseQueryString from "../../functions/parseQueryString"
import setQueryString from "../../functions/setQueryString"

function Table(props)
{
    const {filterFields} = props
    const [starFields, setStarFields] = useState({})
    const [sortField, setSortField] = useState(tableFieldsConstant.defaultSort)
    const [sortType, setSortType] = useState("ascending")

    useEffect(() =>
    {
        const params = parseQueryString()
        if (params.sortField) setSortField(params.sortField)
        if (params.sortType) setSortType(params.sortType)
    }, [])

    useEffect(() =>
    {
        const tempStarFields = localStorage.getItem("starFields")
        if (tempStarFields)
        {
            try
            {
                setStarFields(JSON.parse(tempStarFields))
            }
            catch (e)
            {
                console.log("parsing starts err:", e.message)
            }
        }
    }, [])

    const sortTable = name =>
    {
        if (sortField === name)
        {
            setSortType(sortType === "descending" ? "ascending" : "descending")
        }
        else
        {
            setSortField(name)
            setSortType("ascending")
        }
    }

    useEffect(() =>
    {
        setQueryString({sortField, sortType})
    }, [sortField, sortType])

    const starRow = id =>
    {
        if (starFields[id])
        {
            let tempStarFields = {...starFields}
            delete tempStarFields[id]
            setStarFields(tempStarFields)
        }
        else
        {
            setStarFields({...starFields, [id]: true})
        }
    }

    useEffect(() =>
    {
        localStorage.setItem("starFields", JSON.stringify(starFields))
    }, [starFields])

    return (
        <div className="app-table-scroll">
            <div className="app-table-container">
                <TableRow isTitle
                          data={tableFieldsConstant.visibleFields}
                          onFieldClick={sortTable}
                          sortField={sortField}
                          sortType={sortType}
                />
                {
                    [...data]
                        .sort((a, b) => compareSort({sortType, sortField, a, b}))
                        .filter(item => filterByMultiFields({filterFields, item}))
                        .map(item =>
                            <TableRow key={item.id}
                                      data={item}
                                      onRowClick={starRow}
                                      haveStar={starFields[item.id]}
                            />,
                        )
                }
            </div>
        </div>
    )
}

Table.propTypes = {
    filterFields: PropTypes.object.isRequired,
}

export default Table