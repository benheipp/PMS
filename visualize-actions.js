// Testing
var url = 'http://localhost:65515'

// Production
// var url = 'http://192.168.2.16:84'

function getNodes (nodeLevel, docKey, nodeName, storeId, disabled, showDisabled, callback) {
  $.getJSON(url + '/api/Pms/Get', { nodeLevel: nodeLevel, storeId: storeId, disabled: disabled, showDisabled: showDisabled, docKey: docKey, token: localStorage.token })
      .done(function (data) { callback(data, docKey, nodeName) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function getNodeList (nodeLevel, docKey, nodeName, storeId, disabled, callback) {
  $.getJSON(url + '/api/Pms/GetList', { storeId: storeId, disabled: disabled, docKey: docKey, token: localStorage.token })
      .done(function (data) { callback(data, docKey, nodeName) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetPendingCatalog (callback) {
  $.getJSON(url + '/api/Pms/GetPendingCatalog', {token: localStorage.token})
      .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function getComponentProducts (docKey, componentName, storeId, callback) {
  return $.getJSON(url + '/api/Pms/GetComponent', { docKey: docKey, storeId: storeId, token: localStorage.token })
      .done(function (data) { callback(data, componentName) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function saveNode (node, nodeLevel, newNode, newNodeKey, oldCatalogType, selectedCatalogType, storeId, callback) {
  return $.getJSON(url + '/api/Pms/SaveNode', { docKey: node.doc_key, oldNode: node.name, newNode: newNode, oldNodeKey: node.name_key, newNodeKey: newNodeKey, oldCatalogType: oldCatalogType, selectedCatalogType: selectedCatalogType, username: localStorage.username, storeId: storeId, token: localStorage.token })
      .done(function (data) { callback(data, node, nodeLevel) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function rollback (docKey, oldNode, newNode, newNodeKey, catalogId, callback) {
  return $.getJSON(url + '/api/Pms/SaveNode', { docKey: docKey, oldNode: oldNode, newNode: newNode, newNodeKey: newNodeKey, catalogId: catalogId, username: localStorage.username, rollback: true, token: localStorage.token })
      .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveComponentData (docKey, component, refId, refQty, nodeName, nodeLevel, sku, storeId, callback) {
  return $.getJSON(url + '/api/Pms/SaveComponentData', { docKey: docKey, docId: component.id, oldRefId: component.RefId, refId: refId, oldRefQty: component.RefQty, refQty: refQty, oldSku: component.Sku, sku: sku, username: localStorage.username, storeId: storeId, token: localStorage.token })
  .done(function (data) { callback(data, docKey, nodeName, nodeLevel) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function rollbackComponentData (docKey, docId, oldRefId, refId, oldRefQty, refQty, oldSku, sku, callback) {
  return $.getJSON(url + '/api/Pms/SaveComponentData', { docKey: docKey, docId: docId, oldRefId: oldRefId, refId: refId, oldRefQty: oldRefQty, refQty: refQty, oldSku: oldSku, sku: sku, username: localStorage.username, rollback: true, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function saveProduct (productData, newName, newDescription, docId, storeId, sku, callback) {
  return $.getJSON(url + '/api/Pms/SaveProduct', { oldName: productData.name, oldDescription: productData.description, newName: newName, newDescription: newDescription, docId: docId, docKey: productData.docKey, username: localStorage.username, storeId: storeId, sku: sku, token: localStorage.token })
      .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function rollBackProduct (oldName, oldDescription, newName, newDescription, docId, docKey, callback) {
  return $.getJSON(url + '/api/Pms/SaveProduct', { oldName: oldName, oldDescription: oldDescription, newName: newName, newDescription: newDescription, docId: docId, docKey: docKey, rollback: true, username: localStorage.username, token: localStorage.token })
      .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveBreadCrumbText (docKey, breadCrumbText, storeId, callback) {
  return $.getJSON(url + '/api/Pms/SaveBreadCrumbText', { docKey: docKey, breadCrumbText: breadCrumbText, storeId: storeId, username: localStorage.username, token: localStorage.token })
      .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetBreadCrumbText (docKey, storeId, callback) {
  return $.getJSON(url + '/api/Pms/GetBreadCrumbText', { docKey: docKey, storeId: storeId, token: localStorage.token })
      .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetStoreLookups (callback) {
  return $.getJSON(url + '/api/Pms/GetStoreLookups', { token: localStorage.token })
      .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetCatalogNodeTypes (callback) {
  return $.getJSON(url + '/api/Pms/GetCatalogNodeTypes', { token: localStorage.token })
      .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveStore (docKey, storeId, chk, callback) {
  document.getElementById('ThisIsTesting').style.display = 'block'
  return $.getJSON(url + '/api/Pms/SaveStore', { docKey: docKey, storeId: storeId, chk: chk, token: localStorage.token })
        .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveStoreComponent (docId, storeId, chk, callback) {
  return $.getJSON(url + '/api/Pms/SaveStoreComponent', { docId: docId, storeId: storeId, chk: chk, token: localStorage.token })
        .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetNodeHistory (catalogId, callback) {
  return $.getJSON(url + '/api/Pms/GetNodeHistory', { catalogId: catalogId, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetComponentHistory (docId, callback) {
  return $.getJSON(url + '/api/Pms/GetComponentHistory', { docId: docId, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetComponentProductHistory (docId, callback) {
  return $.getJSON(url + '/api/Pms/GetComponentProductHistory', { docId: docId, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function Login (username, password, cb, callback) {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url:`${url}/api/Account/Login?username=${username}`,
    data: JSON.stringify(password),
    contentType: 'application/json'
  })
  .done(function (data) { callback(data, cb) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function ResetPassword(username, callback) {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: `${url}/api/Account/ResetPassword?username=${username}`,
    contentType: 'application/json',
  })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SetPassword(username, password, callback) {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: `${url}/api/Account/SetPassword?username=${username}&token=${localStorage.token}`,
    data: JSON.stringify(password),
    contentType: 'application/json',
  })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetCurrentImportStatus (callback) {
  return $.getJSON(url + '/api/Pms/GetCurrentImportStatus', {token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetCurrentVendorImportStatus (callback) {
  return $.getJSON(url + '/api/Pms/GetCurrentVendorImportStatus', {token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function UpdateSendToWebFlag (send_flag, status_message, selectedStore, callback) {
  return $.getJSON(url + '/api/Pms/UpdateSendToWebFlag', {send_flag: send_flag, status_message: status_message, selectedStore: selectedStore, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function UpdateWebSent (webSentFlag, storeId, callback) {
  return $.getJSON(url + '/api/Pms/UpdateWebSent', {webSentFlag: webSentFlag, storeId: storeId, token: localStorage.token })
  .done(function (data) { callback(data, webSentFlag) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function UpdateImportFlag (vendor, import_flag, status_message, callback) {
  console.log(vendor)
  return $.getJSON(url + '/api/Pms/UpdateImportFlag', {vendor: vendor, import_flag: import_flag, status_message: status_message, username: localStorage.username, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function AutoCompleteQuery (searchValue, searchVendors, callback) {
  return $.getJSON(url + '/api/Pms/AutoCompleteQuery', {value: searchValue, searchVendors: searchVendors, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function CopyAutoCompleteQuery (value, store_id, callback) {
  return $.getJSON(url + '/api/Pms/CopyAutoComplete', {value: value, store_id: store_id, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function Copy (nodeValue, originDocKey, destinationDocKey, store_id, callback) {
  return $.getJSON(url + '/api/Pms/Copy', {nodeValue: nodeValue, originDocKey: originDocKey, destinationDocKey: destinationDocKey, username: localStorage.username, store_id: store_id, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function CopyStore0 (nodeValue, originDocKey, destinationDocKey, store_id, destination_store_id, callback) {
  return $.getJSON(url + '/api/Pms/Copy', {nodeValue: nodeValue, originDocKey: originDocKey, destinationDocKey: destinationDocKey, username: localStorage.username, store_id: store_id, destination_store_id: destination_store_id, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function Move (nodeValue, originDocKey, destinationDocKey, store_id, callback) {
  return $.getJSON(url + '/api/Pms/Move', {nodeValue: nodeValue, originDocKey: originDocKey, destinationDocKey: destinationDocKey, username: localStorage.username, store_id: store_id, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function MoveMultiple (originDocKeys, destinationDocKey, store_id, callback, errorCallback) {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: `${url}/api/Pms/Move?destinationDocKey=${destinationDocKey}&store_id=${store_id}&username=${localStorage.username}&token=${localStorage.token}`,
    data: JSON.stringify(originDocKeys),
    contentType: 'application/json',
  })
  .done(function (data) { callback(data) })
  .fail(function (data) {
    if (data.status == '401') {
      localStorage.clear()
      window.location.href = '/'
    } else {
      const error = JSON.parse(data.responseText);
      errorCallback(`${error.Message} ${error.ExceptionMessage}`);
    }
  })
}


function ValidateDocKey (sourceDocKey, targetDocKey, storeId, callback) {
  return $.getJSON(`${url}/api/Pms/DocKeyExists?docKey=${targetDocKey}&storeId=${storeId}&token=${localStorage.token}`)
  .done((data) => { callback(sourceDocKey, data) })
   .fail(function (data) {
    if (data.status == '401') {
      localStorage.clear()
      window.location.href = '/'
    }
  })
}

function AddCatalogTypeRuleByDocKey (docKey, nodeLevel, selectedCatalogType, storeId, callback, errorCallback) {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: `${url}/api/Pms/AddCatalogTypeRuleByDocKey?selectedCatalogType=${selectedCatalogType}&nodeLevel=${nodeLevel}&storeId=${storeId}&username=${localStorage.username}&token=${localStorage.token}`,
    data: JSON.stringify(docKey),
    contentType: 'application/json',
  })
  .done(function (data) { callback(data) })
  .fail(function (data) {
    if (data.status == '401') {
      localStorage.clear()
      window.location.href = '/'
    } else {
      const error = JSON.parse(data.responseText);
      errorCallback(`${error.Message} ${error.ExceptionMessage}`);
    }
  })
}

function UpdateCatalogType (nodes, nodeLevel, selectedCatalogType, storeId, callback, errorCallback) {
  const docKeys = nodes.map(n => n.doc_key);
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: `${url}/api/Pms/UpdateCatalogType?selectedCatalogType=${selectedCatalogType}&nodeLevel=${nodeLevel}&storeId=${storeId}&username=${localStorage.username}&token=${localStorage.token}`,
    data: JSON.stringify(docKeys),
    contentType: 'application/json',
  })
  .done(function (data) { callback(data) })
  .fail(function (data) {
    if (data.status == '401') {
      localStorage.clear()
      window.location.href = '/'
    } else {
      const error = JSON.parse(data.responseText);
      errorCallback(`${error.Message} ${error.ExceptionMessage}`);
    }
  })
}

function MoveStore0 (nodeValue, originDocKey, destinationDocKey, store_id, destination_store_id, callback) {
  return $.getJSON(url + '/api/Pms/Move', {nodeValue: nodeValue, originDocKey: originDocKey, destinationDocKey: destinationDocKey, username: localStorage.username, store_id: store_id, destination_store_id: destination_store_id, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetProductAndEntities (doc_key, storeId, callback) {
  return $.getJSON(url + '/api/Pms/GetProductAndEntities', {doc_key: doc_key, storeId: storeId, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetVendorList (callback) {
  return $.getJSON(url + '/api/Pms/GetVendorList', { token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401' || data.status == '0') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveProductMaster (newName, oldName, id, docKey, storeId, callback) {
  return $.getJSON(url + '/api/Pms/SaveProductMaster', {newProductName: newName, oldProductName: oldName, id: id, docKey: docKey, username: localStorage.username, storeId: storeId, token: localStorage.token })
  .done(function (data) { callback(data, newName) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function RollbackProductMaster (newName, oldName, id, docKey, callback) {
  return $.getJSON(url + '/api/Pms/SaveProductMaster', {newProductName: newName, oldProductName: oldName, id: id, docKey: docKey, username: localStorage.username, rollback: true, token: localStorage.token })
  .done(function (data) { callback(data, newName) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetProductMasterHistory (id, callback) {
  return $.getJSON(url + '/api/Pms/GetProductMasterHistory', {id: id, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetUserStats (username, callback) {
  return $.getJSON(url + '/api/Pms/GetUserStats', {username: username, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveUserInfo (username, userId, firstname, lastname, email, callback) {
  return $.getJSON(url + '/api/Pms/SaveUserInfo', {username: username, userId: userId, firstname: firstname, lastname: lastname, email: email, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetAllUsers (callback) {
  return $.getJSON(url + '/api/Pms/GetAllUsers', {token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveUserPermission (username, userId, permissionId, chkValue, callback) {
  return $.getJSON(url + '/api/Pms/SaveUserPermission', {username: username, userId: userId, permissionId: permissionId, chkValue: chkValue, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveEnabled (username, userId, chkValue, callback) {
  return $.getJSON(url + '/api/Pms/SaveEnabled', {username: username, userId: userId, chkValue: chkValue, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function IsUniqueUsername (username, callback) {
  return $.getJSON(url + '/api/Pms/IsUniqueUsername', {username: username, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function AddUser (username, password, firstname, lastname, email, callback) {
  return $.getJSON(url + '/api/Pms/AddUser', {username: username, password: password, firstname: firstname, lastname: lastname, email: email, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetDataAnalysisStats (callback) {
  return $.getJSON(url + '/api/Pms/DataAnalysisStats', {token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetDataAnalysisDetails (type, callback) {
  return $.getJSON(url + '/api/Pms/GetDataAnalysisDetails', {type: type, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveCatEntity (type, id, name, callback) {
  return $.getJSON(url + '/api/Pms/SaveCatEntity', {type: type, id: id, name: name, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveProdEnt (originalDocKey, newDocKey, sku, name, callback) {
  return $.getJSON(url + '/api/Pms/SaveProdEnt', {originalDocKey: originalDocKey, newDocKey: newDocKey, sku: sku, name: name, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveDisabled (docKey, disabledVal, node, nodeLevel, storeId, callback) {
  return $.getJSON(url + '/api/Pms/SaveDisabled', {docKey: docKey, disabledVal: disabledVal, username: localStorage.username, storeId: storeId, token: localStorage.token })
  .done(function (data) { callback(data, node, nodeLevel) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveLocked (docKey, lockedVal, node, nodeLevel, storeId, callback) {
  return $.getJSON(url + '/api/Pms/SaveLocked', {docKey: docKey, lockedVal: lockedVal, username: localStorage.username, storeId: storeId, token: localStorage.token })
  .done(function (data) { callback(data, node, nodeLevel) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function UpdateEditingFlag (type, flag, doc_key, store_id) {
  return $.getJSON(url + '/api/Pms/UpdateEditingFlag', {type: type, flag: flag, username: localStorage.username, doc_key: doc_key, store_id: store_id, token: localStorage.token })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetProductList (doc_key, storeId, callback) {
  return $.getJSON(url + '/api/Pms/GetProductList', {doc_key: doc_key, storeId: storeId, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function SaveProductEntityData (docKey, sku, edited_field, old_value, new_value, store_id, prodEntityId, callback) {
  return $.getJSON(url + '/api/Pms/SaveProductEntityData', {docKey: docKey, sku: sku, edited_field: edited_field, old_value: old_value, new_value: new_value, store_id: store_id, username: localStorage.username, prodEntityId: prodEntityId, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function AddCatalogTypeRule (type_id, nodeLevel, vendor, store_id, callback) {
  return $.getJSON(url + '/api/Pms/AddCatalogTypeRule', {type_id: type_id, nodeLevel: nodeLevel, vendor: vendor, store_id: store_id, username: localStorage.username, token: localStorage.token })
  .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function ExportToExcel (nodeLevel, docKey, nodeName, storeId, disabled, showDisabled, callback) {
  $.getJSON(url + '/api/Pms/ExportToExcel', { nodeLevel: nodeLevel, storeId: storeId, disabled: disabled, showDisabled: showDisabled, docKey: docKey, token: localStorage.token })
      .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetRuleTypes (callback) {
  $.getJSON(url + '/api/Rule/GetRuleTypes', { token: localStorage.token })
    .done(function (data) { callback(data) })
  .fail(function (data) {
    if (data.status === '401') {
      localStorage.clear()
      window.location.href = '/'
    }
  })
}

function GetRules (callback) {
  $.getJSON(url + '/api/Rule/GetRules', { token: localStorage.token })
    .done(function (data) { callback(data) })
  .fail(function (data) {
    if (data.status === '401') {
      localStorage.clear()
      window.location.href = '/'
    }
  })
}

function GetRulesByType (type, callback) {
  $.getJSON(url + '/api/Pms/GetRulesByType', { type: type, token: localStorage.token })
      .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}

function GetMissingCatalogTypes (callback) {
  $.getJSON(url + '/api/Pms/GetMissingCatalogTypes', { token: localStorage.token })
      .done(function (data) { callback(data) })
   .fail(function (data) {
     if (data.status == '401') {
       localStorage.clear()
       window.location.href = '/'
     }
   })
}
