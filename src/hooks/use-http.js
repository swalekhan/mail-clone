import { useCallback, useState } from "react"


const useHttps = () => {
    const [error, setError] = useState("")

    const sendRequest = useCallback(async (obj, returnData) => {
        try {
            const response = await fetch(obj.url, {
                method: obj.method,
                body: JSON.stringify(obj.body),
                headers: obj.headers,
            })
            if (!response.ok) {
                throw new Error("something went wrong");
            }
            const data = await response.json();

 //       ..........this function is calling from here by assingnig data in argument which will exist in component..............
            returnData(data);
        } catch (err) {
            alert(err.message)
            setError(err.message)
        }
    }, [])

  

    const deleteRequest = useCallback(async (obj) => {
        try {
            const response = await fetch(obj.url, {
                method: obj.method,
            })
            if (!response.ok) {
                throw new Error("something went wrong");
            }
            const data = await response.json();
            console.log(data)
        } catch (err) {
            alert(err.message)
        }
    }, [])
   
        const putRequest = useCallback(async(obj) =>{
            try{
            const putRes = await fetch(obj.url,{
                method:"PUT",
                body:JSON.stringify(obj.body)
            })
            if(!putRes.ok){
                throw new Error("something went wrong in put request")
            }
            const putData = await putRes.json();
            console.log(putData);
        }catch(err){
            alert(err.message)
        }
        },[])


    return {
        error: error,
        sendRequest: sendRequest,
        deleteRequest:deleteRequest,
        putRequest:putRequest,
    }
}

export default useHttps;