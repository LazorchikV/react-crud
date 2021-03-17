import React, { Component } from "react";
import AlbumsPhotoDataService from "../services/album-photo.service";
// http://jsonplaceholder.typicode.com/albums/1/photos 


export default class PhotosAlbumList extends Component {
  constructor(props) {
    super(props);
    this.retrievePhotoAlbums = this.retrievePhotoAlbums.bind(this);
    this.refreshPhotoList = this.refreshPhotoList.bind(this);
    
    this.state = {      
      Album: [{
        id: null,
        title: "",
        url: "",
        thumbnailUrl: ""
      }],
      currentIndex: -1,
    };
  }
    
  componentDidMount() {
    this.retrievePhotoAlbums();
  }

  retrievePhotoAlbums() {
  AlbumsPhotoDataService.getAll()
  .then(response => {
    this.setState({
      Album: response.data
    });
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
}


  refreshPhotoList() {
    this.retrievePhotoAlbums();
    this.setState({
      currentIndex: -1
    });
  }

  render() {
    const { Album, currentIndex } = this.state;

    return (
      <div className="list row">      
        <div className="col-md-6">
          <h4>Photos of albums</h4>
          <ul className="list-group">
            {Album &&
              Album.map((Album, id) => (
                <li
                  className={
                    "list-group-item " +
                    (id === currentIndex ? "active" : "")
                  }              
                  key={id}
                >
                 <h4>List {id + 1}</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {Album.title}
                <div>
                <label>
                  <strong>Img #1:</strong>
                </label>{" "}
                {Album.url}
              </div>
              <div>
                <label>
                  <strong>Img #2:</strong>
                </label>{" "}
                {Album.thumbnailUrl}
              </div>       
              </div>                 
                </li>
              ))}
          </ul>      
        </div>      
      </div>
    );
  }
}