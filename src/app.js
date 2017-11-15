var React = require('react')
, ReactDom = require('react-dom')
, ReactRouter = require('react-router')

var Comments = require('./comments')
, Login = require('./login')

var Route = ReactRouter.Route
, Router = ReactRouter.Router


var CommentsApp = React.createElement({
mixins: [ReactRouter.History],

signOut: function(e) {
  e.preventDefault()
  delete window.User
  this.history.pushState(null, "/login")
},

render: function render() {
  if (window.User) {
    var navigation = (
      <nav className="App-navigation">
        <a href="#/">All</a>
        <a href="#" onClick={this.signOut}>Sign Out</a>
      </nav>
    )
  }

  return (
    <section className="CommentsApp">
      <h1>Comments</h1>
      <h2>Share what you think about the world</h2>

      {navigation}

      {this.props.children}
    </section>
  )
}
})

function requireLogin(nextState, replaceState) {
if (!window.User) {
  replaceState({ nextPathname: nextState.location.pathname }, '/login')
}
}

function requireLogout(nextState, replaceState) {
if (window.User) {
  replaceState({ nextPathname: nextState.location.pathname }, '/')
}
}

ReactDom.render((
<Router>
  <Route path="/" component={CommentsApp}>
    <Route path="login" component={Login} onEnter={requireLogout} />
    <Route path="comments" component={Comments} onEnter={requireLogin} />
  </Route>
</Router>
), document.getElementById("app"))