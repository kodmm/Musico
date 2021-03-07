import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import axios from 'axios'
const ArtistData = (props) => {

    const history = useHistory();
    
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
    const [playlistValue, setPlaylistValue] = useState(null);

    const handlePlaylistChange = e => {
        setPlaylistValue(e.target.selectedOptions[0].text);
       
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

    return(
        
        <div className={props.id ? 'album': 'noalbum'}>
            <div className="flex">
                <img src={props.albumUrl} alt={props.album} className="albumImage"/>
                <div>
                    <p>ジャンル: <b>{props.genre}</b></p>
                </div>
                
            </div>
            <div className="mask">
                <div className="caption">
                    <p>{props.album}</p>
                    <div className="favorite">
                        <form onSubmit={event => favoriteSubmit(event)}>
                            
                                <input type="hidden" name="customer_id" value="2" />
                                <input type="hidden" name="track_id" value={props.id} />
                                <input type="hidden" name="name" value={props.trackName} />
                                <input type="hidden" name="artist_name" value={props.name} />
                                <input type="hidden" name="album_name" value={props.album} />
                                <input type="hidden" name="album_url" value={props.AlbumUrl60} />
                                <input type="hidden" name="genre" value={props.genre} />
                                <input type="hidden" name="release_at" value={props.release} />
                        
                            <button type="submit"><FavoriteBorderIcon /></button>
                        </form>
                    </div>
                    <div className="playlist">
                        <form onSubmit={handlePlaylistSubmit}>
                            
                                <input type="hidden" name="customer_id" value="2" />
                                <input type="hidden" name="track_id" value={props.id} />
                                <input type="hidden" name="name" value={props.trackName} />
                                <input type="hidden" name="artist_name" value={props.name} />
                                <input type="hidden" name="album_name" value={props.album} />
                                <input type="hidden" name="album_url" value={props.AlbumUrl60} />
                                <input type="hidden" name="genre" value={props.genre} />
                                <input type="hidden" name="release_at" value={props.release} />
                            
                            <div>
                                <label htmlFor="playlist">Playlist</label>
                                <select name="playlist" onChange={handlePlaylistChange}>
                                    {
                                     playlists.map(playlist => (
                                        <option value={playlist.id} key={playlist.id}>{playlist.name}</option>
                                         
                                     ))
                                    }
                                    
                                    
                                    
                                </select>
                            </div>
                            <Button type="submit" size="small" variant="contained" color="primary">{playlistValue + 'に'}追加</Button>
                        </form>
                    </div>
                    
                </div>
            </div>
            <div>
                <p>アーティスト: <b>{props.name}</b></p>
                <p>曲名: <b>{props.trackName}</b></p>
                <p>リリース日: <b>{props.release}</b></p>
            </div>
            
            
            
        </div>
    );
}

export default ArtistData
