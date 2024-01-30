import React from 'react'
import PrimaryButton from '../Buttons/PrimaryButton'
import './SearchButton.css'

export default function SearchButton() {
  return (
    <div>
      <PrimaryButton type="button" value="Search" color="third" IsSmall={true}/>
      
    </div>
  )
}
