import React, {useState, useEffect, useRef} from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/playlists.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
    grid: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(4)
        
    },
    table: {
        backgroundColor: "#FFFFFF"
    },
    linkBorder: {
        textDecoration: "none",
        color: "rgba(0, 0, 0, 0.87)"
    },
    playlistsNav: {
        backgroundColor: "#f5f5f5"
    },
    playlistNameTable: {
        '&:hover': {
            backgroundColor: "#e8eaf6"
        },
        transition: "all 0.5s"
    },
    playlistCenterCell: {
        textAlign: "center"
    },
    


}))


const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);
    const [playlist, setPlaylist] = useState(null);
    const [open, setOpen] = useState(false);
    const inputIsPublic = useRef(null);

    const classes = useStyles();

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
        <Grid container className={classes.grid}>
            <Grid item md={2} item className={classes.grid}>
                <List component="nav" className={classes.playlistNav}>
                    
                    {playlists.map(playlist => (
                            <Link to={"/playlist/" + playlist.name } className={classes.linkBorder} >
                                <ListItem button><ListItemText primary={playlist.name} /></ListItem>
                            </Link>
                            
                        ))}
                    <Divider />
                    
                </List>
                
            </Grid>
            <Grid item md={7} >
                <TableContainer component={Paper} className={classes.table}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <th>プレイリスト名</th>
                                <th>公開設定</th>
                                <th><SettingsIcon 
                                        color="disabled"
                                        fontSize="large"
                                    />
                                </th>
                                <th></th>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {playlists.map(playlist => (
                                <TableRow key={playlist.id.toString()}>
                                    <TableCell component={Link} to={"/playlist/" + playlist.name } className={classes.linkBorder + " " + classes.playlistNameTable} button>
                                        <Typography variant="body1">{playlist.name}</Typography>
                                    </TableCell>
                                    {playlist.isPublic ? <TableCell className={classes.playlistCenterCell}>公開</TableCell> : <TableCell className={classes.playlistCenterCell}>非公開</TableCell> }
                                    <TableCell className={classes.playlistCenterCell}><button  onClick={handleOpen}>
                                            <SettingsApplicationsIcon 
                                            color="disabled"
                                            fontSize="large"
                                            />
                                        </button>
                                    </TableCell>
                                    
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
                                    
                                    
                                    
                                </TableRow>
                            ))}
                            <tr>

                            </tr>
                        </TableBody>
                    </Table>
                    
                </TableContainer>
            </Grid>
            
        </Grid>
    )
}

export default Playlists