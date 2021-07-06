import firebase from '../backend/config';
import JWTDecode from 'jwt-decode';



export const CurrentUser = () => {
    const data = localStorage.getItem('Studio-Auth-Token');

    try {
        return JWTDecode(data).user_id;
    }
    catch(ex){
        return null
    }
}

export const Login = ({ email, password }) => {
    return new Promise((resolve, reject) => {

        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(res => {                
                res.user.getIdToken().then(token => {
                    localStorage.setItem('Studio-Auth-Token', token);
                    resolve(res.user.uid);
                })
            })
            .catch(err => reject(err.message) )

    })    
}

export const Logout = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(() => {
            localStorage.removeItem('Studio-Auth-Token')
            resolve(true);
        })
    })    
}