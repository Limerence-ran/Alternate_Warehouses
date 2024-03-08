import React from 'react'
import "../assets/styles/Title.scss"
export default function Title(props) {
    return (
        <p className='data-title'>
            {props.title}
        </p>
    )
}
