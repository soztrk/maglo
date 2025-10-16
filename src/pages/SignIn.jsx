import SignLayout from "../layouts/SignLayout"
import TextField from "../components/TextField"
import Button from "../components/Button"
import Validator from "../helpers/validator"
import useFetch from "../hooks/useFetch"
import {useState,useEffect,useContext} from "react"
import toast from 'react-hot-toast'
import useInput from "../hooks/useInput"
import SignLink from "../components/SignLink"
import HeaderGroup from "../components/HeaderGroup"
import {useNavigate} from "react-router"
import {setAccessToken} from "../system/auth"
import UserContext from "../context/userContext"

const SignIn = () => {

    let navigate = useNavigate()

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

    const {setUser} = useContext(UserContext)

    const handleSubmit = (event) => {

        event.preventDefault()

        handleEmailChange()
        handlePasswordChange()

        if(isEmailValid && isPasswordValid) {
            
            sendRequest(
                {
                    url:`https://case.nodelabs.dev/api/users/login`,
                    method:"POST",
                    body:{email:emailValue,password:passwordValue}
                },
                response=>{

                    resetForm()

                    if(response.success){
                        toast.success(response.message)
                        setAccessToken(response.data.accessToken)
                        setUser(response.data.user)
                        navigate("/")
                    }
                    else{
                        toast.error(response.message)
                        
                    }
                }
            )
        }
    }

    const loadingForm = (status) => {

        handleEmailDisabledStatus(status)
        handlePasswordDisabledStatus(status)
        setButton({disabled:status,loading:status})
    }

    const resetForm = () => {

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
                    title="Sign In"
                    subTitle="Welcome back! Please enter your details"
                />
                <form onSubmit={handleSubmit} noValidate>
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
                        text="Sign In"
                        type="submit"
                        theme="green"
                        disabled={button.disabled}
                        loading={button.loading}
                    />
                    <Button
                        icon={<img src="/img/google_logo.svg" alt="Google Logo" />} 
                        text="Sign in with google"
                        type="button"
                    />
                    <SignLink 
                        text="Don’t have an account?"
                        linkText="Sign up"
                        url="/signup"
                    />
                </form>
            </div>
        </SignLayout>
    )
}

export default SignIn