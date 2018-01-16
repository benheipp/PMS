import { host } from '../../constants';

export function SaveTypes(types) {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: `${host}/api/Catalog/SaveTypes?username=${localStorage.username}&token=${localStorage.token}`,
    data: JSON.stringify(types),
    contentType: 'application/json',
  })
  .done(function (data) { return Promise.resolve(data); })
  .fail(function (data) {
    if (data.status == '401') {
      localStorage.clear()
      window.location.href = '/'
    }
  })
}
