import React, {useState, useEffect, useRef} from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/playlists.css';
import Button from '@material-ui/core/Button';

const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);
    const [playlist, setPlaylist] = useState(null);
    const [open, setOpen] = useState(false);
    const inputIsPublic = useRef(null);
    useEffect(() => {
        axios.get('/api/v1/playlist', {
            params: {
                id: 2
            }
        })
        .then(response => {
            console.log(response.data.Playlists);
            setPlaylists(response.data.Playlists);
            
        })
    },[]);

    const handleOpen = () => setOpen(!open);
    const handleClose = () => setOpen(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const is_public = event.target.isPublic.value;
        const playlist = event.target.playlist.value;
        const customer_id = event.target.customer_id.value;
        axios.patch('/api/v1/playlist/', {
            id: playlist,
            isPublic: is_public,
            customer_id: customer_id
        })
        .then(response => {
            console.log(response.data);
            setPlaylists(response.data[0].Playlists);
            handleClose();
        })
    }

    return(
        <div>
            <ul>
                {playlists.map(playlist => (
                    <button key={playlist.id}><Link to={"/playlist/" + playlist.name }>{playlist.name}</Link></button>
                ))}
                
            </ul>
            <table className="table">
                <thead>
                    <tr>
                        <th>プレイリスト名</th>
                        <th>公開設定</th>
                        <th><SettingsIcon 
                                color="disabled"
                                fontSize="large"
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {playlists.map(playlist => (
                        <tr key={playlist.id.toString()}>
                            <td>{playlist.name}</td>
                            {playlist.isPublic ? <td>公開</td> : <td>非公開</td> }
                            <td><button  onClick={handleOpen}>
                                    <SettingsApplicationsIcon 
                                    color="disabled"
                                    fontSize="large"
                                    />
                                </button>
                            </td>
                            <td className={open? "showform" : "hiddenform"}>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="isPublic">
                                        <input type="hidden" name="playlist" value={playlist.id} />
                                        <input type="hidden" name="customer_id" value={playlist.customerId} />
                                        <input type="radio" name="isPublic" value="true" defaultChecked={playlist.isPublic? "checked": null}/>公開
                                        <input type="radio" name="isPublic" value="false" defaultChecked={playlist.isPublic? null: "checked"}/>非公開
                                    </label>
                                    <Button type="submit" variant="contained" color="primary" >
                                        更新
                                    </Button>
                                </form>
                            </td>
                        </tr>
                    ))}
                    <tr>

                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Playlists