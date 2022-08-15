import './login.css'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"

const Login = ({setLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [result, setResult] = useState([])
    const navigate = useNavigate();

    const handleEmail = (e) =>{
        // console.log(e.target.value)
        setEmail(e.target.value)
    }
    const handlePassword = (e) =>{
        // console.log(e.target.value)
        setPassword(e.target.value)
    }
    const handleLogin = (e) =>{
        e.preventDefault()
        console.log(email,password) 
        const payload = {
            email : email,
            password : password
        }
        axios
        .post("https://reqres.in/api/login", payload)
        .then((res) => 
            {
                setResult(res.data.token)
                localStorage.setItem('Token', res.data.token);
                setLogin(true);
                navigate('/dashboard')
            })
        .catch((err) => console.log(err))
        
    }
    return (
        <div className="form-register">
            <div>
                <h1>Welcome, Admin BCR </h1>
                <h1>Login</h1>
                <div>
                    <p>Email</p>
                    <input 
                    onChange={(e)=>handleEmail(e)}
                    placeholder="Contoh: johndee@gmail.com"></input>
                    <p>Password</p>
                    <input 
                    onChange={(e)=>handlePassword(e)}
                    placeholder="6+ karakter"
                    type={"text"}
                    ></input>
                </div>
                <button
                onClick={handleLogin}
                >
                Login
                </button>
                {
                    !!result.length && 
                    (<div>
                        <h1>Berhasil</h1>
                        <h1>Login !!!</h1>
                        <h1>Token anda {result}</h1>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default Login