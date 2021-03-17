import React, { Component } from "react";
import AlbumsDataService from "../services/albums.service";
import { Link } from "react-router-dom";

export default class AlbumsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveAlbums = this.retrieveAlbums.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAlbum = this.setActiveAlbum.bind(this);
    this.removeAllAlbums = this.removeAllAlbums.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      Albums: [],
      currentAlbum: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveAlbums();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveAlbums() {
    AlbumsDataService.getAll()
      .then(response => {
        this.setState({
          Albums: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAlbums();
    this.setState({
      currentAlbum: null,
      currentIndex: -1
    });
  }

  setActiveAlbum(Album, index) {
    this.setState({
      currentAlbum: Album,
      currentIndex: index
    });
  }

  removeAllAlbums() {
    AlbumsDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    AlbumsDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          Albums: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, Albums, currentAlbum, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>List of albums</h4>
          <ul className="list-group">
            {Albums &&
              Albums.map((Album, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveAlbum(Album, index)}
                  key={index}
                >
                  {Album.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllAlbums}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentAlbum ? (
            <div>
              <h4>List</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentAlbum.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentAlbum.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentAlbum.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/Album/" + currentAlbum.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a List of albums...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}