import React, { useState } from 'react';
import '../styles/popupform.css';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import { FormControlLabel } from '@material-ui/core';

const PlaylistForm = (props) => {
    const [value, setValue] = useState("false");

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const nameElement = event.target.elements["name"];
        const isPublicElement = event.target.elements["isPublic"];
        axios.post('/api/v1/playlist/', {
            name: nameElement.value,
            isPublic: isPublicElement.value
        })
        .then(response => {
            if(response.data.isCreate){
                nameElement.value = "";
                isPublicElement.value = "";
                console.log(response);
                props.closePopup(!props.isPopup);
            }else{
                console.log(response.msg);
            }
            
        })

    }



    return(
        <div className="playlistform">
            <div className="popup">
                <div className="popup_inner" container>
                    <div >
                        <h2>Create Playlist</h2>
                        <Button variant="outlined" color="secondary" onClick={() => props.closePopup(!props.isPopup)}>Close Popup</Button>
                    </div>
                    <div >
                        <form onSubmit={event => handleSubmit(event)}>
                            <div>
                                <TextField  name="name" id="name" label="Playlist Name" />
                            </div>
                            <div>
                                <FormLabel component="legend">みんなに公開しますか？</FormLabel>
                                    <RadioGroup aria-label="isPublic" name="isPublic" value={value} onChange={handleChange}>
                                        <FormControlLabel value="true" control={<Radio />} label="Yes(Public)" />
                                        <FormControlLabel value="false" control={<Radio />} label="No(Private)" />
                                    </RadioGroup>
                            </div>
                            <Button type="submit" variant="contained" color="primary">Playlist Create</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistForm