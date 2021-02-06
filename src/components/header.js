import React from 'react';
import {Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import PageviewIcon from '@material-ui/icons/Pageview';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
}));


const Header = () => {
    const classes = useStyles();
return(
    <Grid item md={12}>
        <AppBar position="static" className={classes.root}>
            <Toolbar> 
                <Button><Link to="/playlists">MyPlaylists<FeaturedPlayListIcon style={{ fontSize: 40 }}/></Link></Button> 
                <Button><Link to="/songs">SearchMusic<PageviewIcon style={{ fontSize: 40 }}/></Link></Button> 
            </Toolbar>
            
            
        </AppBar>
    </Grid>
    
)
}




export default Header;