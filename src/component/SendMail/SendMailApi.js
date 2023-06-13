
export const deleteSendMail = async({email,id}) => {
    console.log(id,"id")
    try {
        const response = await fetch(`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}send/${id}.json`,{
            method:"DELETE"
        })

        if (!response.ok) {
            throw new Error("something went wrong");
        }
        return await response.json() || id;
    } catch (err) {
        console.log(err)
    }
}
export  const fetchSendMail  = async(email) => {
    const response = await fetch(`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}.json`); 
            const data = await response.json();
            const arr = []
            for (let key in data) {
                arr.push({
                    id: key,
                    text: data[key].text,
                    to: data[key].to,
                    subject: data[key].subject,
                    isRead: data[key].isRead,
                    date:data[key].date,
                })
            }
            return arr;
}