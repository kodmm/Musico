import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';



const Playlist = () => {
    const { name } = useParams();
    const [playlistSongs, setPlaylistSongs] = useState([]);
    useEffect(() => {
        axios.get('/api/v1/playlist/' + name, {
            params: {
                id: 2
            }
        })
        .then(response => {
            console.log(response.data.Songs);
            setPlaylistSongs(response.data.Songs);
        })
    },[]);

    const handleSongClick = (song_id, playlist_id) => {
        axios.delete(`/api/v1/playlist/relation/${song_id}/${playlist_id} `)
        .then(response => {
            
            setPlaylistSongs(response.data[0].Songs)
        });
    }


    return(
        <Grid container>
            
            {/* <ul>
                {playlistSongs.map(playlist => (
                    <li><button key={playlist.id}><Link to={"/playlist/" + playlist.name}>{playlist.name}</Link></button></li>
                ))}
                
            </ul> */}
            <Grid item md={12}>
                <h2>{name}</h2>
            </Grid>
            <Grid item md={2}></Grid>
            <Grid item md={7} spacing={8}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <th>ジャケ写</th>
                                <th>曲名</th>
                                <th>アーティスト名</th>
                                <th>アルバム名</th>
                                <th>ジャンル</th>
                                <th>リリース日</th>
                                <th></th>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {playlistSongs.map(song => (
                                <TableRow key={song.id}>
                                    <TableCell><img src={song.albumUrl} alt={song.albumName} /></TableCell>
                                    <TableCell>{song.name}</TableCell>
                                    <TableCell>{song.artistName}</TableCell>
                                    <TableCell>{song.albumName}</TableCell>
                                    <TableCell>{song.genre}</TableCell>
                                    <TableCell>{song.releaseAt}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete"  onClick={() => {handleSongClick(song.Relation.songId, song.Relation.playlistId)}}>
                                        <DeleteIcon fontSize="large" color="secondary"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
       
        </Grid>
    )
}



export default Playlist;
