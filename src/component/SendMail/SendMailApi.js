
export const deleteSendMail = async ({ email, id }) => {
    try {
        const response = await fetch(`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}send/${id}.json`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error("something went wrong");
        }
        return await response.json() || id;
    } catch (err) {
        console.log(err)
    }
}

export const fetchSendMail = async (email) => {
    const response = await fetch(`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}.json`);
    const data = await response.json();
    const arr = []
    for (let key in data) {
        arr.push({
            id: key,
            editor: data[key].editor,
            to: data[key].to,
            subject: data[key].subject,
            isRead: data[key].isRead,
            date: data[key].date,
        })
    }
    return arr;
}


export const postSendMail = async ({ email, data }) => {
    try {
        const response = await fetch(`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}send.json`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const id = await response.json()
        return {...data,id:id.name}
    } catch (err) {
        console.log(err)
    }
}