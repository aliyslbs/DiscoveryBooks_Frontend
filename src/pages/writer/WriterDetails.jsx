import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WriterService from '../../services/writerService';
import "../../style/thingsDetails.css"

export default function WriterDetails() {

  const { writerName } = useParams();
  const [writer, setWriter] = useState();

  const [writerImage, setWriterImage] = useState()
  const defaultImage = "/defaultPic.jpg"


  useEffect(() => {
    let writerService = new WriterService();
    writerService.findByName(writerName).then(result => setWriter(result.data));
  })

  const fetchImage = async (id, index) => {
    try {
      let writerService = new WriterService();
      const imageData = await writerService.getWriterImage(id);
      setWriterImage(imageData);
    } catch (err) {
      setWriterImage(defaultImage);
    }
  }
  useEffect(() => {
    if (writer?.image?.id) {
      fetchImage(writer.image.id);
    } else {
      setWriterImage(defaultImage);
    }
  }, [writer])



  return (
    <div className='container'>
      <Card style={{ marginTop: "20px" }} sx={{ minWidth: 275 }}>
        <CardContent>          
          <Typography variant="h5" component="div">
            {writer?.name}
          </Typography>
          <div className='thing-img'>
            <img src={writerImage || defaultImage} alt="Kitap Resmi" />
          </div>
          <Typography variant="body2">
            About...
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add a comment</Button>
          <Button size="small">Add a rating</Button>
        </CardActions>
      </Card>
    </div>
  )
}
