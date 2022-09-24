import React from 'react'

export default function ProfilePage() {
  return (
    <div className='white-background d-flex flex-column align-items-center'>
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Active</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
            </li>
        </ul>
    </div>
  )
}
