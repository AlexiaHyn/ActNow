import React from 'react'

export default function SignupPage() {
    return (
        <div className='white-background d-flex justify-content-center align-items-center'>
            <div className='card border-0 p-3'>
                <h2>Sign Up</h2>
                <form>
                    <div className="mb-3">
                        <div>Email:</div>
                        <input type="email" className="form-control"/>
                        <div>*We prefer Rice GMail account.</div>
                    </div>
                    <div className="mb-3">
                        <div>Password:</div>
                        <input type="text" className="form-control"/>
                    </div>
                </form>
            </div>
        </div>
      )
}
