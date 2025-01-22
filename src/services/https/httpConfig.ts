export const CONTENT_TYPE = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
}

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-type': CONTENT_TYPE.JSON,
  'X-Requested-With': 'XMLHttpRequest',
}

export const DEFAULT_TIMEOUT = 10000
