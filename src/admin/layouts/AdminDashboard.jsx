import React from 'react'
import Grid from '@mui/material/Grid';
import { List, ListItemButton } from '@mui/material';
import { ListItem } from 'semantic-ui-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user)


  if (user?.role === "ADMIN") {
    return (
      <div className='container'>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <List>
              <ListItem>
                <ListItemButton onClick={() => navigate("/admin")}>Admin Home</ListItemButton>
                <ListItemButton onClick={() => navigate("/admin/books")}>Books</ListItemButton>
                <ListItemButton onClick={() => navigate("/admin/writers")}>Writers</ListItemButton>
                <ListItemButton onClick={() => navigate("/admin/users")}>Users</ListItemButton>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={8}>
            <Outlet></Outlet>
          </Grid>
        </Grid>
      </div>
    )
  } else {
    return (
      <div style={{textAlign:"center", marginTop:"50px"}}>
        <h1 style={{color:"red"}}>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </div>
    )
  }

}
