import React, { useEffect, useState } from 'react'
import BookService from '../../services/bookService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "../../style/getAllList.css"

export default function BookList() {

  const navigate = useNavigate();
  const pageSize = 10;

  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)

  const [bookImages, setBookImages] = useState({})
  const defaultImage = "/defaultPic.jpg"

  const getCurrentPage = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return books.slice(startIndex, endIndex);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem("access_token"));
    if (accessToken) {
      let bookService = new BookService();
      bookService.getAll().then(result => setBooks(result.data));
    }
  }, [])

  const handleRedirect = (bookName) => {
    navigate(`/bookDetails/${bookName}`)
  }

  const fetchImage = async (id, index) => {
    try {
      let bookService = new BookService();
      const imageData = await bookService.getBookImage(id);
      setBookImages(prevState => ({ ...prevState, [index]: imageData }));
    } catch (err) {
      setBookImages(prevState => ({ ...prevState, [index]: defaultImage }));
    }
  }

  useEffect(() => {
    getCurrentPage().forEach((book, index) => {
      if (book?.image?.id) {
        fetchImage(book.image.id, index);
      } else {
        setBookImages(prevState => ({ ...prevState, [index]: defaultImage }));
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])



  return (
    <div>
      <div className='pageButton'>
        {
          Array.from({ length: Math.ceil(books.length / pageSize) }, (_, i) => (
            <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </button>
          ))
        }
      </div>
      {
        getCurrentPage().map((book, index) => (
          <Card onClick={() => handleRedirect(book.bookName)} style={{ marginTop: "5px" }} key={index} sx={{ maxWidth: "auto" }}>
            <CardActionArea>
              <CardContent>
                <div key={index} className='list-item'>
                  <div className='list-item-background' style={{ backgroundImage: `url(${bookImages[index] || defaultImage})` }}>
                    <div className='list-item-overlay'></div>
                  </div>
                  <div className='list-item-content'>
                    <h3>{book.bookName}</h3>
                    <div>{book.genre}</div>
                    <div>{book.writer.name}</div>
                  </div>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      }
      <div style={{marginBottom:"10px"}} className='pageButton'>
        {
          Array.from({ length: Math.ceil(books.length / pageSize) }, (_, i) => (
            <button key={i + 1} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </button>
          ))
        }
      </div>
    </div>
  )
}
