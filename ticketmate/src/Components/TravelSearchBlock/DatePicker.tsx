import React, { useState } from 'react'
import './DatePicker.css'

export default function DatePicker() {
    const [, setDate] = useState('');

    return (
        
        <div className='datepicker'>
            
         <input type="date" onChange={e => setDate(e.target.value)} />
        
    </div>
  );
}

