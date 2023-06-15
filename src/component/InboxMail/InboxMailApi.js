export const deleteInboxMail = async ({ email, id }) => {
    try {
        const response = await fetch(`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}/${id}.json`, {
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


export const fetchInboxMail = async (email) => {
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


export const updateInboxMail = async ({ email, id }) => {
    try {
        const response = await fetch(`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}/${id}.json`, {
            method: "PATCH",
            body: JSON.stringify({ isRead: false }),
            headers: {
                "Content-Type": "appliction/json"
            }
        })

        if (!response.ok) {
            throw new Error("something went wrong");
        }
        await response.json();
        return id;
    } catch (err) {
        console.log(err)
    }
}