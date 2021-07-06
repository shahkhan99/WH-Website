import React from 'react';
import { Redirect,Route } from 'react-router-dom';
import { CurrentUser } from '../Services/Auth-Service';



const ProtectedRoute = ({path,component:Component,render,...rest }) => {
    
    return (
        <Route
            path={path}
            {...rest}
            render={ props => {

                const user = CurrentUser();
                console.log(CurrentUser())

                if (!user) {
                    return <Redirect to='/@dm!n/login'/>
                }else {
                    return Component ? <Component {...props}/> :render(props)
                }
                
            }}>
        </Route>
    );
}
 
export default ProtectedRoute;