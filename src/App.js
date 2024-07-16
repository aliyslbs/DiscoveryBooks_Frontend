import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import Navi from './layouts/Navi.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './layouts/Dashboard.jsx';
import HomePage from './pages/HomePage.jsx';
import BookList from './pages/book/BookList.jsx';
import WriterList from './pages/writer/WriterList.jsx';
import Register from './pages/auth/Register.jsx';
import Login from './pages/auth/Login.jsx';
import BookDetails from './pages/book/BookDetails.jsx';
import UserDetails from './pages/UserDetails.jsx';
import WriterDetails from './pages/writer/WriterDetails.jsx';
import ReadList from './pages/ReadList.jsx';
import AdminDashboard from './admin/layouts/AdminDashboard.jsx';
import Books from './admin/pages/Books.jsx';
import Writers from './admin/pages/Writers.jsx';
import Users from './admin/pages/Users.jsx';
import AdminHome from './admin/pages/AdminHome.jsx';
import Rooms from './pages/Rooms.jsx';
import Recommendation from './pages/Recommendation.jsx';
import Activity from './pages/Activity.jsx';




function App() {

  return (
    <div className="App">
      <ToastContainer position='bottom-right'></ToastContainer>
      <Navi></Navi>
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/' Component={Dashboard}>
          <Route path='books' Component={BookList}></Route>
          <Route path='bookDetails/:bookName' Component={BookDetails}></Route>
          <Route path='writers' Component={WriterList}></Route>
          <Route path='writerDetails/:writerName' Component={WriterDetails}></Route>
          <Route path='rooms' Component={Rooms}></Route>
          <Route path='recommendation' Component={Recommendation}></Route>
          <Route path='activity' Component={Activity}></Route>
        </Route>
        <Route path='register' Component={Register}></Route>
        <Route path='login' Component={Login}></Route>
        <Route path='user' Component={UserDetails}></Route>
        <Route path='readList' Component={ReadList}></Route>
        <Route path='admin' Component={AdminDashboard}>
          <Route path='' Component={AdminHome}></Route>
          <Route path='/admin/books' Component={Books}></Route>
          <Route path='/admin/writers' Component={Writers}></Route>
          <Route path='/admin/users' Component={Users}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
