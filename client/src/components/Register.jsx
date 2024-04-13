import { useState } from "react";
import useToken from '../useToken.js'
import { postToEndPoint} from "../api.js";

export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [token,setToken] = useToken()
    // const token = useContext(TokenContext)
    async function handleSubmit(e) {
        e.preventDefault();



        const userResponse = await postToEndPoint('users/register',{
            email: username,
            password
        })
        setToken(userResponse.token);

    }
    


    return (
        <form method="post" onSubmit={handleSubmit}>
            REGISTER NOW
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