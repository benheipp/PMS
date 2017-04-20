import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, Link, withRouter, IndexRoute } from 'react-router';
import CatalogMain from './visualize';
import ImportMain from '../Import/importmain';
import LoginControl from '../Login/login';
import auth from '../Login/auth';
import ProductMain from '../Product/product';
import UserAdminMain from '../UserAdmin/useradminmain';
import ProductStandAlone from '../Product/product-stand-alone';

const App = React.createClass({
    getInitialState() {
        return {
            loggedIn: auth.loggedIn()
    }
    },
    updateAuth(loggedIn) {
        this.setState({
            loggedIn
        });
    },
    componentWillMount() {
        auth.onChange = this.updateAuth;
        auth.login();
    },
        render: function() {
          var renderImport, renderCatalog, renderProduct;
          if (auth.loggedIn() == true && localStorage.ImportVisibility == 'true'){renderImport = true;} else {renderImport = false;}
          if (auth.loggedIn() == true && localStorage.CatalogVisibility == 'true'){renderCatalog = true;} else {renderCatalog = false;}
          if (auth.loggedIn() == true && localStorage.ProductVisibility == 'true'){renderProduct = true;} else {renderProduct = false;}
            return (<div>
                <div className="navbar navbar-default navbar-static-top">
        <div className="container">
            <div className="navbar-header">
                <img src="src/Images/odn-horizontal.jpg" height="50px"/>
            </div>
            <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  {renderImport ? <li><Link to="import">Import</Link></li> : null}
                  {renderCatalog ? <li><Link to="catalog">Catalog</Link></li> : null}
                  {renderProduct ? <li><Link to="product">Products</Link></li> : null}
            </ul>
             <ul className="nav navbar-nav navbar-right">
                {auth.loggedIn() ? <li><Link to="user"><span className="glyphicon glyphicon-user"></span> {localStorage.username}</Link></li> : null}
                {auth.loggedIn() ? <li><Link to="logout"><span className="glyphicon glyphicon-log-in"></span> Logout</Link></li> : null}
                {!auth.loggedIn() ? <li><Link to="login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li> : null}
            </ul>
            </div>
        </div>
    </div>
                    <div>
                    {this.props.children}
                    </div>
      </div>);
        }
    });

  App.propTypes = {
      children: React.PropTypes.object
  };

  const Logout = React.createClass({
      componentDidMount() {
          auth.logout();
          window.location.href = "/login";
      },

      render() {
          return(<p>You are now logged out </p>);
      }
  })



  function requireAuth(nextState, replace) {
      if (!auth.loggedIn()) {
          replace({
              pathname: '/login',
              state: { nextPathname: nextState.location.pathname }
          });
      }
  }

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    <IndexRoute component={CatalogMain}/>
    <Route path="/catalog" component={CatalogMain} onEnter={requireAuth} />
    <Route path="/import" component={ImportMain} onEnter={requireAuth} />
    <Route path="/login" component={LoginControl} />
    <Route path="/logout" component={Logout} />
    <Route path="/product" component={ProductMain} onEnter={requireAuth} />
    <Route path="/user" component={UserAdminMain} onEnter={requireAuth} />
    <Route path="/product-detail" component={ProductStandAlone} onEnter={requireAuth} />
    </Route>
  </Router>
, document.getElementById('root'));
