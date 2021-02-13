import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    const showWhenVisible = { display: isVisible ? '' : 'none' }
    const hideWhenVisible = { display: isVisible ? 'none' : '' }

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <span style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonText}</button>
            </span>
            <span style={showWhenVisible}>
                <button onClick={toggleVisibility}>{props.closeButtonText ? props.closeButtonText : 'cancel'}</button>
                {props.children}
                <button>delete</button>
            </span>
        </>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonText: PropTypes.string.isRequired
}

export default Togglable

