import { host } from '../../constants';

export function SaveSortOrders(storeId, sortOrders) {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: `${host}/api/Catalog/SaveSortOrders?storeId=${storeId}&username=${localStorage.username}&token=${localStorage.token}`,
    data: JSON.stringify(sortOrders),
    contentType: 'application/json',
  })
  .done(function (data) { return data; })
}
