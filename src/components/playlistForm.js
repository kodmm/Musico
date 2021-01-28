import React from 'react';
import '../styles/popupform.css';
import axios from 'axios';


const PlaylistForm = (props) => {

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
                <div className="popup_inner">
                    <h2>Create Playlist</h2>
                    <button onClick={() => props.closePopup(!props.isPopup)}>Close Popup</button>
                    <form onSubmit={event => handleSubmit(event)}>
                        <div>
                            <label htmlFor="name">Playlist Name</label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div>
                            <label htmlFor="isPublic">みんなに公開しますか？
                                <input type="radio" name="isPublic" value="true" />Yes(Public)
                                <input type="radio" name="isPublic" defaultChecked="checked" value="false" />No(Private)
                            </label>
                        </div>
                        <input type="submit" value=" Playlist Create" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PlaylistForm