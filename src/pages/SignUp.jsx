import SignLayout from "../layouts/SignLayout"
import TextField from "../components/TextField"
import Button from "../components/Button"
import Validator from "../helpers/validator"
import useFetch from "../hooks/useFetch"
import {useState,useEffect} from "react"
import toast from 'react-hot-toast'
import useInput from "../hooks/useInput"
import SignLink from "../components/SignLink"
import HeaderGroup from "../components/HeaderGroup"
import {useNavigate} from "react-router"

const SignUp = () => 
{
    let navigate = useNavigate()

    const {
        value:nameValue,
        isDisabled:isNameDisabled,
        isValid:isNameValid,
        handleInputChange:handleNameChange,
        handleDisbledStatus:handleNameDisabledStatus,
        setInpuValue:setNameValue
    } = useInput("",false,value=>(!Validator.empty(value)))

    const {
        value:emailValue,
        isDisabled:isEmailDisabled,
        isValid:isEmailValid,
        handleInputChange:handleEmailChange,
        handleDisbledStatus:handleEmailDisabledStatus,
        setInpuValue:setEmailValue
    } = useInput("",false,value=>(Validator.email(value)))

    const {
        value:passwordValue,
        isDisabled:isPasswordDisabled,
        isValid:isPasswordValid,
        handleInputChange:handlePasswordChange,
        handleDisbledStatus:handlePasswordDisabledStatus,
        setInpuValue:setPasswordValue
    } = useInput("",false,value=>(!Validator.empty(value)))

    const [button,setButton] = useState({disabled:false,loading:false})

    const {
        loading:ajaxLoading,
        sendRequest
    } = useFetch()

    const handleSubmit = (event) => {

        event.preventDefault()

        handleNameChange()
        handleEmailChange()
        handlePasswordChange()

        if(isEmailValid && isPasswordValid && isNameValid) {
            
            sendRequest(
                {
                    url:`https://case.nodelabs.dev/api/users/register`,
                    method:"POST",
                    body:{fullName:nameValue,email:emailValue,password:passwordValue}
                },
                response=>{

                    resetForm()

                    if(response.success){
                        toast.success(response.message)
                        navigate("/signin")
                    }
                    else{
                        toast.error(response.message)
                        
                    }
                }
            )
        }
    }

    const loadingForm = (status) => {

        handleNameDisabledStatus(status)
        handleEmailDisabledStatus(status)
        handlePasswordDisabledStatus(status)

        setButton({disabled:status,loading:status})
    }

    const resetForm = () => {

        setNameValue("")
        setEmailValue("")
        setPasswordValue("")
    }

    useEffect(()=>{

        loadingForm(ajaxLoading)
        
    },[ajaxLoading])

    return (
        <SignLayout>
            <div>
                <HeaderGroup 
                    title="Create new account"
                    subTitle="Please enter your details to create an account"
                />
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        id="fullname" 
                        label="Full Name"
                        errorMessage="Please enter your name."
                        type="text"
                        value={nameValue}
                        isValid={isNameValid}
                        onChange={handleNameChange}
                        disabled={isNameDisabled}
                    />
                    <TextField
                        id="email" 
                        label="Email"
                        errorMessage="Please enter a valid email address."
                        type="email"
                        value={emailValue}
                        isValid={isEmailValid}
                        onChange={handleEmailChange}
                        disabled={isEmailDisabled}
                    />
                    <TextField 
                        id="password"
                        label="Password"
                        errorMessage="Please enter a password."
                        type="password"
                        value={passwordValue}
                        isValid={isPasswordValid}
                        onChange={handlePasswordChange}
                        disabled={isPasswordDisabled}
                    />
                    <Button 
                        text="Create Account"
                        type="submit"
                        theme="green"
                        disabled={button.disabled}
                        loading={button.loading}
                    />
                    <Button
                        icon={<img src="/img/google_logo.svg" alt="Google Logo" />} 
                        text="Sign up with google"
                        type="button"
                    />
                    <SignLink 
                        text="Already have an account?"
                        linkText="Sign in"
                        url="/signin"
                    />
                </form>
            </div>
        </SignLayout>
    )
}

export default SignUp