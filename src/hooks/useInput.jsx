import {useState} from "react"

const useInput = (defaultValue,defaultDisabledStatus,validationFn) => {

    const [enteredValue,setEnteredValue] = useState(defaultValue)
    const [enteredValid,setEnteredValid] = useState(null)
    const [disabledStatus,setDisabledStatus] = useState(defaultDisabledStatus)

    const handleInputChange = (event) => {
        const value = event ? event.target.value : enteredValue
        setEnteredValue(value)
        setEnteredValid(validationFn(value)) 
    }
    
    const handleDisbledStatus = (status) => {
        setDisabledStatus(status)
    }

    const setInpuValue = (value) => {
        setEnteredValue(value)
    }

    return {
        value:enteredValue,
        isValid:enteredValid,
        isDisabled:disabledStatus,
        handleInputChange,
        handleDisbledStatus,
        setInpuValue
    }
}

export default useInput