import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookService from '../services/bookService';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../style/book/randomBooks.css"
import { InputBase, alpha, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export default function HomePage() {

  const navigate = useNavigate();
  const defaultImage = "/defaultPic.jpg"

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [randomBooks, setRandomBooks] = useState([])
  const [bookImages, setBookImages] = useState({})

  //slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));
      if (accessToken || refreshToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    fetchData();
  }, [])

  const handleRedirect = (path) => {
    navigate(path);
  }

  useEffect(() => {
    if (isLoggedIn) {
      let bookService = new BookService();
      bookService.getRandomFiveBooks().then(result => setRandomBooks(result.data));
    }
  }, [isLoggedIn])



  const fetchImage = async (id, index) => {
    try {
      let bookService = new BookService();
      const imageData = await bookService.getBookImage(id);
      setBookImages(prevState => ({ ...prevState, [index]: imageData }));
    } catch (err) {
      console.error('something wrong about image', err)
      setBookImages(prevState => ({ ...prevState, [index]: defaultImage }));
    }
  }

  useEffect(() => {
    randomBooks.forEach((book, index) => {
      if (book?.image?.id) {
        fetchImage(book.image.id, index);
      } else {
        setBookImages(prevState => ({ ...prevState, [index]: defaultImage }));
      }
    })
  }, [randomBooks])

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  if (isLoggedIn) {
    return (
      <div className='container'>
        <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#333', padding: '20px', marginBottom: "20px" }}>
          Welcome to the <span style={{ color: '#007bff' }}>Discovery Books</span>
        </div>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        <div className='slider-container'>
          <Slider {...sliderSettings}>
            {randomBooks.map((book, index) => (
              <div key={index} className='book-item' >
                <div className='book-item-background' style={{ backgroundImage: `url(${bookImages[index] || defaultImage})` }}>
                  <div className='book-item-overlay'></div>
                </div>
                <div className='book-item-content' >
                  <h3 onClick={() => navigate(`/bookDetails/${book.bookName}`)} style={{ cursor: "pointer" }}>{book.bookName}</h3>
                  <div>{book.genre}</div>
                  <div>{book.writer.name}</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  } else {
    return (
      <div className='container'>
        <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#333', padding: '20px' }}>
          Welcome to the
          <span style={{ color: '#007bff' }}>
            Discovery Books
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button onClick={() => handleRedirect("login")} variant="contained" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none' }}>
            Sign In
          </Button>
          <Button onClick={() => handleRedirect("register")} variant="contained" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none' }}>
            Sign Up
          </Button>
        </div>
      </div>
    )
  }
}


