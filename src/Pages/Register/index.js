import './register.css'
import axios from 'axios'
import { useState,useEffect } from 'react'
import {useNavigate} from "react-router-dom"

const Register = () => {
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
    const handleRegister = (e) =>{
        e.preventDefault()
        console.log(email,password) 
        const payload = {
            email : email,
            password : password
        }
        axios
        .post("https://reqres.in/api/register", payload)
        .then((res) => setResult(res.data.token))
        .catch((err) => console.log(err))
    }
    useEffect(()=> {
        const checkIfLogin = () => {
            const token = localStorage.getItem("Token")
            if(!token) return
            navigate("/dashboard")
        }
        checkIfLogin();
    })
    return (
        <div className="form-register">
            <div>
                <h1>Welcome, Admin BCR </h1>
                <h1>Register</h1>
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
                onClick={handleRegister}
                >
                Signin
                </button>
                {
                    !!result.length && 
                    (<div>
                        <h1>Berhasil</h1>
                        <h1>Register !!!</h1>
                        {result}
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default Register