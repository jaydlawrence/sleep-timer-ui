import { username, password } from './password.json';
import qs from 'query-string';
import axios from 'axios';

const BASE_URL = 'https://api.particle.io/';
const AUTH_URL = `${BASE_URL}oauth/token`;
const API_URL = `${BASE_URL}v1/devices/sleeptimer1/`;

let storedAccessToken = '';

const checkGetAndSetAccessToken = async () => {
  if (storedAccessToken) return storedAccessToken;
  var data = qs.stringify({
    grant_type: 'password',
    username,
    password
  });
  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic cGFydGljbGU6cGFydGljbGU=' // This is the fake dev header "particle:particle"
    }
  };

  try {
    const response = await axios.post(AUTH_URL, data, config);
    storedAccessToken = response.data.access_token
  } catch (err) {
    console.error("checkGetAndSetAccessToken -> err", err)
    // TODO handle errors
  }
}

export const getDeviceState = async () => {
  await checkGetAndSetAccessToken();
  try {
    const response = await axios.get(`${API_URL}state?access_token=${storedAccessToken}`);
    const state = response.data.result
    return JSON.parse(state);
  } catch (err) {
    // cleared storedAccessToken if it is old
    if (err.response.status === 401) storedAccessToken = '';
    console.error("getDeviceState -> err", err)
    // TODO handle errors
  }
}

export const postResetDevice = async () => {
  await checkGetAndSetAccessToken();
  try {
    const response = await axios.post(`${API_URL}reset?access_token=${storedAccessToken}`);
  } catch (err) {
    // cleared storedAccessToken if it is old
    if (err.response.status === 401) storedAccessToken = '';
    console.error("getDeviceState -> err", err)
    // TODO handle errors
  }
}

export const postSetPeriod = async period => {
  await checkGetAndSetAccessToken();
  try {
    var data = qs.stringify({
      'arg': period
    });
    const response = await axios.post(`${API_URL}setPeriod?access_token=${storedAccessToken}`, data);
    return response
  } catch (err) {
    // cleared storedAccessToken if it is old
    if (err.response.status === 401) storedAccessToken = '';
    console.error("getDeviceState -> err", err)
    // TODO handle errors
    return { error: err }
  }
}

export const postSetEndTime = async time => {
  await checkGetAndSetAccessToken();
  try {
    var data = qs.stringify({
      'arg': time
    });
    const response = await axios.post(`${API_URL}setEnd?access_token=${storedAccessToken}`, data);
  } catch (err) {
    // cleared storedAccessToken if it is old
    if (err.response.status === 401) storedAccessToken = '';
    console.error("getDeviceState -> err", err)
    // TODO handle errors
  }
}