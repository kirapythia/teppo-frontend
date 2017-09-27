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
 * Do a put request
 * @async
 * @param {string} url
 * @param {object} body
 * @return {Promise}
 */
export const put = (url, body) => fetch(url, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

/**
 * Do a request and parse it's body
 * @private
 * @param {function} method put, post or get
 * @param {*} props
 */
const requestAndParseJSON = (method, ...props) =>
  method(...props)
    .then(parseJSONBody);

/**
 * Do a get request and parse it's body (JSON)
 * @see post
 * @return {object} parsed JSON
 */
export const getJSON = url => requestAndParseJSON(get, url);

/**
 * Do a post request and parse it's body (JSON)
 * @see post
 * @return {object} parsed JSON
 */
export const postJSON = (url, body) => requestAndParseJSON(post, url, body);

/**
 * Do a put request and parse it's body (JSON)
 * @see put
 * @return {object} parsed JSON
 */
export const putJSON = (url, body) => requestAndParseJSON(put, url, body);
