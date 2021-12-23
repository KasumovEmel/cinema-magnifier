import axios from "axios";
import { Peoples } from "../pages/peoplePage/PeoplePage";
import { Movies } from "../pages/startPage/StartPage";

const BASE_URL = "http://localhost:3333/favorite/";

export default class FavoriteService {
  static async addFavoriteElement(element: Peoples | Movies, type: string) {
    try {
      const response = await axios.post(BASE_URL + "addElement", {
        element,
        type,
      });
      return await Promise.resolve(response.data);
    } catch (error) {
      console.log(error);
      return await Promise.reject(error);
    }
  }

  static async fetchFavorites() {
    try {
      const response = await axios.get(BASE_URL + "fetchFavorites");
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async getFavoriteActors() {
    try {
      const response = await axios.get(BASE_URL + "addElement");
      return await Promise.resolve(response.data);
    } catch (error) {
      console.log(error);
      return await Promise.reject(error);
    }
  }
}
