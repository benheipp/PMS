module.exports = {
    login(email, pass, cb) {
        cb = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (cb) cb(true);
            this.onChange(true);
            return;
        }

        loginRequest(email, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                localStorage.username = res.username;
                if (cb) cb(true);
                this.onChange(true);
            } else {
                if (cb) cb(false);
                this.onChange(false);
            }
        });
    },

    getToken() {
        return localStorage.token;
    },

    logout(cb) {
        delete localStorage.token;
        delete localStorage.username;
        if (cb) cb();
        this.onChange(false);
    },

    loggedIn() {
        return !!localStorage.token;
    },

    onChange() { }
}

function loginRequest(user, pass, cb) {
    setTimeout(() => {
        Login(user, pass, cb, loginCallbackfunc);
    }, 0);
}

function loginCallbackfunc(data, cb) {
    if (data.token != undefined) {
        cb({
            authenticated: true,
            token: data.token,
            username: data.username
        });
    } else {
        cb({ authenticated: false });
    }
}