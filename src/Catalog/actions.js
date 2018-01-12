import { host } from '../constants';

export function getNode(docKey, storeId) {
  return $.getJSON(`${host}/api/Catalog/GetNode`, { token: localStorage.token, docKey, storeId });
}
