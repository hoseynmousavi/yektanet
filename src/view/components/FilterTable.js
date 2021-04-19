import tableFieldsConstant from "../../constant/tableFieldsConstant"
import FilterInput from "./FilterInput"
import PropTypes from "prop-types"

function FilterTable(props)
{
    const {filterFields, filterField} = props
    return (
        <div className="app-filter-bar">
            {
                Object.keys(tableFieldsConstant.filterFields).map(item =>
                    <FilterInput key={item}
                                 label={tableFieldsConstant.filterFields[item]}
                                 name={item}
                                 onFilterChange={filterField}
                                 defaultValue={filterFields[item]}
                    />,
                )
            }
        </div>
    )
}

FilterTable.propTypes = {
    filterFields: PropTypes.object.isRequired,
    filterField: PropTypes.func.isRequired,
}

export default FilterTable