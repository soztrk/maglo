import {useState,useCallback} from "react"

const useFetch = () => {

    const [loading,setLoading] = useState(null)

    const sendRequest = useCallback(async (config,callback) => {

        setLoading(true)

        try{
        
            let headers = {}

            headers["Content-Type"] = "application/json"

            if(config.apiKey) headers["Authorization"] = "Bearer "+config.apiKey

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
            console.log(error);
        }

        setLoading(false)

    },[loading])

    return {
        loading,
        sendRequest
    }
}
export default useFetch