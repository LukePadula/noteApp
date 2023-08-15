import axios from "axios";
import { getObjectRoute } from "../Utils/Utils";
import { store } from "../store";
import { onDataLoad, onCurrentRecordLoad } from "../Slices/AppSlice";
import Cookies from "js-cookie";
import { NOTE } from "../PredefinedValues";

export const userSignUp = async (body) => {
  try {
    const response = await axios.post(
      `http://localhost:6002/users/signup`,
      body,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return { status: "error" };
  }
};

export const userLogin = async (body) => {
  try {
    const response = await axios.post(
      `http://localhost:6002/users/login`,
      body,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return { status: "error" };
  }
};

export const getRecords = async (object, id = null) => {
  const recordIdUrl = id == null ? "" : `/?id="${id}"`;
  const route = getObjectRoute(object);
  const token = Cookies.get("token");
  const headers = { token: token };

  try {
    const response = await axios.get(
      `http://localhost:6002/records/${route}${recordIdUrl}`,
      {
        headers,
      }
    );

    if (id) {
      console.log("Single data", response.data);
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
  const token = Cookies.get("token");
  console.log(data);

  const body = {
    title: data.title,
    description: data.description,
    event: data.event.id,
    template: data.template.id,
  };
  console.log(JSON.stringify(body));

  const headers = { token: token };

  try {
    const response = await axios.post(
      `http://localhost:6002/records/${route}`,
      body,
      { headers }
    );
    store.dispatch(onDataLoad({ object, data: response.data, bulkLoad: true }));

    // return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateRecord = async (object, id, data) => {
  let body = {};
  console.log("UPDATE", data);
  const token = Cookies.get("token");
  const headers = { token: token };

  if (Array.isArray(data)) {
    body = {
      content: data,
    };
  } else {
    body = {
      title: data.title,
      description: data.description,
      // event: data.event.id,
      content: data,
    };
    console.log(object, "OBJECTG");
    if (object === NOTE) {
      body.event = data.event.id;
    }
  }
  const route = getObjectRoute(object);
  try {
    const response = await axios.post(
      `http://localhost:6002/records/${route}/?id="${id}"`,
      body,
      { headers }
    );
    console.log(response.data, "RESPONSE DATA");
    store.dispatch(onCurrentRecordLoad(response.data));

    // return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecord = async (object, id) => {
  const route = getObjectRoute(object);
  const token = Cookies.get("token");
  const headers = { token: token };

  try {
    let deleteResponse = await axios.delete(
      `http://localhost:6002/records/${route}/${id}`,
      { headers }
    );
  } catch (error) {
    console.log(error);
  }
  getRecords(object);
};

export const getSummary = async (id) => {
  const token = Cookies.get("token");
  const headers = { token: token };
  try {
    let response = await axios.get(`http://localhost:6002/summary/${id}`, {
      headers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const refreshSummary = async (id) => {
  const token = Cookies.get("token");
  console.log(token);
  const headers = { token: token };
  console.log("REFRESHING");
  try {
    let response = await axios.post(`http://localhost:6002/summary/${id}`, {
      headers,
    });
  } catch (error) {
    console.log(error);
  }
};
