import { useCallback, useState } from "react"


const useHttps = () => {
    const [error, setError] = useState("")
   

    const sendRequest = useCallback(async(obj, returnData) => {
        try{
        const response = await fetch(obj.url,{
            method:obj.method,
            body:JSON.stringify(obj.body),
            headers:obj.headers,
        })
        if(!response.ok){
            throw new Error("something went wrong");
        }
        const data = await response.json();

//       ..........this is fucn calling from here by assingnig data..............
             returnData(data);
    }catch(err){
        alert(err.message)
        setError(err.message)
    }      
    },[])

    return {
       error:error,
       sendRequest:sendRequest,
    }
}

export default useHttps;