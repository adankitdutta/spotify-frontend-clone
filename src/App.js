import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import {getTokenFromUrl} from './spotify';
import Player from './Player';
import {useDataLayerValue} from './DataLayer';

import SpotifyWebApi from "spotify-web-api-js";

const spotify=new SpotifyWebApi();

function App() {

  const [{user,token,playlists,discover_weekly},dispatch]=useDataLayerValue();

  useEffect(()=>{
    const hash=getTokenFromUrl();
    window.location.hash="";
    const _token=hash.access_token;

    if(_token)
    {
      dispatch({
        type:"SET_TOKEN",
        token:_token
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then((user)=>{
        

        dispatch({
          type :'SET_USER',
          user: user,
        })
      });

      spotify.getUserPlaylists().then((playlists)=>{
        dispatch({
          type:'SET_PLAYLISTS',
          playlists:playlists,
        });
      });

      spotify.getPlaylist('37i9dQZEVXcU6enJRBGI0z').then(response=>{
        dispatch({
          type:'SET_DISCOVER_WEEKLY',
          discover_weekly:response,
        });
      });

    }

},[]);



  return (
    <div className="app">
    {token?
    <Player spotify={spotify}/>
    : <Login/> }
     
    </div>
  );
}

export default App;
