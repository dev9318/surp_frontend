import React from 'react';
import "./contact.css";

const Contact = () => {
    return (
        <form className='form'>
        <h1> Contact form ☎</h1>
        <label> Name</label>
        <input placeholder = "name" />

        <label> Email</label>
        <input placeholder = "Email" />

        <label> Message</label>
        <textarea placeholder="Message"></textarea>


        </form>
    );
};

export default Contact;