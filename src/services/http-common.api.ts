import axios from 'axios';

const API_URL = `${process.env.REACT_APP_AWS_DEV_URL_MESSAGES_API}/${process.env.API_VERSION}`;

export default axios.create({
  baseURL: API_URL,
	headers: {
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET',
		'Access-Control-Allow-Headers': 'application/json',
	},
});