import React from "react";
import style from './ololo.module.scss'

const Ololo = ({children , type , show}) => {
    console.log(type)
    return (
        <>
            <div className={`${show ? style.error : ''} ${style.kokoko}`}>
                {children}
            </div>
            {
                show && <p className="validation_error">{type}</p>
            }

        </>
    )
}

export default Ololo