import { host } from '../../constants';

export const Copy = (nodes, rootDocKey, storeId) => {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: `${host}/api/Catalog/Copy?storeId=${storeId}&rootDocKey=${rootDocKey}&username=${localStorage.username}&token=${localStorage.token}`,
    data: JSON.stringify(nodes),
    contentType: 'application/json',
  })
  .done(function (data) { 
    if (data.Result === 0) {
      return Promise.resolve();
    } 
    return Promise.reject(data.Message);
  })
  .fail(function (data) {
    if (data.status == '401') {
      localStorage.clear()
      window.location.href = '/'
    }
    const error = JSON.parse(data.responseText);
    return Promise.reject(`${error.Message} ${error.ExceptionMessage}`);
  })
};
