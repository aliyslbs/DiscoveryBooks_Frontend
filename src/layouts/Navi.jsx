import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import UserService from '../services/userService';
import { login } from '../store/reducers/userSlice';

export default function Navi() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user)

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = JSON.parse(localStorage.getItem("access_token"));
            const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));
            if (accessToken || refreshToken) {
                let userService = new UserService();
                userService.findUserWithToken(accessToken).then(result => dispatch(login(result.data)))
            }
        };
        fetchData();
    }, [dispatch])

    function handleLogout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/")
        toast.info("successfully logged out")
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Discovery Books</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-item nav-link active" to="/">Home</Link>
                            <Link className="nav-item nav-link" to="/books">Books</Link>
                            <Link className="nav-item nav-link" to="/writers">Writes</Link>
                            <Link className="nav-item nav-link" to="/rooms">Chat Rooms</Link>
                            <Link className="nav-item nav-link" to="/recommendation">Recommendation</Link>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> <Link className="dropdown-item" to="/user">User Details</Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> <Link className="dropdown-item" to="/readList">User Read List</Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Avatar /><Link className="dropdown-item" to="/activity">User Activity</Link>
                                </MenuItem>
                                {user?.role === "ADMIN" && (

                                    <MenuItem onClick={handleClose}>
                                        <Avatar /><Link className="dropdown-item" to="/admin">Admin Panel</Link>
                                    </MenuItem>
                                )
                                }
                                <Divider />
                                <MenuItem onClick={handleClose}>
                                    <a onClick={handleLogout} className="dropdown-item" href="/">
                                        <ListItemIcon><Logout fontSize="small" /></ListItemIcon>Logout
                                    </a>
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
