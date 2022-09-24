import React from 'react'
import { useState } from 'react';
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../firebase/firebase'

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function onFormSubmit(e){
        e.preventDefault();
        setLoading(true);

        try{
            const userCred = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch (err){
            alert(err.message);
        }
        setLoading(false);
    }

  return (
    <div className='white-background d-flex justify-content-center align-items-center'>
        <div className='card border-0 p-3'>
            <h2>Login</h2>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3">
                    <div>Email:</div>
                    <input type="email" className="form-control" placeholder='abc@rice.edu' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <div>*We prefer Rice GMail account.</div>
                </div>
                <div className="mb-3">
                    <div>Password:</div>
                    <input type="text" className="form-control" placeholder='******' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit" className='btn btn-dark'>Login</button>
            </form>
        </div>
    </div>
  )
}
