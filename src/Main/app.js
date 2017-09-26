import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, withRouter, IndexRoute } from 'react-router'
import CatalogMain from './visualize'
import ImportMain from '../Import/importmain'
import ImportNew from '../Import/newimport'
import LoginControl from '../Login/login'
import auth from '../Login/auth'
import ProductMain from '../Product/product'
import UserAdminMain from '../UserAdmin/useradminmain'
import ProductStandAlone from '../Product/product-stand-alone'
import RulesMain from '../Rules/rulesmain'
import DiagramMain from '../DiagramTool/main'

const App = React.createClass({
  getInitialState () {
    return {
      loggedIn: auth.loggedIn()
    }
  },
  updateAuth (loggedIn) {
    this.setState({
      loggedIn
    })
  },
  componentWillMount () {
    console.disableYellowBox = true
    auth.onChange = this.updateAuth
    auth.login()
  },
  render: function () {
    var renderImport, renderCatalog, renderProduct, renderRules
    if (auth.loggedIn() == true && localStorage.ImportVisibility == 'true') { renderImport = true } else { renderImport = false }
    if (auth.loggedIn() == true && localStorage.CatalogVisibility == 'true') { renderCatalog = true } else { renderCatalog = false }
    if (auth.loggedIn() == true && localStorage.ProductVisibility == 'true') { renderProduct = true } else { renderProduct = false }
    if (auth.loggedIn() == true && localStorage.RuleVisibility == 'true') { renderRules = true } else { renderRules = false }
    return (<div>
      <div className='navbar navbar-default navbar-static-top'>
        <div className='container'>
          <div className='navbar-header'>
            <img src='src/Images/odn-horizontal.jpg' height='50px' />
          </div>
          <div className='navbar-collapse collapse'>
            <ul className='nav navbar-nav'>
              {renderImport ? <li><Link to='datatools'>Data Tools</Link></li> : null}
              {renderImport ? <li><Link to='import'>Vendor Import</Link></li> : null}
              {renderCatalog ? <li><Link to='catalog'>Catalog</Link></li> : null}
              {renderProduct ? <li><Link to='product'>Products</Link></li> : null}
              {renderRules && <li><Link to='rules'>Rules</Link></li>}
              <li><Link to='diagramtool'>Diagram Tool</Link></li>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              {auth.loggedIn() ? <li><Link to='user'><span className='glyphicon glyphicon-user' /> {localStorage.username}</Link></li> : null}
              {auth.loggedIn() ? <li><Link to='logout'><span className='glyphicon glyphicon-log-in' /> Logout</Link></li> : null}
              {!auth.loggedIn() ? <li><Link to='login'><span className='glyphicon glyphicon-log-in' /> Login</Link></li> : null}
            </ul>
          </div>
        </div>
      </div>
      <div>
        {this.props.children}
      </div>
    </div>)
  }
})

App.propTypes = {
  children: React.PropTypes.object
}

const Logout = React.createClass({
  componentDidMount () {
    auth.logout()
    this.context.router.push('/login')
  },

  render () {
    return (<p>You are now logged out </p>)
  }
})

function requireAuth (nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={CatalogMain} onEnter={requireAuth} />
      <Route path='/catalog' component={CatalogMain} onEnter={requireAuth} />
      <Route path='/datatools' component={ImportMain} onEnter={requireAuth} />
      <Route path='/import' component={ImportNew} onEnter={requireAuth} />
      <Route path='/login' component={LoginControl} />
      <Route path='/logout' component={Logout} />
      <Route path='/product' component={ProductMain} onEnter={requireAuth} />
      <Route path='/user' component={UserAdminMain} onEnter={requireAuth} />
      <Route path='/product-detail' component={ProductStandAlone} onEnter={requireAuth} />
      <Route path='/rules' component={RulesMain} onEnter={requireAuth} />
      <Route path='/diagramtool' component={DiagramMain} onEnter={requireAuth} />
    </Route>
  </Router>
, document.getElementById('root'))
