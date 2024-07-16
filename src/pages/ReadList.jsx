import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReadListService from '../services/readListService'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ReadList() {

    const navigate = useNavigate()

    const user = useSelector(state => state.user.user)

    const [readList, setReadList] = useState([])

    useEffect(() => {
        if (user?.userId) {
            let readListService = new ReadListService();
            readListService.getAllByUserId(user?.userId).then(result => setReadList(result.data))
        }
    }, [user?.userId])

    const handleRemove = (selectedId) => {
        let readListService = new ReadListService();
        readListService.removeFromReadList(selectedId)
        toast.success("successfully removed from your read list")
    }


    return (
        <div className='container'>
            <div style={{ marginBottom: "10px", marginTop: "10px", color: "blue" }}>
                Your Read List:
            </div>
            {
                readList.map((book, index) => (
                    <Card style={{ marginTop: "3px", marginBottom: "3px"}} key={index} sx={{ maxWidth: 500 }}>
                        <CardActionArea>
                            <CardContent onClick={() => navigate(`/bookDetails/${book.bookName}`)}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {book.bookName}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <strong>{book.writer}</strong>
                                </Typography>
                                <Typography variant="body2">
                                    {book.genre}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleRemove(book.id)} size="small">Remove</Button>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                ))
            }
        </div>
    )
}
