import React from 'react'
import './Card.css'

const Card = (props) => {
    return (
        <div className={[`card ${props.color}`]} >{props.children}</div>
    )
}

export default Card
