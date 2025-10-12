import {useState,useCallback} from "react"

const useFetch = () => {

    const [loading,setLoading] = useState(null)

    const sendRequest = useCallback(async (config,callback) => {

        setLoading(true)

        try{
        
            let headers = {}

            headers["Content-Type"] = "application/json"
            if(config.xsrf) headers["X-XSRF-TOKEN"] = config.xsrf

            const response = await fetch(config.url,{
                method:config.method ? config.method : "GET",
                headers,
                credentials: config.credentials === undefined ? 'include' : config.credentials,
                body:config.file ? config.body : JSON.stringify(config.body)
            })

            const data = await response.json()

            if(callback) {
                callback(data)
            }


        } catch(error)
        {
            setMessage("An error occurred. Please try again later.")
        }

        setLoading(false)

    },[loading])

    return {
        loading,
        sendRequest
    }
}
export default useFetch