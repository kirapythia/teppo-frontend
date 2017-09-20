import t from '../locale';


/**
 * An error caused by an invalid request
 * @class InvalidRequestError
 * @extends {Error}
 */
export class ServerResponseError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

/**
 * Parse response object's json body
 * @param {Response} response
 * @return {Promise}
 * @throws {Error}
 */
const parseJSONBody = (response) => {
  if (response.ok) { return response.json(); }
  throw new ServerResponseError(response.statusText, response.status);
};

/**
 * Do a get request
 * @async
 * @param {string} url
 * @return {Promise}
 */
export const get = url => fetch(url, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
});


/**
 * Do a post request
 * @async
 * @param {string} url
 * @param {object} body
 * @return {Promise}
 */
export const post = (url, body) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

/**
 * Do a get request and parse it's body (JSON)
 * @see post
 * @return {object} parsed JSON
 */
export const getJSON = url =>
  get(url)
    .then(parseJSONBody);

/**
 * Do a post request and parse it's body (JSON)
 * @see post
 * @return {object} parsed JSON
 */
export const postJSON = (url, body) =>
  post(url, body)
    .then(parseJSONBody);
