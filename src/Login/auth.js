module.exports = {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }

    loginRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        localStorage.username = res.username
        if (typeof res.permissions.find(this.findImportVisibility) !== 'undefined') { localStorage.ImportVisibility = 'true' } else { localStorage.ImportVisibility = 'false' }

        if (typeof res.permissions.find(this.findCatalogVisibility) !== 'undefined') { localStorage.CatalogVisibility = 'true' } else { localStorage.CatalogVisibility = 'false' }

        if (typeof res.permissions.find(this.findProductVisibility) !== 'undefined') { localStorage.ProductVisibility = 'true' } else { localStorage.ProductVisibility = 'false' }

        if (typeof res.permissions.find(this.findStoreEditing) !== 'undefined') { localStorage.StoreEditing = 'true' } else { localStorage.StoreEditing = 'false' }

        if (typeof res.permissions.find(this.findCatalogEditing) !== 'undefined') { localStorage.CatalogEditing = 'true' } else { localStorage.CatalogEditing = 'false' }

        if (typeof res.permissions.find(this.findProductEditing) !== 'undefined') { localStorage.ProductEditing = 'true' } else { localStorage.ProductEditing = 'false' }

        if (typeof res.permissions.find(this.findUserAdmin) !== 'undefined') { localStorage.UserAdmin = 'true' } else { localStorage.UserAdmin = 'false' }

        if (typeof res.permissions.find(this.findDisable) !== 'undefined') { localStorage.Disable = 'true' } else { localStorage.Disable = 'false' }

        if (typeof res.permissions.find(this.findLock) !== 'undefined') { localStorage.Lock = 'true' } else { localStorage.Lock = 'false' }

        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },
  findImportVisibility (obj) {
    if (obj.permission_id === 1) { return true } else { return false }
  },
  findCatalogVisibility (obj) {
    if (obj.permission_id === 2) { return true } else { return false }
  },
  findProductVisibility (obj) {
    if (obj.permission_id === 3) { return true } else { return false }
  },
  findStoreEditing (obj) {
    if (obj.permission_id === 4) { return true } else { return false }
  },
  findCatalogEditing (obj) {
    if (obj.permission_id === 5) { return true } else { return false }
  },
  findProductEditing (obj) {
    if (obj.permission_id === 6) { return true } else { return false }
  },
  findUserAdmin (obj) {
    if (obj.permission_id === 7) { return true } else { return false }
  },
  findDisable (obj) {
    if (obj.permission_id === 8) { return true } else { return false }
  },
  findLock (obj) {
    if (obj.permission_id === 9) { return true } else { return false }
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    delete localStorage.username
    delete localStorage.ImportVisibility
    delete localStorage.CatalogVisibility
    delete localStorage.ProductVisibility
    delete localStorage.StoreEditing
    delete localStorage.CatalogEditing
    delete localStorage.ProductEditing
    delete localStorage.UserAdmin
    delete localStorage.Disable
    delete localStorage.Lock
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () { }
}

function loginRequest (user, pass, cb) {
  setTimeout(() => {
    Login(user, pass, cb, loginCallbackfunc)
  }, 0)
}

function loginCallbackfunc (data, cb) {
  if (data.token != undefined) {
       // console.log(data);
    cb({
      authenticated: true,
      token: data.token,
      username: data.username,
      permissions: data.PermissionList
    })
  } else {
    cb({ authenticated: false })
  }
}
