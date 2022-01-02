const { NavLink, withRouter, Link } = ReactRouterDOM;

export class AppsusHeader extends React.Component {
  state = {
    isModalShown: false,
  };

  toggleModal = () => {
    this.setState({ isModalShown: !this.state.isModalShown });
  };

  render() {
    return (
      <div className='header'>
        <div className='main-header flex'>
          <div className='logo'>
            <Link to='/'>
              <img
                width='auto'
                height='auto'
                src='./assets/SVG/logo.svg'
                alt='logoSvg'
              />
            </Link>
          </div>
          <div className='apps-menu'>
            <img
              onClick={this.toggleModal}
              src='./assets/SVG/navigation.svg'
              alt=''
            />
          </div>
        </div>
        {this.state.isModalShown && (
          <div className='nav-modal'>
            <NavLink to='/mail'>
              <img
                onClick={this.toggleModal}
                src='./assets/SVG/mail.svg'
                alt=''
              />
            </NavLink>
            <NavLink to='/keep'>
              <img
                onClick={this.toggleModal}
                src='./assets/SVG/keep.svg'
                alt=''
              />
            </NavLink>
            <NavLink to='/books'>
              <img
                onClick={this.toggleModal}
                src='./assets/SVG/book.svg'
                alt=''
              />
            </NavLink>
            <NavLink to='/about'>
              <img
                onClick={this.toggleModal}
                src='./assets/SVG/about.svg'
                alt=''
              />
            </NavLink>
            <NavLink to='/'>
              <img
                onClick={this.toggleModal}
                src='./assets/SVG/home.svg'
                alt=''
              />
            </NavLink>
          </div>
        )}
      </div>
    );
  }
}
