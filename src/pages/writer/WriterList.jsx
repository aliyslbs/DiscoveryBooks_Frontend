import React, { useEffect, useState } from 'react'
import WriterService from '../../services/writerService'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function WriterList() {

  const navigate = useNavigate();
  const pageSize = 10;

  const [writers, setWriters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)

  const [writerImages, setWriterImages] = useState({})
  const defaultImage = "/defaultPic.jpg"

  const getCurrentPage = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return writers.slice(startIndex, endIndex);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("access_token"));
    if (accessToken) {
      let writerSetvice = new WriterService();
      writerSetvice.getAll().then(result => setWriters(result.data))
    }
  }, [])

  const fetchImage = async (id, index) => {
    try {
      let writerService = new WriterService();
      const imageData = await writerService.getWriterImage(id);
      setWriterImages(prevState => ({ ...prevState, [index]: imageData }));
    } catch (err) {
      setWriterImages(prevState => ({ ...prevState, [index]: defaultImage }));
    }
  }

  useEffect(() => {
    getCurrentPage().forEach((writer, index) => {
      if (writer?.image?.id) {
        fetchImage(writer.image.id, index);
      } else {
        setWriterImages(prevState => ({ ...prevState, [index]: defaultImage }));
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])


  const handleRedirect = (writerName) => {
    navigate(`/writerDetails/${writerName}`)
  }

  return (
    <div>
      <div>
        <div className='pageButton'>
          {
            Array.from({ length: Math.ceil(writers.length / pageSize) }, (_, i) => (
              <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </button>
            ))
          }
        </div>
        {
          getCurrentPage().map((writer, index) => (
            <Card onClick={() => handleRedirect(writer.name)} style={{ marginTop: "5px"}} key={index} sx={{ maxWidth: "auto" }}>
              <CardActionArea>
                <CardContent>
                  <div key={index} className='list-item'>
                    <div className='list-item-background' style={{ backgroundImage: `url(${writerImages[index] || defaultImage})` }}>
                      <div className='list-item-overlay'></div>
                    </div>
                    <div className='list-item-content'>
                      <h3>{writer.name}</h3>
                    </div>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        }
        <div style={{marginBottom:"10px"}} className='pageButton'>
          {
            Array.from({ length: Math.ceil(writers.length / pageSize) }, (_, i) => (
              <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  )
}
