import React, { useEffect, useState } from 'react'
import WriterService from '../../services/writerService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { StyledTableCell, StyledTableRow, modalStyle } from '../helpers/AdminPanelStyle';
import { Box, Modal, Typography } from '@mui/material';
import { toast } from 'react-toastify';

export default function Writers() {

  const [writers, setWriters] = useState([])

  const [writerId, setWriterId] = useState();
  const [writerName, setWriterName] = useState("");
  const [image, setImage] = useState();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const handleUpdateModalOpen = () => setUpdateModalOpen(true);
  const handleUpdateModalClose = () => setUpdateModalOpen(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("access_token"));
    if (accessToken) {
      let writerService = new WriterService();
      writerService.getAll().then(result => setWriters(result.data));
    }
  }, [])

  const addWriter = () => {
    const writer = new FormData();
    writer.append("name", writerName)
    writer.append("image", image);
    let writerService = new WriterService();
    try {
      writerService.addWriter(writer).then(toast.success("writer added successfully"));
      handleAddModalClose();
    } catch (err) {
      console.log(err);
      toast.error("there is something wrong")
      handleAddModalClose();
    }
  }


  const onUpdateClick = (writer) => {
    setWriterId(writer.id);
    setWriterName(writer.name);
    setImage(writer.image)
    handleUpdateModalOpen();
  }

  const updateWriter = () => {
    const writer = new FormData();
    writer.append("id", writerId);
    writer.append("name", writerName);
    if (image) {
      writer.append('image', image);
    } else {
      writer.append('image', null);
    }
    let writerService = new WriterService();
    try {
      writerService.updateWriter(writer).then(toast.success("writer updated successfully"));
      handleUpdateModalClose();
    } catch (err) {
      console.log(err);
      toast.error("there is something wrong")
      handleUpdateModalClose();
    }
  }

  const onDeleteClick = (writer) => {
    setWriterId(writer.id);
    handleDeleteModalOpen();
  }

  const deleteWriter = () => {
    let writerService = new WriterService();
    writerService.deleteWriter(writerId).then(toast.info("writer deleted successfully"));
    handleDeleteModalClose();
  }




  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        <Button onClick={handleAddModalOpen} variant="contained" color='success'>Add Writer</Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* table head */}
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">WriterName</StyledTableCell>
              <StyledTableCell align="center">Operations</StyledTableCell>
            </TableRow>
          </TableHead>
          {/* table body */}
          <TableBody>
            {writers.map((writer) => (
              <StyledTableRow key={writer.name} >
                <StyledTableCell align="center">{writer?.name}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup size='small' variant="contained">
                    <Button onClick={() => onUpdateClick(writer)} color='info'>Update</Button>
                    <Button onClick={() => onDeleteClick(writer)} color='error'>Delete</Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add modal */}
      <Modal
        open={addModalOpen}
        onClose={handleAddModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} style={{ width: "450px" }}>
          <Typography>
            Enter information about Writer
          </Typography>
          <div className="form-group">
            <input onChange={e => setWriterName(e.target.value)} style={{ margin: "5px" }} placeholder='name' className="form-control"></input>
            <label htmlFor="input">Select image</label>
            <input onChange={e => setImage(e.target.files[0])} type='file' accept='image/*' style={{ margin: "5px" }} placeholder='images' className="form-control"></input>
            <Button onClick={() => addWriter()} style={{ margin: "5px" }} variant="contained" color='success'>Add</Button>
          </div>
        </Box>
      </Modal>
      {/* update modal */}
      <Modal
        open={updateModalOpen}
        onClose={handleUpdateModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} style={{ width: "450px" }}>
          <Typography>
            Update Writer
          </Typography>
          <div className="form-group">
            <input value={writerName} onChange={e => setWriterName(e.target.value)} style={{ margin: "5px" }} placeholder='name' className="form-control"></input>
            <label htmlFor="input">Select image  or let it all it be</label>
            <input onChange={e => setImage(e.target.files[0])} type='file' accept='image/*' style={{ margin: "5px" }} placeholder='images' className="form-control"></input>
            <Button onClick={() => updateWriter()} style={{ margin: "5px" }} variant="contained" color='success'>Update</Button>
          </div>
        </Box>
      </Modal>
      {/* delete confirm modal */}
      <Modal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} style={{ width: "450px" }}>
          <Typography>
            are you sure about delete writer
          </Typography>
          <div className="form-group">
            <Button onClick={() => deleteWriter()} style={{ margin: "5px" }} variant="contained" color='error'>I am sure</Button>
            <Button onClick={handleDeleteModalClose} style={{ margin: "5px" }} variant="contained" color='primary'>cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

