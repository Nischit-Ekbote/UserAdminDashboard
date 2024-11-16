import { X } from 'lucide-react'
import React from 'react'
import './Modal.css'

function Modal({item, closeModal, deleteItem}) {
    const { address } = item;
    
    const handleWebsiteClick = (website) => {
        const url = website.startsWith('http') ? website : `https://${website}`;
        window.open(url, '_blank', 'noopener noreferrer');
    };

    return (
        <div className="modal">
            <div className="modal__data__container">
                <div className='modal__nav'>
                    <h2>{item.username}</h2>
                    <X onClick={closeModal} className='modal__x'/>
                </div>
                <div className='modal__data'>
                    <p>Name: {item.name}</p>
                    <p>Email: {item.email}</p>
                    <p>Address: {address.street}, {address.suite}, {address.city}, {address.zipcode}</p>
                    <p>Phone: {item.phone}</p>
                    <p className="website-link">
                        Website: <span className="link-text" onClick={() => handleWebsiteClick(item.website)}>{item.website}</span>
                    </p>
                    <p>Company: {item.company.name}</p>
                </div>
                <div className='modal__button'>
                    <button className='edit__button'>Edit</button>
                    <button className='delete__button' onClick={deleteItem}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;