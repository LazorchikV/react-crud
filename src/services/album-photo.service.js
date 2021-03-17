import http from "../http-photo";

class AlbumsPhotoDataService {
  getAll(id) {
    return http.get(`/photos`);
  }
}
export default new AlbumsPhotoDataService();