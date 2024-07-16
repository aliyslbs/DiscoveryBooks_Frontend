import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import UserService from '../services/userService';

export default function UserDetails() {

    const user = useSelector((state) => state.user.user)

    const [userImage, setUserImage] = useState('')

    useEffect(() => {
        const fetchUserImage = async () => {
            try {
                const userService = new UserService();
                const imageDataUrl = await userService.getUserImage(user?.imageId);
                setUserImage(imageDataUrl);
            } catch (error) {
                console.error('Resim getirme işlemi başarısız oldu:', error);
            }
        };

        fetchUserImage();
    }, [user?.imageId]);


    return (
        <div className='container'>
            <Card style={{ marginTop: "20px" }} sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Readers:
                    </Typography>
                    <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
                        {userImage && <img src={userImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Resim" />}
                    </div>
                    <Typography variant="h5" component="div">
                        {user?.email}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {user?.name}
                    </Typography>
                    <Typography variant="body2">
                        {user?.role}
                    </Typography>
                    <Typography variant="body2">
                        biography...
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">edit your profile</Button>
                </CardActions>
            </Card>
        </div>
    )
}
