import axios from 'axios';
import React, { useState } from 'react';
import ButtonComponent from './ButtonComponent';

export default function FormComponent() {

    const [data, setFormdata] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleInput = (e) => {
        setFormdata({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit data",data)
        try {
          await axios.post('http://localhost:3001/api/mongodb', data);
          console.log("Formdata added to db");
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
      

    return (
        <div>
            <ButtonComponent />
            <form onSubmit={handleSubmit}>
                <p>Name :</p>
                <input type='text' name="name" id="name" value={data.name} onChange={handleInput} placeholder="Enter your Name" />
                <p>Email :</p>
                <input type="email" name="email" id="email" value={data.email} onChange={handleInput} placeholder="Enter Your Email" />
                <p>Phone :</p>
                <input type="tel" name="phone" id="phone" value={data.phone} onChange={handleInput} Placeholder="Enter your Phone Number" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
