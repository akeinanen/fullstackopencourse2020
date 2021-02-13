import React from 'react'

const Notification = ({eventMessage, errorMessage}) => {
    if(eventMessage === null && errorMessage === null) {
        return (
            null
        )
    }

    if(eventMessage !== null) {
        return(
            <div className="notification">
                <p>{eventMessage}</p>
            </div>
        )
    }

    if(errorMessage !== null) {
        return( 
            <div className="error">
                <p>{errorMessage}</p>
            </div>
        )
    }
}
export default Notification