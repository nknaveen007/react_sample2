import React from 'react'
import Card from './Card'
import './DisplayView.css'

const DisplayView = ({email,password}) => {
    return (
        <Card color="purple">
            <p className='para'>Email : {email} and Password : {password} </p>
        </Card>
    )
}

export default DisplayView
