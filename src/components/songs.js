import React, {useState, useRef } from 'react';
import axios from 'axios';
import PlaylistForm from './playlistForm';
import ArtistData from './artistdata.js';
import '../styles/songs.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import { Modal } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2)
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400

    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    album: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
}))

const Songs = () => {
    const classes = useStyles();
    const artistInput = useRef(null)
    const [open, setOpen] = useState(false);
    const [artist, setArtist] = useState('');
    const [artistData, setArtistData] = useState([{
        trackId: '',
        ArtistName: '',
        AlbumName: '',
        AlbumUrl: '',
        AlbumUrl60: '',
        AlbumGenre: '',
        AlbumRelease: '',
        trackName: ''
    }])

    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

    async function itunesGet(params){
        try{
            const prm = params.trim();
            const para = encodeURI(prm);
            const response = await axios.get(`https://itunes.apple.com/search?term=${para}&media=music&entity=song&attribute=&=songTerm&country=JP&lang=ja_jp&limit=30`)
            const responsedata = response.data.results
            const responseAPI = responsedata.map(value => {
                return {
                    trackId: value.trackId, 
                    ArtistName: value.artistName,
                    AlbumName: value.collectionName, 
                    AlbumUrl: value.artworkUrl100,
                    AlbumUrl60: value.artworkUrl60,
                    AlbumGenre: value.primaryGenreName,
                    AlbumRelease: value.releaseDate,
                    trackName: value.trackName
                    
                };
            }
            );
            setArtistData(responseAPI);
            console.log(responsedata);
            console.log(artistData);
        }catch(error) {
            const {
                status, statusText
            } = error.response;
            console.log(`Error! HTTP Status: ${status} ${statusText}`)

        }
        
    };

    return (
        <Grid container className={classes.root}>
            <Grid item md={5}>
                <Button variant="outlined" color="primary" onClick={handleOpen} >Create Playlist</Button>
                <Modal
                    aria-labelledby="transition-modal-form"
                    aria-describedby="transition-modal-createPlaylist"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <PlaylistForm />
                        
                    </Fade>
                </Modal>
                
                    
            </Grid>
            <Grid item md={7}>
                <Paper component="form" 
                    className={classes.paper}
                    onSubmit = {e => {
                        e.preventDefault();
                        console.log(artistInput.current.value);

                        itunesGet(artistInput.current.value);

                        setArtist(artistInput.current.value);

                        artistInput.current.value = '';
        
                    }}
                >
                    <InputBase
                        className={classes.input}
                        placeholder="Search Music or Artist name"
                        id="artist"
                        inputRef={artistInput}
                        inputProps={{ 'aria-label': 'search music or artist name'}}
                    />
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon />

                    </IconButton>
                </Paper>
            </Grid>
            
            <Grid container >
                <Grid item md={12}>
                    <p className="result">検索結果: <b>{artist}</b></p>
                </Grid>
                <Grid item md={12} className={classes.album}>
                {artistData.map(artistdata => (
                    <ArtistData 
                        key={artistdata.trackId.toString()}
                        id={artistdata.trackId}
                        name={artistdata.ArtistName}
                        album={artistdata.AlbumName}
                        albumUrl={artistdata.AlbumUrl}
                        AlbumUrl60={artistdata.AlbumUrl60}
                        genre={artistdata.AlbumGenre}
                        release={artistdata.AlbumRelease}
                        trackName={artistdata.trackName}
                        
                    />
                        
                )
                )}
                </Grid>
            </Grid> 
            
        </Grid>
    )
}

export default Songs;