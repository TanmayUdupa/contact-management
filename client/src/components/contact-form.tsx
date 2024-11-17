import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import { Contact } from '../types';

interface ContactFormProps {
    onSubmit: (contact: Contact) => void; 
    initialValues: Contact | null;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, initialValues }) => {
    const [formData, setFormData] = useState<Contact>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        company: '',
        jobTitle: '',
    });
    
    const [errors, setErrors] = useState({
        email: '',
        phoneNo: '',
    });

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues);
        }
    }, [initialValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let valid = true;
        let validationErrors = { email: '', phoneNo: '' };

        if (!validateEmail(formData.email)) {
            validationErrors.email = 'Please enter a valid email address.';
            valid = false;
        }

        if (!validatePhone(formData.phoneNo)) {
            validationErrors.phoneNo = 'Please enter a valid phone number.';
            valid = false;
        }

        if (valid) {
            onSubmit(formData);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNo: '',
                company: '',
                jobTitle: '',
            });
            setErrors({ email: '', phoneNo: '' });
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <Box mb={4}>
            <Typography variant="h6" gutterBottom>
                {initialValues ? 'Update Contact' : 'Add New Contact'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone Number"
                            name="phoneNo"
                            value={formData.phoneNo}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={!!errors.phoneNo}
                            helperText={errors.phoneNo}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Job Title"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            {initialValues ? 'Update Contact' : 'Add Contact'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default ContactForm;
