import React, { useEffect } from 'react'
import { useState } from 'react';
import BookService from '../../services/bookService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box, Modal, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { StyledTableCell, StyledTableRow, modalStyle } from '../helpers/AdminPanelStyle';


export default function Books() {

    const [books, setBooks] = useState([]);

    const [bookId, setBookId] = useState();
    const [bookName, setBookName] = useState("");
    const [genre, setGenre] = useState("");
    const [writer, setWriter] = useState("");
    const [image, setImage] = useState();

    const [addBookModalOpen, setAddBookModalOpen] = useState(false);
    const handleAddBookModalOpen = () => setAddBookModalOpen(true);
    const handleAddBookModalClose = () => setAddBookModalOpen(false);

    const [updateBookModalOpen, setUpdateBookModalOpen] = useState(false);
    const handleUpdateBookModalOpen = () => setUpdateBookModalOpen(true);
    const handleUpdateBookModalClose = () => setUpdateBookModalOpen(false);

    const [deleteBookModalOpen, setDeleteBookModalOpen] = useState(false);
    const handleDeleteBookModalOpen = () => setDeleteBookModalOpen(true);
    const handleDeleteBookModalClose = () => setDeleteBookModalOpen(false);

    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem("access_token"));
        if (accessToken) {
            let bookService = new BookService();
            bookService.getAll().then(result => setBooks(result.data));
        }
    }, [])

    const onUpdateClick = (book) => {
        setBookId(book.bookId);
        setBookName(book.bookName);
        setGenre(book.genre)
        setWriter(book.writer.name)
        setImage(book.image)
        handleUpdateBookModalOpen();
    }

    const handleUpdateBook = () => {
        const book = new FormData();
        book.append('id', bookId)
        book.append('bookName', bookName);
        book.append('writerName', writer);
        book.append('genre', genre);
        if (image) {
            book.append('imageFile', image);
        } else {
            book.append('imageFile', null);
        }
        let bookService = new BookService();
        try {
            bookService.updateBook(book).then(toast.success("book updated successfully"));
            handleUpdateBookModalClose();
        } catch (error) {
            console.log(error);
            toast.error("there is something wrong")
            handleUpdateBookModalClose();
        }
    }


    const handleSubmitBook = () => {
        const newBook = new FormData();
        newBook.append('bookName', bookName);
        newBook.append('writerName', writer);
        newBook.append('genre', genre);
        newBook.append('imageFile', image);
        let bookService = new BookService();
        try {
            bookService.addBook(newBook).then(toast.success("book added successfully"));
            handleAddBookModalClose();
        } catch (error) {
            console.log(error);
            toast.error("there is something wrong")
            handleAddBookModalClose();
        }
    }

    const onDeleteClick = (book) => {
        setBookId(book.bookId)
        handleDeleteBookModalOpen();
    }

    const handleDeleteBook = () => {
        let bookService = new BookService();
        bookService.deleteBook(bookId).then(toast.info("book deleted successfully"))
        handleDeleteBookModalClose();
    }


    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
                <Button onClick={handleAddBookModalOpen} variant="contained" color='success'>Add Book</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {/* table head */}
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Book Name</StyledTableCell>
                            <StyledTableCell align="center">Genre</StyledTableCell>
                            <StyledTableCell align="center">Writer</StyledTableCell>
                            <StyledTableCell align="center">Operations</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {/* table body */}
                    <TableBody>
                        {books.map((book) => (
                            <StyledTableRow key={book.bookName} >
                                <StyledTableCell align="center">{book?.bookName}</StyledTableCell>
                                <StyledTableCell align="center">{book?.genre}</StyledTableCell>
                                <StyledTableCell align="center">{book?.writer?.name}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ButtonGroup size='small' variant="contained">
                                        <Button onClick={() => onUpdateClick(book)} color='info'>Update</Button>
                                        <Button onClick={() => onDeleteClick(book)} color='error'>Delete</Button>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Add modal */}
            <Modal
                open={addBookModalOpen}
                onClose={handleAddBookModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} style={{ width: "450px" }}>
                    <Typography>
                        Enter information about book
                    </Typography>
                    <div className="form-group">
                        <input onChange={e => setBookName(e.target.value)} style={{ margin: "5px" }} placeholder='name' className="form-control"></input>
                        <input onChange={e => setGenre(e.target.value)} style={{ margin: "5px" }} placeholder='genre' className="form-control"></input>
                        <input onChange={e => setWriter(e.target.value)} style={{ margin: "5px" }} placeholder='writer' className="form-control"></input>
                        <label htmlFor="input">Select image</label>
                        <input onChange={e => setImage(e.target.files[0])} type='file' accept='image/*' style={{ margin: "5px" }} placeholder='images' className="form-control"></input>
                        <Button onClick={() => handleSubmitBook()} style={{ margin: "5px" }} variant="contained" color='success'>Submit</Button>
                    </div>
                </Box>
            </Modal>
            {/* update modal */}
            <Modal
                open={updateBookModalOpen}
                onClose={handleUpdateBookModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} style={{ width: "450px" }}>
                    <Typography>
                        Update Book
                    </Typography>
                    <div className="form-group">
                        <input value={bookName} onChange={e => setBookName(e.target.value)} style={{ margin: "5px" }} placeholder='name' className="form-control"></input>
                        <input value={genre} onChange={e => setGenre(e.target.value)} style={{ margin: "5px" }} placeholder='genre' className="form-control"></input>
                        <input value={writer} onChange={e => setWriter(e.target.value)} style={{ margin: "5px" }} placeholder='writer' className="form-control"></input>
                        <label htmlFor="input">Select image  or let it all it be</label>
                        <input onChange={e => setImage(e.target.files[0])} type='file' accept='image/*' style={{ margin: "5px" }} placeholder='images' className="form-control"></input>
                        <Button onClick={() => handleUpdateBook()} style={{ margin: "5px" }} variant="contained" color='success'>Submit</Button>
                    </div>
                </Box>
            </Modal>
            {/* delete confirm modal */}
            <Modal
                open={deleteBookModalOpen}
                onClose={handleDeleteBookModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle} style={{ width: "450px" }}>
                    <Typography>
                        are you sure about delete book
                    </Typography>
                    <div className="form-group">
                        <Button onClick={() => handleDeleteBook()} style={{ margin: "5px" }} variant="contained" color='error'>I am sure</Button>
                        <Button onClick={handleDeleteBookModalClose} style={{ margin: "5px" }} variant="contained" color='primary'>cancel</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}