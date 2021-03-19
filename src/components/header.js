import React from 'react';
import {Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import PageviewIcon from '@material-ui/icons/Pageview';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NoEncryption } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      
    },
    title: {
        flexGrow: 1,
    },
    rootLink: {
        flexGrow: 2
    },
    linkBorder: {
        textDecoration: "none"
        
    },
    button: {
        margin: theme.spacing(1),
        color: "#c5cae9",
        "&:hover": {
            color: "#9fa8da"
        }
    },
    iconSize: {
        fontSize: 30
    },
}));


const Header = () => {
    const classes = useStyles();
return(
    <Grid item md={12}>
        <AppBar position="static" className={classes.root}>
            <Toolbar className={classes.rootLink}> 
                <Typography variant="h4" className={classes.title}>
                    Musico
                </Typography>
                <Link to="/playlists" className={classes.linkBorder}>
                    <Button className={classes.button} startIcon={<FeaturedPlayListIcon className={classes.iconSize} />}>
                        <Typography variant="h6" className={classes.title}>MyPlaylists</Typography>
                    </Button>
                </Link>
                <Link to="/songs" className={classes.linkBorder} >
                <Button className={classes.button} startIcon={<PageviewIcon className={classes.iconSize}/>}>
                    <Typography variant="h6" className={classes.title}>SearchMusic</Typography>
                </Button> 
                </Link>
            </Toolbar>
               
            
            
        </AppBar>
    </Grid>
    
)
}




export default Header;