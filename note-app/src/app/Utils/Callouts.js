import axios from "axios";
import { getObjectRoute } from "../Utils/Utils";
import { store } from "../store";
import {
  onDataLoad,
  onCurrentRecordLoad,
  onRecordEdit,
} from "../Slices/AppSlice";
import { log } from "util";

export const userLogin = async (body) => {
  try {
    const response = await axios.post(
      `http://localhost:6002/users/login`,
      body,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getRecords = async (object, id = null) => {
  const recordIdUrl = id == null ? "" : `/?id="${id}"`;
  const route = getObjectRoute(object);

  try {
    const response = await axios.get(
      `http://localhost:6002/records/${route}${recordIdUrl}`
    );

    if (id) {
      store.dispatch(onCurrentRecordLoad(response.data));
    } else {
      store.dispatch(
        onDataLoad({ object, data: response.data, bulkLoad: true })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const createRecord = async (object, data) => {
  const route = getObjectRoute(object);

  const body = {
    title: data.title,
    description: data.description,
    event: data.event.id,
    template: data.template.id,
  };

  try {
    const response = await axios.post(
      `http://localhost:6002/records/${route}`,
      body
    );
    store.dispatch(
      onDataLoad({ object, data: response.data, bulkLoad: false })
    );

    // return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateRecord = async (object, id, data) => {
  let body = {};
  console.log("UPDATE");

  if (Array.isArray(data.content)) {
    body = {
      content: data,
    };
  } else {
    body = {
      title: data.title,
      description: data.description,
      event: data.event.id,
      template: data.template.id,
      content: data.content,
    };
  }
  console.log(body);

  const route = getObjectRoute(object);
  try {
    const response = await axios.post(
      `http://localhost:6002/records/${route}/?id="${id}"`,
      body
    );
    store.dispatch(onCurrentRecordLoad(response.data));

    // return response.data;
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
  getRecords(object);
};

// export const refreshSummary = async (id, content) => {
//   const body = {
//     content,
//   };

//   try {
//     let response = await axios.delete(
//       `http://localhost:6002/summary/${id}`,
//       body
//     );
//   } catch (error) {
//     console.log(error);
//   }
//   getRecords(object);
// };
