import { host } from '../../constants';

export function SaveGroups(storeId, parentDocKey, groups) {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: `${host}/api/Catalog/SaveGroups?storeId=${storeId}&parentDocKey=${parentDocKey}&username=${localStorage.username}&token=${localStorage.token}`,
    data: JSON.stringify(groups),
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

export function GetGroups(storeId, parentDocKey, callback) {
  $.getJSON(`${host}/api/Catalog/GetGroups`, {storeId, parentDocKey, token: localStorage.token })
  .done(function (data) { callback(data); })
  .fail(function (data) {
    if (data.status == '401') {
      localStorage.clear()
      window.location.href = '/'
    }
  })
}

export function SaveGroup(docKey, groupId) {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: `${host}/api/Catalog/SaveGroup?docKey=${docKey}&groupId=${groupId}&username=${localStorage.username}&token=${localStorage.token}`,
    data: JSON.stringify(groupId),
    contentType: 'application/json',
  })
  .fail(function (data) {
    if (data.status == '401') {
      localStorage.clear()
      window.location.href = '/'
    }
  })
}
