import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Link, Switch } from 'react-router-dom';
import AlbumsList from './components/albums-list.component';
import AddAlbum from './components/add-album.component';
import Album from './components/album.component';
import PhotosAlbumList from './components/photos-albums.component';


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/albums" className="navbar-brand">
            Albums
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/albums/:id/photos"} className="nav-link">
                Photos Albums
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add new album
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/albums"]} component={AlbumsList} />
            <Route exact path="/add" component={AddAlbum} />
            <Route exact path="/album/:id" component={Album} />
            <Route exact path="/albums/:id/photos" component={PhotosAlbumList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;