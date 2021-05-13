import React, { useEffect } from 'react';
import ColorThief from 'colorthief'

var color = [255, 0, 0];

const Info = ({ spotify }) => {
    const [data, setData] = React.useState();
    const [features, setFeatures] = React.useState();
    // const [color, setColor] = React.useState();
    // const [title, setTitle] = React.useState();
    // const [artists, setArtists] = React.useState();
    // const [album, setAlbum] = React.useState();
    // const [art, setArt] = React.useState();
    // const [track, setTrack] = React.useState();
    const colorThief = new ColorThief()


    var title = '';
    var artists = '';
    var album = '';
    var art = '';
    var track = '';
    // var color = '';
    // var info = spotify.getMyCurrentPlayingTrack().then(
    //     function (data) {
    //         return data.json;
    //     },
    //     function (err) {
    //         console.error(err)
    //     }
    //   );

    const getData = async () => {
        const data = await spotify.getMyCurrentPlayingTrack()
        setData(data)
    }
    // console.log(spotify)
    // useEffect(() => { 

    getData()
    if (data) {
        // console.log(data)
        // console.log('test')
        title = data['item']['name'];
        // setTitle(title)
        artists = data['item']['artists'][0]['name']
        for (var i = 1; i < data['item']['artists'].length; i++) {
            artists = artists.concat(', ')
            artists = artists.concat(data['item']['artists'][i]['name'])
        }
        // setArtists(artists)
        album = data['item']['album']['name'];
        // setAlbum(album)
        art = data['item']['album']['images'][0]['url'];
        // setArt(art)
        track = data['item']['id']
        // setTrack(track)
        // const img = resolve(process.cwd(), art);
        var img = new Image()
        img.crossOrigin = "Anonymous"
        img.src = art

        if (img.complete) {
            color = colorThief.getColor(img)
            // setColor(color)
        }
        // .then(color => { console.log(color) })
        // .catch(err => { console.log(err) })
    }
    // console.log(color)
    // }, [data])
    // console.log(title)
    // const getFeatures = async () => {
    //     const features = await spotify.getAudioFeaturesForTrack(track)
    //     setFeatures(features)
    // }
    // getFeatures()
    // if (features) {
    //     var featureList = ["acousticness", "danceability", "energy", "instrumentalness", "key", 
    //                     "liveness", "loudness", "mode", "speechiness", "tempo", "time_signature", "valence"]
    //     var feat = ""
    //     for (var i = 0; i < featureList.length; i++) {
    //     feat = feat.concat(featureList[i])
    //     feat = feat.concat(": ")
    //     feat = feat.concat(features[featureList[i]])
    //     feat = feat.concat(" ")
    //     }
    // }

    // console.log(data)
    // if (info) {
    //     title = info['item']['name']
    // } 
    return (
        <div class="Info">
            <img src={art} width="450" height="450"></img>
            <div>
                <a>{title}</a><br></br>
                <a>{artists}</a><br></br>
                <a>{album}</a><br></br>
                {/* <a>{feat}</a> */}
            </div>
        </div>
    );
}

export { color };

export default Info