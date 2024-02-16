import React, { useEffect, useState } from "react";

function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');


    const getCookie = (name) =>{
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    useEffect(
        ()=>{
            const tokenFromCookie = getCookie('token');
            if (tokenFromCookie){
                setToken(tokenFromCookie)
            }
        },[]
    );

    const handleLogin = (token) => {
        setToken(token);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ username, password })
        })

        const tokenjson = await response.json();
        console.log(tokenjson)
        setToken(tokenjson.token)

        document.cookie = `token=${tokenjson.token};path=/`;

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit" >Submit</button>
            </form>

            <div>
                |<h1>Login status</h1>
                {
                    token ? (<div><h1>You r loggedin</h1><p>Token: {token}</p></div>) : null
                }
            </div>
        </>
    )

}
export default LoginComponent