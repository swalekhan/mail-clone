import { useCallback, useState } from "react"


const useHttps = () => {
    const [error, setError] = useState("")

    const sendRequest = useCallback(async (obj) => {
        try {
            const response = await fetch(obj.url, {
                method: "POST",
                body: JSON.stringify(obj.body),
                Headers: { "Content-Type": "application/json" },
            })
            if (!response.ok) {
                throw new Error("something went wrong");
            }
            //       ..........this function is calling from here by assingnig data in argument which will exist in component..............
            return await response.json();
        } catch (err) {
            setError(err.message)
        }
    }, [])

    const fetchData = useCallback(async (obj) => {
        try {
            setError(true)
            const response = await fetch(obj)
            if (!response.ok) {
                throw new Error("something went wrong");
            }
            //       ..........this function is calling from here by assingnig data in argument which will exist in component..............
            const data = await response.json();
            setError(false)
            return data

        } catch (err) {
            setError(err.message)
            setError(false)
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
            console.log(data, "delete")
        } catch (err) {
            alert(err.message, "delete")
        }
    }, [])


    const putRequest = useCallback(async (obj) => {
        try {
            const putRes = await fetch(obj.url, {
                method: "PUT",
                body: JSON.stringify(obj.body)
            })
            if (!putRes.ok) {
                throw new Error("something went wrong in put request")
            }
            const putData = await putRes.json();
            console.log(putData);
        } catch (err) {
            alert(err.message, "put")
        }
    }, [])


    return {
        error,
        sendRequest,
        deleteRequest,
        putRequest,
        fetchData,
    }
}

export default useHttps;