

export function QueryMail({ name, email, message }){
    return new Promise((resolve, reject) => {
        fetch('https://us-central1-bina-sohail.cloudfunctions.net/QueryMail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(() => resolve(1))
        .catch(err => reject(err))
    })
}