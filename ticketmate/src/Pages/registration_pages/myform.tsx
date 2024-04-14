import React, { useState, ChangeEvent, FormEvent } from 'react';

import axios from 'axios';
 
function MyForm() {
  // State hooks for form data
  const [formData, setFormData] = useState({
    checkboxValue: false,
    inputValue: ''
  });
 
  // Update form data when input fields change
  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
 
  // Handle form submission
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    try {
      // Make POST request using Axios
      const response = await axios.post('your-api-endpoint', formData);
 
      // Handle response if needed
      console.log(response.data);
    } catch (error) {
      // Handle error if request fails
      console.error('Error:', error);
    }
  };
 
  return (
<form onSubmit={handleSubmit}>
{/* <label>
        Checkbox:
<input
          type="checkbox"
          name="checkboxValue"
          checked={formData.checkboxValue}
          onChange={handleInputChange}
        />
</label> */}
<br />
<label>
        Input:
<input
          type="text"
          name="inputValue"
          value={formData.inputValue}
          onChange={handleInputChange}
        />
</label>
<br />
<button type="submit">Submit</button>
</form>
  );
}
 
export default MyForm;