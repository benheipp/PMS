function getNodes(nodeLevel, docKey, nodeName, callback) {
    $.getJSON('http://localhost:65515/api/Pms/Get', { nodeLevel: nodeLevel, docKey: docKey, token: localStorage.token })
      .done(function (data) { callback(data, docKey, nodeName); })
      .fail(function (data) {
          if (data.status == '401') {
              localStorage.clear();
              window.location.href = "/login";
          }
      });
}

function getComponentProducts(docKey, componentName, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/GetComponent', { docKey: docKey, token: localStorage.token })
      .done(function (data) { callback(data, componentName); })
      .fail(function (data) { console.log('getNodes error: ' + data) });
}

function saveNode(node, nodeLevel, newNode, newNodeKey, catalogId, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/SaveNode', { docKey: node.doc_key, oldNode: node.name, newNode: newNode, newNodeKey: newNodeKey, catalogId: catalogId, username: localStorage.username, token: localStorage.token })
      .done(function (data) { callback(data, node, nodeLevel); })
      .fail(function (data) { callback(data, node, nodeLevel); });
}

function rollback(docKey, oldNode, newNode, newNodeKey, catalogId, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/SaveNode', { docKey: docKey, oldNode: oldNode, newNode: newNode, newNodeKey: newNodeKey, catalogId: catalogId, username: localStorage.username, rollback: true, token: localStorage.token })
      .done(function (data) { callback(data); })
      .fail(function (data) { callback(data); });
}

function SaveComponentData(docKey, component, refId, refQty, nodeName, nodeLevel, sku, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/SaveComponentData', { docKey: docKey, docId: component.id, oldRefId: component.RefId, refId: refId, oldRefQty: component.RefQty, refQty: refQty, oldSku: component.Sku, sku: sku, username: localStorage.username, token: localStorage.token })
  .done(function (data) { callback(data, docKey, nodeName, nodeLevel); })
  .fail(function (data) { callback(data, docKey, nodeName, nodeLevel); });
}

function rollbackComponentData(docKey, docId, oldRefId, refId, oldRefQty, refQty, oldSku, sku, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/SaveComponentData', { docKey: docKey, docId: docId, oldRefId: oldRefId, refId: refId, oldRefQty: oldRefQty, refQty: refQty, oldSku: oldSku, sku: sku, username: localStorage.username, rollback: true, token: localStorage.token })
  .done(function (data) { callback(data); })
  .fail(function (data) { callback(data); });
}

function saveProduct(productData, newName, newDescription, docId, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/SaveProduct', { oldName: productData.name, oldDescription: productData.description, newName: newName, newDescription: newDescription, docId: docId, docKey: productData.docKey, username: localStorage.username, token: localStorage.token })
      .done(function (data) { callback(data); })
      .fail(function (data) { callback(data); });
}

function rollBackProduct(oldName, oldDescription, newName, newDescription, docId, docKey, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/SaveProduct', { oldName: oldName, oldDescription: oldDescription, newName: newName, newDescription: newDescription, docId: docId, docKey: docKey, rollback: true, username: localStorage.username, token: localStorage.token })
      .done(function (data) { callback(data); })
      .fail(function (data) { callback(data); });
}

function SaveBreadCrumbText(docKey, breadCrumbText, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/SaveBreadCrumbText', { docKey: docKey, breadCrumbText: breadCrumbText, token: localStorage.token })
      .done(function (data) { callback(data); })
      .fail(function (data) { callback(data); });
}

function GetBreadCrumbText(docKey, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/GetBreadCrumbText', { docKey: docKey, token: localStorage.token })
      .done(function (data) { callback(data); })
      .fail(function (data) { console.log('GetBreadCrumbText error: ' + data) });
}

function GetStoreLookups(callback) {
    return $.getJSON('http://localhost:65515/api/Pms/GetStoreLookups', { token: localStorage.token })
      .done(function (data) { callback(data); })
      .fail(function (data) { console.log('GetStoreLookups error: ' + data) });
}

function SaveStore(docKey, storeId, chk, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/SaveStore', { docKey: docKey, storeId: storeId, chk: chk, token: localStorage.token })
        .done(function(data) { callback(data); })
        .fail(function(data) { callback(data); });
}

function SaveStoreComponent(docId, storeId, chk, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/SaveStoreComponent', { docId: docId, storeId: storeId, chk: chk, token: localStorage.token })
        .done(function (data) { callback(data); })
        .fail(function (data) { callback(data); });
}

function GetNodeHistory(catalogId, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/GetNodeHistory', { catalogId: catalogId, token: localStorage.token })
  .done(function (data) { callback(data); })
  .fail(function (data) { console.log('GetNodeHistory error: ' + data) });
}

function GetComponentHistory(docId, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/GetComponentHistory', { docId: docId, token: localStorage.token })
  .done(function (data) { callback(data); })
  .fail(function (data) { console.log('GetComponentHistory error: ' + data) });
}

function GetComponentProductHistory(docId, callback) {
    return $.getJSON('http://localhost:65515/api/Pms/GetComponentProductHistory', { docId: docId, token: localStorage.token })
  .done(function (data) { callback(data); })
  .fail(function (data) { console.log('GetComponentProductHistory error: ' + data) });
}

function Login(username, password, cb, callback) {
    return $.getJSON('http://localhost:65515/api/Account/Login', { username: username, password: password, token: localStorage.token })
  .done(function (data) { callback(data,cb); })
  .fail(function (data) { callback(data,cb); });
}

function GetCurrentImportStatus(callback){
      return $.getJSON('http://localhost:65515/api/Pms/GetCurrentImportStatus', {token: localStorage.token })
  .done(function (data) { callback(data); })
   .fail(function (data) {
          if (data.status == '401') {
              localStorage.clear();
              window.location.href = "/login";
          }
      });
 }

   function UpdateSendToWebFlag(send_flag,status_message,callback){
      return $.getJSON('http://localhost:65515/api/Pms/UpdateSendToWebFlag', {send_flag: send_flag, status_message: status_message, token: localStorage.token })
  .done(function (data) { callback(data); })
   .fail(function (data) {
          if (data.status == '401') {
              localStorage.clear();
              window.location.href = "/login";
          }
      });
 }
