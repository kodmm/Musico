import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios'
const ArtistData = (props) => {

    const favoriteSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.elements);
        console.log(event.target.customer_id.value);
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
                            <div>
                                <input type="hidden" name="customer_id" value="2" />
                                <input type="hidden" name="track_id" value={props.id} />
                                <input type="hidden" name="name" value={props.trackName} />
                                <input type="hidden" name="artist_name" value={props.name} />
                                <input type="hidden" name="album_name" value={props.album} />
                                <input type="hidden" name="album_url" value={props.AlbumUrl60} />
                                <input type="hidden" name="genre" value={props.genre} />
                                <input type="hidden" name="release_at" value={props.release} />
                            </div>
                            <button type="submit"><FavoriteBorderIcon /></button>
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
