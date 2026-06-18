import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router'
import './protected.scss';

const Protected = ({children}) => {
    const {loading , user} = useAuth()
    const navigate = useNavigate()

    if(loading) {
        return (
            <div className="protected-loading">
                <div className="spinner"></div>
                <h2>Loading your session...</h2>
            </div>
        )
    }

    if(!user)
    {
        return <Navigate to ={"/login"}/>
    }
  return (
    <>{children}</>
  )
}

export default Protected
