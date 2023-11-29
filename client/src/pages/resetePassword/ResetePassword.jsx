import React, { useState } from 'react'
import './style.css'
import { sendPasswordResetEmail } from 'firebase/auth'
import {auth } from '../../firebase-config'

const ResetePassword = () => {
    const [emailVal , setEmailVal] = useState('')
    const resete = ()=> {
        sendPasswordResetEmail(auth,emailVal).then(
            ()=>{
                alert('Check your email')
            }
        )
        .catch(
            (err)=>{
                throw err
            }
        )
    }
    const notRefresh = (e)=> {
        e.preventDefault()
    }

  return (
    <div className='midd'>
        <div class="form-container">
      <div class="logo-container">
        Forgot Password
      </div>

      <form class="form" onSubmit={notRefresh}>
        <div class="form-group">
          <label for="email">Email</label>
          <input onChange={(e)=>{setEmailVal(e.target.value)}} type="text" id="email" name="email" placeholder="Enter your email" required=""/>
        </div>

        <button class="form-submit-btn" type="submit" onClick={resete}>Send Email</button>
      </form>

      <p class="signup-link">
        Don't have an account?
        <a class="signup-link link"> Sign up now</a>
      </p>
    </div>
    </div>
  )
}

export default ResetePassword