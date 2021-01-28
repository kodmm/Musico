import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import axios from 'axios';
const Login = () => {

    const history = useHistory();


    const signIn = async() => {
        fetch('/api/auth/google')
        .then(res => {
            const currentCustomer = res.data;
            console.log(currentCustomer);
            history.push('/users');
        })
        const currentCustomer = await history.push('/api/auth/google');
        console.log(currentCustomer);
        history.push('/users');
        
    }



    return (
        <GoogleButton
            onClick={signIn}
        />
    )
}

export default Login;