import React from 'react'
import style from './HeaderForm.module.scss'

const HeaderForm = () => {
    return (
        <div>
            <h1 className={style.title}> Your first project</h1>
            <div className={style.steps_wrapper}>
                <div className={style.step}>1</div>
                <div className={style.steps_wrapper_line}> </div>
                <div className={style.step}>2</div>
                <div className={style.steps_wrapper_line}> </div>
                <div className={`${style.step}  ${style.step_active}`}>3</div>
            </div>
        </div>
    )
}

export default HeaderForm
