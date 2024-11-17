import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    Button,
} from '@mui/material';
import { Contact } from '../types';

interface ContactsTableProps {
    contacts: Contact[];
    onEdit: (id: string | undefined) => void;
    onDelete: (id: string | undefined) => void;
}

const ContactsTable: React.FC<ContactsTableProps> = ({ contacts, onEdit, onDelete }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Contact>('firstName');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSort = (property: keyof Contact) => {
        const isAscending = orderBy === property && order === 'asc';
        setOrder(isAscending ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedContacts = contacts.sort((a, b) => {
        const aValue = a[orderBy] ?? '';
        const bValue = b[orderBy] ?? '';
    
        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
    });

    const paginatedContacts = sortedContacts.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <>
            <TableContainer
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    boxShadow: 1,
                    margin: '20px 0',
                }}
            >
                <Table>
                    <TableHead sx={{ backgroundColor: '#e1f3fe' }}>
                        <TableRow>
                            {[
                                { id: 'firstName', label: 'First Name' },
                                { id: 'lastName', label: 'Last Name' },
                                { id: 'email', label: 'Email' },
                                { id: 'phoneNo', label: 'Phone' },
                                { id: 'company', label: 'Company' },
                                { id: 'jobTitle', label: 'Job Title' },
                            ].map((column) => (
                                <TableCell key={column.id}>
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={() => handleSort(column.id as keyof Contact)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedContacts.map((contact) => (
                            <TableRow
                                key={contact._id}
                                sx={{
                                    '&:hover': { backgroundColor: '#dceaff' },
                                    borderBottom: '1px solid #e1e1e1',
                                }}
                            >
                                <TableCell>{contact.firstName}</TableCell>
                                <TableCell>{contact.lastName}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.phoneNo}</TableCell>
                                <TableCell>{contact.company}</TableCell>
                                <TableCell>{contact.jobTitle}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => onEdit(contact._id)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => onDelete(contact._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={contacts.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </>
    );
};

export default ContactsTable;
