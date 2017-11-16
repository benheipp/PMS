import { host } from '../../constants';

export function GetDataChecksData() {
  return $.getJSON(`${host}/api/DataCheck/Get`, {token: localStorage.token});
}

export function StartDataCheck() {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: `${host}/api/DataCheck/Start?token=${localStorage.token}`,
    contentType: 'application/json',
  })
  .done(function (data) { return data; })
}

export function GetDataCheckData(dataCheckId, storeId, vendorId) {
  return $.getJSON(`${host}/api/DataCheck/GetData`, {dataCheckId, storeId, vendorId, token: localStorage.token});
}

export function VerifyDataCheck(storeId) {
  return $.getJSON(`${host}/api/DataCheck/Verify`, {storeId, token: localStorage.token});
}
