import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, useParams } from 'react-router-dom';



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
        <div>
            <div>
            {/* <ul>
                {playlistSongs.map(playlist => (
                    <li><button key={playlist.id}><Link to={"/playlist/" + playlist.name}>{playlist.name}</Link></button></li>
                ))}
                
            </ul> */}
            <h2>{name}</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>ジャケ写</th>
                        <th>曲名</th>
                        <th>アーティスト名</th>
                        <th>アルバム名</th>
                        <th>ジャンル</th>
                        <th>リリース日</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {playlistSongs.map(song => (
                        <tr key={song.id}>
                            <td><img src={song.albumUrl} alt={song.albumName} /></td>
                            <td>{song.name}</td>
                            <td>{song.artistName}</td>
                            <td>{song.albumName}</td>
                            <td>{song.genre}</td>
                            <td>{song.releaseAt}</td>
                            <td><button onClick={() => {handleSongClick(song.Relation.songId, song.Relation.playlistId)}}><DeleteIcon
                                    fontSize="large"
                                    color="secondary" 
                                /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}



export default Playlist;
