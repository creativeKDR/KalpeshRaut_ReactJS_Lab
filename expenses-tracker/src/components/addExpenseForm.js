import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ExpenseModal = ({ show, onHide }) => {
    const [formData, setFormData] = useState({
        payee: '',
        product: '',
        price: '',
        date: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/expenses', formData);
            onHide();
            setFormData({ payee: '', product: '', price: '', date: '' });
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton style={{ backgroundColor: '#d6e9c6' }}>
                <Modal.Title>Add New Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="alert alert-success" role="alert">
                    <strong>Read the below instructions before proceeding:</strong><br />
                    Make sure you fill all the fields where * is provided
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control as="select" name="payee" value={formData.payee} onChange={handleChange} required>
                            <option value="">Select Name</option>
                            <option value="Rahul">Rahul</option>
                            <option value="Ramesh">Ramesh</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="product">
                        <Form.Label>Product purchased *</Form.Label>
                        <Form.Control
                            type="text"
                            name="product"
                            value={formData.product}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price *</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="date">
                        <Form.Label>Date *</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-around mt-4">
                        <Button variant="success" type="submit">Submit</Button>
                        <Button variant="secondary" onClick={onHide}>Close</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ExpenseModal;
