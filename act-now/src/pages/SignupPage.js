import React, {useState} from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase/firebase'

export default function SignupPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("")
	const [passwordAgain, setPasswordAgain] = useState("")
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function onFormSubmit(e) {
        e.preventDefault();
        if (password !== passwordAgain){
            alert("passwords do not match!");
            return;
        }

        setLoading(true)
        try{
            const userCred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (userCred.user !== null){
                sendEmailVerification(userCred.user).then(()=>{
                        alert('email send')
                        navigate("/login");
                    }
                );
            }
        } catch (err){
            alert(err.message);
        }
    }
    

    return (
        <div className='white-background d-flex justify-content-center align-items-center poppins'>
            <div className='card border-0 p-3'>
                <h1 className='fw-bold mb-3'>Sign Up</h1>
                <form onSubmit={onFormSubmit}>
                    <div className="mb-3">
                        <div className='fw-bold'>Email:</div>
                        <input type="email" className="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <div className='text-secondary'>*We prefer Rice GMail account.</div>
                    </div>
                    <div className="mb-3">
                        <div className='fw-bold'>Password:</div>
                        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' required/>
                    </div>
                    <div className="mb-3">
                        <div className='fw-bold'>Confirm Password:</div>
                        <input type="password" className="form-control" value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)} placeholder='Password' required/>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type="submit" className='btn btn-dark'>Submit</button>
                    </div>
                    
                </form>
            </div>
        </div>
      )
}
