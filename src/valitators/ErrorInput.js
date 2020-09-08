import React from "react";
import style from './ErrorInput.module.scss'

const ErrorInput = ({children , type , show}) => {
    return (
        <div className={style.errorWrapper}>
            <div className={style.distance}>
                {children}
            </div>
            {
                show && <p className={style.validation_error}>{type}</p>
            }

        </div>
    )
}

export default ErrorInput