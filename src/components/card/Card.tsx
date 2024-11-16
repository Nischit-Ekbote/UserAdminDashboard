import React from 'react'
import './Card.css'
import { ArrowRight, Search } from 'lucide-react'

function Card({data}) {
  return (
    <div className='card__component'>
        <img src="" alt="" />
        <div>
          <div className='card__id__component'>
            <h2>{data.id}</h2>
            <button><ArrowRight /></button>
          </div>
          <h3>{data.name}</h3>
          <p>{data.email}</p>
          <p><span>City-</span>{data.address.city}</p>
        </div>
    </div>
  )
}

export default Card