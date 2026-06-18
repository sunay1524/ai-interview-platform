import React from 'react'
import "./auth.register.scss"
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const register = () => {

    const navigate = useNavigate()
    const { loading, handleRegister } = useAuth()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await handleRegister({ username, email, password })
            navigate("/");
        }
        catch (err) {
            console.log(err.response?.data?.message);
        }
    }

    if (loading) {
        return <h1 className="loading" > Loading ..... </h1>
    }


    return (

        <main>

            <div className='form-container'>
                <h1>Register</h1>

                <form onSubmit={handleSubmit} className='registerForm'>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id='email' name='email' placeholder='Enter your email ' />


                    <label htmlFor="username">Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" id='username' name='username' placeholder='Enter your username' />

                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" id='password' name='password' placeholder='Enter a password' />

                    <button className='registerButton'>Submit</button>

                    <p className="auth-link">
                        Already have an account? <Link to={"/login"}>Login</Link>
                    </p>

                </form>




            </div>
        </main>
    )
}

export default register
