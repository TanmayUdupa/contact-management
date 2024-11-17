import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Contact from './model/Contact';

dotenv.config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'your-mongodb-uri-here';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:', err));

// Get all contacts
app.get('/contacts', async (req: Request, res: Response) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch contacts' });
    }
});

// Create a new contact
app.post('/contacts', async (req: Request, res: Response) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ success: true, data: newContact });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const messages = Object.values((error as any).errors).map((err: any) => err.message);
            res.status(400).json({ success: false, error: messages });
        } else {
            console.error(error);
            res.status(500).json({ success: false, error: 'Invalid contact creation' });
        }
    }
});

// Update a contact by ID
app.put('/contacts/:id', async (req: Request, res: Response) : Promise<any> => {
    try {
        console.log("AAAAA");
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedContact) {
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }
        
        return res.json({ success: true, data: updatedContact });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Error updating contact' });
    }
});

// Delete a contact by ID
app.delete('/contacts/:id', async (req: Request, res: Response) : Promise<any> => {
    try {
        console.log("aaaaa");
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        
        if (!deletedContact) {
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }
        
        return res.json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Error deleting contact' });
    }
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
