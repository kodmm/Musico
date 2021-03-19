import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    media: {
        height: 100,
        width: 100,
    },
    content: {
        paddingBottom: theme.spacing(1)
    },
    topInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    actions: {
        justifyContent: 'space-between',
    },
    drawer: {
        padding: theme.spacing(1)
    },
    playlistForm: {
        padding: theme.spacing(2),
    },
    playlistButton: {
        marginTop: theme.spacing(2)
    },
    noalbum: {
        display: 'none',
    },
    card: {
        width: 345,
        marginTop: theme.spacing(2)
    }
}))
const ArtistData = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [openDrawer, setOpenDrawer] = useState(false)
    useEffect(() => {
        
            axios.get('/api/v1/playlist', {
                params: {
                    id: 2
                }
            })
            .then(response => {
                
                setPlaylists(response.data.Playlists)
                setPlaylistValue(response.data.Playlists[0].name)
            }).catch(err => console.log(err));
        
        
    },[])
    
    
    const [playlists, setPlaylists] = useState([]);
    const [playlistValue, setPlaylistValue] = useState('');

    const handlePlaylistChange = e => {
        console.log(e.target)
        setPlaylistValue(e.target.value)
       
    }


    const handlePlaylistSubmit = event => {
        event.preventDefault();
        const playlist_id = event.target.playlist.value;
        const customer_id = event.target.customer_id.value;
        const track_id = event.target.track_id.value;
        const name = event.target.name.value;
        const artist_name = event.target.artist_name.value;
        const album_name = event.target.album_name.value;
        const album_url = event.target.album_url.value;
        const genre = event.target.genre.value;
        const release_at = event.target.release_at.value;
        axios.post('/api/v1/playlist/relation', {
            customer_id: 2,
            song: {
                trackId: track_id,
                name: name,
                artistName: artist_name,
                albumName: album_name,
                albumUrl: album_url,
                genre: genre,
                releaseAt: release_at
            },
            playlistId: playlist_id
            
        })
        .then(response => {
            console.log(response.data.msg);
            toggleDrawer(false)
        })
    }
    const favoriteSubmit = (event) => {
        event.preventDefault();
        // console.log(event.target.elements);
        // console.log(event.target.customer_id.value);
        const customer_id = event.target.customer_id.value;
        const track_id = event.target.track_id.value;
        const name = event.target.name.value;
        const artist_name = event.target.artist_name.value;
        const album_name = event.target.album_name.value;
        const album_url = event.target.album_url.value;
        const genre = event.target.genre.value;
        const release_at = event.target.release_at.value;
        axios.post('/api/v1/favorite', {
            customer_id: 2,
            song: {
                trackId: track_id,
                name: name,
                artistName: artist_name,
                albumName: album_name,
                albumUrl: album_url,
                genre: genre,
                releaseAt: release_at
            }
            
        })
        .then(response => {
            console.log(response.data.msg);
        })
    }

    const toggleDrawer = (open) => {
        setOpenDrawer(open);
    };
    return(
        
        <Box className={props.id ? null: classes.noalbum}>
            <Card className={props.id ? classes.card: classes.noalbum}>
                <Grid container className={classes.topInfo}>
                    <Grid item md={5}>
                        <CardMedia 
                        className={classes.media}
                        image={props.albumUrl}
                        title={props.album}
                        />
                    </Grid>
                    <Grid item md={7} >
                    <Typography variant="body1" component="p" className={classes.content}>
                        ジャンル: <b>{props.genre}</b>
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.content}>
                        アーティスト: <b>{props.name}</b>
                    </Typography>
                    </Grid> 
                </Grid>
                
                <CardContent>
                    <Typography variant="h5" component="h2"　className={classes.content}>
                        {props.trackName}
                    </Typography>
                
                    <Typography variant="body1" component="p" className={classes.content}>
                        アルバム名: <b>{props.album}</b>
                    </Typography>
                    <Typography variant="body2" component="p" color="textSecondary">
                        リリース日: <b>{props.release}</b>
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                    
                    <form onSubmit={event => favoriteSubmit(event)}>
                            
                        <input type="hidden" name="customer_id" value="2" />
                        <input type="hidden" name="track_id" value={props.id} />
                        <input type="hidden" name="name" value={props.trackName} />
                        <input type="hidden" name="artist_name" value={props.name} />
                        <input type="hidden" name="album_name" value={props.album} />
                        <input type="hidden" name="album_url" value={props.AlbumUrl60} />
                        <input type="hidden" name="genre" value={props.genre} />
                        <input type="hidden" name="release_at" value={props.release} />
                        <Fab color="secondary" aria-label="add to favorites" type="submit">
                            <FavoriteIcon />
                        </Fab>
                    </form>
                    <Fab color="primary" aria-label="add" onClick={() => toggleDrawer(true)}>
                        <AddIcon />
                    </Fab>
                    <Drawer anchor='bottom' open={openDrawer} onClose={() => toggleDrawer(false)}>
                        <Grid container className={classes.drawer}>
                            <Grid item md={5} className={classes.topInfo}>
                                <CardMedia 
                                    className={classes.media}
                                    image={props.albumUrl}
                                    title={props.album}
                                />
                                <Box p={1}>
                                    <Typography variant="h5" component="h2"　className={classes.content}>
                                        {props.trackName}
                                    </Typography>
                                    <Typography variant="body1" component="p" className={classes.content}>
                                        アーティスト: <b>{props.name}</b>
                                    </Typography>
                                </Box>
                                
                            </Grid>
                            <Grid item md={7} className={classes.playlistForm}>
                                <form onSubmit={handlePlaylistSubmit}>
                                        
                                        <input type="hidden" name="customer_id" value="2" />
                                        <input type="hidden" name="track_id" value={props.id} />
                                        <input type="hidden" name="name" value={props.trackName} />
                                        <input type="hidden" name="artist_name" value={props.name} />
                                        <input type="hidden" name="album_name" value={props.album} />
                                        <input type="hidden" name="album_url" value={props.AlbumUrl60} />
                                        <input type="hidden" name="genre" value={props.genre} />
                                        <input type="hidden" name="release_at" value={props.release} />
                                    
                                    
                                        <InputLabel id="playlist">Playlist</InputLabel>
                                        <Select labelId="playlist" inputProps={{'name': 'playlist'}} onChange={handlePlaylistChange} >
                                            {
                                            playlists.map(playlist => (
                                                <MenuItem value={playlist.id} key={playlist.id}>{playlist.name}</MenuItem>
                                                
                                            ))
                                            }
                                            
                                        </Select>
                                    
                                    <Button type="submit" size="small" variant="contained" color="primary" className={classes.playlistButton}>追加</Button>
                                </form>
                            </Grid>
                            
                        </Grid>
                    </Drawer>
                </CardActions>


            </Card>
            
        </Box>
    );
}

export default ArtistData
