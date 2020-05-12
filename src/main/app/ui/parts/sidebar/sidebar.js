import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  toggleSidebar(e) {
    e.preventDefault()
    $("#wrapper").toggleClass("toggled")
  }

  render() {
    const sidebars = [{
      name: 'Settings',
      url: '/settings',
      icon: 'fa fa-vcard'
    }, {
      name: 'Budget Limit',
      url: '/budget-limits',
      icon: 'fa fa-vcard'
    }]
    return (
      <div className="sidebar-box col-sm-3 col-md-2" id="sidebar-wrapper">
        <a href="#menu-toggle" className="btn" id="menu-toggle" onClick={this.toggleSidebar}><i
          className="fa fa-bars"></i></a>
        <ul className="nav nav-sidebar">
          {sidebars.map((sidebar, index) =>
            <li key={index}>
              {sidebar.url === "/" ?
                <NavLink to={sidebar.url} activeClassName="active"><i
                  className={sidebar.icon}></i><span>{sidebar.name}</span></NavLink> :
                <NavLink to={sidebar.url} activeClassName="active"><i
                  className={sidebar.icon}></i><span>{sidebar.name}</span></NavLink>
              }
            </li>
          )
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userAuth: state.userAuth
  }
}

export default connect(mapStateToProps, null)(Sidebar)
