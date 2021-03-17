import React, { Component } from "react";
import AlbumsDataService from "../services/albums.service";

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getAlbum = this.getAlbum.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateAlbum = this.updateAlbum.bind(this);
    this.deleteAlbum = this.deleteAlbum.bind(this);

    this.state = {
      currentAlbum: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getAlbum(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAlbum: {
          ...prevState.currentAlbum,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentAlbum: {
        ...prevState.currentAlbum,
        description: description
      }
    }));
  }

  getAlbum(id) {
    AlbumsDataService.get(id)
      .then(response => {
        this.setState({
          currentAlbum: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentAlbum.id,
      title: this.state.currentAlbum.title,
      description: this.state.currentAlbum.description,
      published: status
    };

    AlbumsDataService.update(this.state.currentAlbum.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentAlbum: {
            ...prevState.currentAlbum,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAlbum() {
    AlbumsDataService.update(
      this.state.currentAlbum.id,
      this.state.currentAlbum
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Album was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAlbum() {    
    AlbumsDataService.delete(this.state.currentAlbum.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/albums')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentAlbum } = this.state;

    return (
      <div>
        {currentAlbum ? (
          <div className="edit-form">
            <h4>Album</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentAlbum.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentAlbum.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentAlbum.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentAlbum.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteAlbum}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateAlbum}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Album...</p>
          </div>
        )}
      </div>
    );
  }
}