import ArrowSvg from "../../media/svgs/ArrowSvg"
import PropTypes from "prop-types"

function TableRowItem(props)
{
    const {label, value, sortField, sortType, onFieldClick} = props
    return (
        <div className={`app-table-row-item ${label}`} onClick={onFieldClick ? () => onFieldClick(label) : undefined}>
            {sortField && sortField === label && <ArrowSvg className={`app-table-row-item-sort ${sortType === "descending" ? "reverse" : ""}`}/>}
            {value}
        </div>
    )
}

TableRowItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    sortField: PropTypes.string,
    sortType: PropTypes.string,
    onFieldClick: PropTypes.func,
}

export default TableRowItem