import React from 'react'
import LogoutButton from './Logout'
import LoadingSpinner from './LoadingSpinner'

function Homepage() {
  return (
    <div>
        This is Homepage
        <LogoutButton/>
        <LoadingSpinner/>
    </div>
  )
}

export default Homepage