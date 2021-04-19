import PropTypes from "prop-types"
import {useEffect, useRef} from "react"

function FilterInput(props)
{
    const {label, name, onFilterChange, defaultValue} = props
    const inputEl = useRef(null)
    let typeTimeout

    const handleChange = e =>
    {
        clearTimeout(typeTimeout)
        typeTimeout = setTimeout(() =>
        {
            onFilterChange({name, value: e.target.value.trim()})
        }, 300)
    }

    useEffect(() =>
    {
        if (defaultValue && inputEl.current.value !== defaultValue)
        {
            inputEl.current.value = defaultValue
        }
    }, [defaultValue])

    return (
        <div className="app-input-container">
            <label className="app-input-label">{label}</label>
            <input className="app-input" ref={inputEl} onChange={handleChange}/>
        </div>
    )
}

FilterInput.propTypes = {
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
}

export default FilterInput