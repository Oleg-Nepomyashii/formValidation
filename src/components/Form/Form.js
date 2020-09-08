import React, {useState} from "react";
import style from "./Form.module.scss"
import InputFile from "../InputFile/InputFile";

import ErrorInput from "../../valitators/ErrorInput";

const Form = () => {
    const [companyName , setCompanyName] = useState('')
    const [peopleCount , setPeopleCount] = useState({
        count: '',
        showError: false,
        text: '',
        isValid: false
    })
    const [businessArea , setBusinessArea]  = useState({
        area: '',
        showError: false,
        text: '',
        isValid: false
    })

    const [description , setDescription]  = useState({
        desc: '',
        showError: false,
        text: '',
        isValid: false
    })

    const handlerNameChange = (e) => {
        e.persist()
        setCompanyName(e.target.value)
    }

    const handlerCountChange = (e) => {
        e.persist()
        setPeopleCount(prev => {
            return {
                ...prev,
                count: e.target.value
            }
        } )
    }

    const handlerAreaChange = (e) => {
        e.persist()
        setBusinessArea(prev => {
            return {
                ...prev,
                area: e.target.value,
                isValid: e.target.value !== '' ? true : false
            }
        } )
    }

    const handlerDescChange = (e) => {
        e.persist()
        setDescription(prev => {
            return {
                ...prev,
                desc: e.target.value,
                isValid: e.target.value !== '' ? true : false
            }
        } )
    }

    const countFocusOut = () => {
        if(peopleCount.count !== '') {
            if( peopleCount.count.length > 2 || Number(peopleCount.count)) {
                setPeopleCount( prev => {return {...prev , showError: true , text: 'Please enter number from 1 to 99'}})
            }
            if(peopleCount.count.length <= 2 && !Number(peopleCount.count)) {
                setPeopleCount( prev => {return {...prev , showError: true , text: 'Please enter number from 1 to 99'}})
            }
            if(peopleCount.count.length <= 2 && Number(peopleCount.count)) {
                setPeopleCount( prev => {return {...prev , showError: false , text: '' , isValid: true}})
            }
        }
    }

    const countFocus = () => {
        if(peopleCount.showError) {
            setPeopleCount( prev => {return {count: '' , showError: false , text: ''}})
        }
    }

    const areaFocus = () => {
        if(businessArea.showError) {
            setBusinessArea( prev => {return {...prev , showError: false , text: ''}})
        }
    }

    const descFocus = () => {
        if(description.showError) {
            setDescription( prev => {return {...prev , showError: false , text: ''}})
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        if(peopleCount.count === '') {
            setPeopleCount( prev => {return {...prev , showError: true , text: 'This field in required'}})
        }
        if(businessArea.area === '') {
            setBusinessArea( prev => {return {...prev , showError: true , text: 'This field in required', isValid: false}})
        }
        if(description.desc === '') {
            setDescription( prev => {return {...prev , showError: true , text: 'This field in required', isValid: false}})
        }

        if(peopleCount.isValid && businessArea.isValid && description.isValid) {
            const data = new FormData(e.target);
            const files = data.getAll('file');
            const dataObj = Array.from(data.entries()).reduce((accum , item) => {
                if(item[0] === 'file') {
                    return accum
                }
                accum[item[0]] = item[1];
                return accum
            }, {})
            if(files[0].name !== '') {
                dataObj.files = files
            }

            setCompanyName('')
            setPeopleCount( prev => {return {...prev ,count: '', isValid: false}})
            setBusinessArea( prev => {return {...prev ,area: '', isValid: false}})
            setDescription( prev => {return {...prev ,desc: '', isValid: false}})
            console.log(dataObj)
        }
    }

    return (
        <div className={style.form_wrapper}>
            <form onSubmit={handleSubmitForm}>
            <div className={style.company}>

                <label
                    className={`${style.company_label} ${style.label_name}`}
                    htmlFor={style.company_name}
                >
                    Your company name
                    <input
                        name='name'
                        type="text"
                        id={style.company_name}
                        className={style.company_input}
                        placeholder='Type text'
                        onChange={handlerNameChange}
                        value={companyName}
                    />
                </label>
                <label
                    className={`${style.company_label} ${style.label_count}`}
                    htmlFor={style.count_people}
                >
                    Number of people <span className={style.red_star}>*</span>
                    <ErrorInput type={peopleCount.text} show={peopleCount.showError}>
                        <input
                            name='count'
                            type="text"
                            id={style.count_people}
                            className={`${style.company_info_input} ${peopleCount.showError ? style.error : ''}`}
                            placeholder='1-99'
                            onChange={handlerCountChange}
                            value={peopleCount.count}
                            onFocus={countFocus}
                            onBlur={countFocusOut}
                        />
                    </ErrorInput>
                </label>
            </div>
            <div className={style.company_area}>
                <label
                    className={style.company_area_label}
                    htmlFor={style.company_location}
                >
                    Business area <span className={style.red_star}>*</span>
                </label>
                <ErrorInput type={businessArea.text} show={businessArea.showError}>
                    <input
                        className={`${style.company_area_input} ${businessArea.showError ? style.error : ''}`}
                        name='area'
                        type="text"
                        id={style.company_location}
                        placeholder='Design, Marketing, Development, etc.'
                        value={businessArea.area}
                        onChange={handlerAreaChange}
                        onFocus={areaFocus}
                    />
                </ErrorInput>
            </div>
            <div className={style.company_desc}>
                <label
                    className={style.company_desc_label}
                    htmlFor="company_description"
                >
                    Description <span className={style.red_star}>*</span>
                    <ErrorInput type={description.text} show={description.showError}>
                    <textarea
                        name='desc'
                        type="text"
                        id="company_description"
                        className={`${style.company_desc_textarea} ${description.showError ? style.error : ''}`}
                        onChange={handlerDescChange}
                        value={description.desc}
                        onFocus={descFocus}
                        placeholder='Type text'
                    > </textarea>
                        </ErrorInput>
                </label>
            </div>
            <InputFile />
            <button className={style.submit_button}>Submit</button>
            </form>
        </div>
    )
}

export default Form