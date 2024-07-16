import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookService from '../../services/bookService';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CommentService from '../../services/commentService';
import { toast } from 'react-toastify';
import RatingService from '../../services/ratingService';
import RatingReview from '../../helpers/ratingReview';
import { useSelector } from 'react-redux';
import ReadListService from '../../services/readListService';
import "../../style/thingsDetails.css"

//add comment modal style
const commentModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BookDetails() {

  const user = useSelector(state => state.user.user)
  

  //params
  let { bookName } = useParams("");

  //book useStates
  const [book, setBook] = useState();

  //book images
  const [bookImage, setBookImage] = useState()
  const defaultImage = "/defaultPic.jpg"

  //comment useStates
  const [content, setContent] = useState();
  const [comments, setComments] = useState([])

  //ratings useStates
  const [ratings, setRatings] = useState([])
  const [averageScore, setAverageScore] = useState()
  const [giveRating, setGiveRating] = useState()

  //comment modal
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const handleCommentModalOpen = () => setCommentModalOpen(true);
  const handleCommentModalClose = () => setCommentModalOpen(false);

  //rating modal
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const handleRatingModalOpen = () => setRatingModalOpen(true);
  const handleRatingModalClose = () => setRatingModalOpen(false);


  //book
  useEffect(() => {
    const bookService = new BookService();
    bookService.findByName(bookName).then(result => setBook(result.data));
  }, [bookName])

  //book image
  const fetchImage = async (id, index) => {
    try {
      let bookService = new BookService();
      const imageData = await bookService.getBookImage(id);
      setBookImage(imageData);
    } catch (err) {
      console.error('Resim getirme işlemi başarısız oldu', err)
      setBookImage(defaultImage);
    }
  }
  useEffect(() => {
    if (book?.image?.id) {
      fetchImage(book.image.id);
    } else {
      setBookImage(defaultImage);
    }
  }, [book])


  //comments
  const fetchComments = () => {
    if (book) {
      const commentService = new CommentService();
      commentService.getAllByBookId(book?.bookId).then(result => {
        setComments(result.data)
      })
    }
  }
  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book])

  //add comment
  const handleCommentSubmit = () => {
    const comment = {
      userId: user.userId,
      bookId: book.bookId,
      content: content
    }
    const commentService = new CommentService();
    commentService.addComment(comment).then(() => {
      toast.success("comment added successfully");
      handleCommentModalClose()
      fetchComments()
    })
  }



  //ratings
  const fetchRatings = () => {
    if (book) {
      let ratingService = new RatingService();
      ratingService.getAllRating(book?.bookId).then(result => {
        setRatings(result.data)
      })
    }
  }
  useEffect(() => {
    fetchRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book])

  //calc rating
  const calcRatings = () => {
    if (ratings.length > 0) {
      let sum = 0
      ratings.forEach((item) => {
        sum += item.rating
      })
      setAverageScore(sum / ratings.length)
    }
  }
  useEffect(() => {
    calcRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratings])

  //give rating
  const handleGiveRating = () => {
    const rating = {
      rating: giveRating,
      userId: user.userId,
      bookId: book.bookId
    }
    let ratingService = new RatingService();
    ratingService.giveRating(rating).then(toast.success("your rating added successfully"))
    handleRatingModalClose()
  }

  // add to read list
  const handleAddToReadList = () => {
    const readListDto = {
      userId: user.userId,
      bookId: book.bookId
    }
    let readListService = new ReadListService();
    readListService.addToReadList(readListDto)
    toast.success("successfully added to read list")
  }



  return (
    <div className='container'>
      <Card style={{ marginTop: "20px" }} sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {book?.bookName}
          </Typography>
          <div className='thing-img'>
            <img src={bookImage || defaultImage} alt="Kitap Resmi" />
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            writer: <strong>{book?.writer?.name}</strong>
          </Typography>
          <Typography variant="body2">
            About...
          </Typography>
          <Typography variant="body2">
            Rating: <span style={{ color: "red" }}>{averageScore}</span>
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleCommentModalOpen} size="small">Add comment</Button>
          <Button onClick={handleRatingModalOpen} size="small">Rate</Button>
          <Button onClick={handleAddToReadList} size="small">Add to Read List</Button>
        </CardActions>
      </Card>
      <div style={{ marginTop: "10px", color: "blue" }}>
        Comments:
      </div>
      {
        comments.map((comment, index) => (
          <Card key={comment.id ?? index} style={{ marginTop: "20px" }} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>{comment?.name}</strong>
              </Typography>
              <Typography variant="body2">
                {comment?.content}
              </Typography>
            </CardContent>
          </Card>
        ))
      }
      {/* rating modal */}
      <Modal
        open={ratingModalOpen}
        onClose={handleRatingModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={commentModalStyle} style={{ width: "450px" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rate:
          </Typography>
          <RatingReview rating={giveRating} setRating={setGiveRating}></RatingReview>
          <Button onClick={handleGiveRating} size="small">Give Rating</Button>
        </Box>
      </Modal>
      {/* comment modal */}
      <Modal
        open={commentModalOpen}
        onClose={handleCommentModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={commentModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Content:
          </Typography>
          <div className="form-group">
            <textarea onChange={(e) => setContent(e.target.value)} className="form-control"></textarea>
          </div>
          <Button onClick={handleCommentSubmit} size="small">Add comment</Button>
        </Box>
      </Modal>
    </div >
  )
}


