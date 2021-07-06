
import React from 'react'

import {db} from './config'
import {appendSpreadsheet,academyEmail} from '../../src/components/AcademyRegister/googlesheet'

export const registerForm=(name,course,email,phone,history)=>
{
    const rxEmail = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email)
    
    if ((!name || !course || !email  ||!phone)) {
        alert(
          'Please fill all required field',
        )}
    else if(!rxEmail)
    {
        alert(
            'Please enter valid email address',
          )
    }
        
        else{
    db.ref(`register/students`).push({
        name: name,
        course:course,
        email:email,
        phone:phone,
        
    }
    ).then((success)=>{
        // alert('Successfully Register')
        if(success){
            window.open('/payment','_self')

       }}
    )
    .then(
        appendSpreadsheet({Name:name,Email:email,Phone:phone,Course:course})
    )
    .then(
        academyEmail(name,email,course)
    )
}
}