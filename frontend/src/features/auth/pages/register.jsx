import React from 'react'
import "./auth.register.scss"
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const { handleRegister } = useAuth()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setIsSubmitting(true)

        try {
            await handleRegister({ username, email, password })
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main>
            <div className='form-container'>
                <h1>Register</h1>

                <form onSubmit={handleSubmit} className='registerForm'>
                    {error && <div className="error-message">{error}</div>}

                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id='email' name='email' placeholder='Enter your email' required />

                    <label htmlFor="username">Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" id='username' name='username' placeholder='Enter your username' required />

                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" id='password' name='password' placeholder='Enter a password' required />

                    <button type="submit" className='registerButton' disabled={isSubmitting}>
                        {isSubmitting ? "Registering..." : "Submit"}
                    </button>

                    <p className="auth-link">
                        Already have an account? <Link to={"/login"}>Login</Link>
                    </p>
                </form>
            </div>
        </main>
    )
}

export default Register
