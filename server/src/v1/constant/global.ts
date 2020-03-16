

const SERVER = {
    LIMIT: 10,
    MAX_LIMIT: 100,
    defaultRadius: 30, //in miles
    defaultCurrency: 'usd',
    timeString: 'T23:59:59.000Z',
	timeStringStart: 'T00:00:00.000Z',
	SALT_ROUNDS: 10,
	JWT_SECRET: "74gfwyr2376r2762tr26"
};

const HTTP_CODE = {
	OK: 200,
	CREATED: 201,
	UPDATED: 202,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	ACCESS_FORBIDDEN: 403,
	URL_NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	UNREGISTERED: 410,
	EMAIL_REQUIRED: 411,
	PAYLOAD_TOO_LARGE: 413,
	CONCURRENT_LIMITED_EXCEEDED: 429,
	INTERNAL_SERVER_ERROR: 500,
	BAD_GATEWAY: 502,
	SHUTDOWN: 503,
};

const MODEL = {
	USER: 'users',
	FRIENDS:'friends',
	POST: 'post',
	REPORT:'report',
	MEDIA:'media'

}

export const CONSTANT = Object.freeze({
	MODEL,
	HTTP_CODE,
	SERVER
});