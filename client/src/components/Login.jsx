import { useState, useEffect } from "react";
import useToken from '../useToken.js'
import { useNavigate } from "react-router-dom";
import { postToEndPoint, API_URL } from "../api.js";

export default function Login () {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [token, setToken] = useToken()
    // const token = useContext(TokenContext)
    async function handleSubmit(e) {
        e.preventDefault();

        const userResponse = await postToEndPoint('users/login', {
            email: username,
            password
        })
        setToken(userResponse.token);
        console.log(userResponse.token)
    }

    useEffect(() => {
        if (token){
            navigate('/')
        }
    }, [token])


    return (
        <form method="post" onSubmit={handleSubmit}>
            PLEASE LOGIN
            <label>Username:</label>
            <input type="text" name="username" value={username}
                onChange={(e) => { setUsername(e.target.value) }} />
            <label>Password:</label>
            <input type="text" name="password" value={password}
                onChange={(e) => { setPassword(e.target.value) }} />
            <input type="submit" value="Submit" />
            <div className="spacer"></div>
        </form>
        
    )
}