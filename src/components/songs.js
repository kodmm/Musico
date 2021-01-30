import React, {useState } from 'react';
import axios from 'axios';
import PlaylistForm from './playlistForm';
import ArtistData from './artistdata.js';
import '../styles/songs.css';
const Songs = () => {

    let [showPopup, setShowPopup] = useState(false)
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
        <div className="songs">
            <button onClick={() => setShowPopup(!showPopup)} >Create Playlist</button>
            <form
                onSubmit = {e => {
                    e.preventDefault();
                    const artistnameElement = e.target.elements["artist"];
                    console.log(artistnameElement.value);

                    itunesGet(artistnameElement.value);

                    setArtist(artistnameElement.value);

                    artistnameElement.value = '';
       
                }}
            >
                <input type="text" id="artist"
                    placeholder="アーティスト名または曲名を入力してください"
                />
                <button type="submit">検索する</button>


            </form>
            <p className="result">検索結果: <b>{artist}</b></p>
            <div className="searchresult">
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
            </div>
           {showPopup ?
            <PlaylistForm
                closePopup={setShowPopup}
                isPopup={showPopup}
            />
            : null
           }
        </div>
    )
}

export default Songs;