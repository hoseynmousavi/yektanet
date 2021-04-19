import PropTypes from "prop-types"
import Material from "./Material"
import TableRowItem from "./TableRowItem"
import tableFieldsConstant from "../../constant/tableFieldsConstant"

function TableRow(props)
{
    const {isTitle, data, onFieldClick, onRowClick, sortField, sortType, haveStar} = props
    const {id} = data || {}
    return (
        <Material className={`app-table-row ${isTitle ? "title" : ""}`} onClick={onRowClick ? () => onRowClick(id) : undefined}>
            {haveStar && <div className="app-table-row-star">*</div>}
            {
                Object.keys(data).map(item =>
                    tableFieldsConstant.visibleFields[item] && <TableRowItem key={item} label={item} value={data[item]} onFieldClick={onFieldClick} sortField={sortField} sortType={sortType}/>,
                )
            }
        </Material>
    )
}

TableRow.propTypes = {
    isTitle: PropTypes.bool,
    data: PropTypes.shape({
        name: PropTypes.string,
        date: PropTypes.string,
        title: PropTypes.string,
        field: PropTypes.string,
        old_value: PropTypes.any,
        new_value: PropTypes.any,
    }).isRequired,
    onFieldClick: PropTypes.func,
    onRowClick: PropTypes.func,
    sortField: PropTypes.string,
    sortType: PropTypes.string,
    haveStar: PropTypes.bool,
}

export default TableRow