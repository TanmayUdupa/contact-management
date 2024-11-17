import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import ContactForm from './components/contact-form';
import ContactsTable from './components/contacts-table';
import { Contact } from './types';

const App: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch('http://localhost:5000/contacts');
            const data = await response.json();
            setContacts(data);
        };

        fetchContacts();
    }, []);

    const handleAddContact = (newContact: Contact) => {
        fetch('http://localhost:5000/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContact),
        })
        .then(response => response.json())
        .then(data => {
            setContacts([...contacts, data.data]);
        })
        .catch(error => console.error('Error adding contact:', error));
    };

    const handleEditContact = (_id: string | undefined) => {
        const contactToEdit = contacts.find(contact => contact._id === _id);
        if (contactToEdit) {
            setEditingContact(contactToEdit);
        }
    };

    const handleDeleteContact = (_id: string | undefined) => {
        fetch(`http://localhost:5000/contacts/${_id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setContacts(contacts.filter(contact => contact._id !== _id));
        })
        .catch(error => console.error('Error deleting contact:', error));
    };

    const handleUpdateContact = (updatedContact: Contact) => {
        fetch(`http://localhost:5000/contacts/${updatedContact._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedContact),
        })
        .then(response => response.json())
        .then(updated => {
            setContacts(contacts.map(contact => contact._id === updatedContact._id ? updated.data : contact));
            setEditingContact(null);
        })
        .catch(error => console.error('Error updating contact:', error));
    };

    return (
        <Container maxWidth="lg">
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Contact Management
                </Typography>
                <ContactForm 
                    onSubmit={editingContact ? handleUpdateContact : handleAddContact}
                    initialValues={editingContact || null} 
                />
                <ContactsTable 
                    contacts={contacts} 
                    onEdit={handleEditContact} 
                    onDelete={handleDeleteContact} 
                />
            </Box>
        </Container>
    );
};

export default App;
