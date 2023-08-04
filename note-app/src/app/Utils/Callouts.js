import axios from "axios";
import { getObjectRoute } from "../Utils/Utils";

export const getRecords = async (object, id = undefined) => {
  const recordIdUrl = id == undefined ? null : `/?id=${id}`;
  const route = getObjectRoute(object);

  try {
    const response = await axios.get(`http://localhost:6002/records/${route}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecord = async (object, id) => {
  const route = getObjectRoute(object);

  try {
    let deleteResponse = await axios.delete(
      `http://localhost:6002/records/${route}/${id}`
    );
  } catch (error) {
    console.log(error);
  }
};
