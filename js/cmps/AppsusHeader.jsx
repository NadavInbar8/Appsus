const { NavLink, withRouter } = ReactRouterDOM;

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
            <img
              width='auto'
              height='auto'
              src='./assets/SVG/logo.svg'
              alt='logoSvg'
            />
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
            <NavLink to='/mail'>mail</NavLink>
            <NavLink to='/keep'>keep</NavLink>
            <NavLink to='/book'>books</NavLink>
            <NavLink to='/about'>about</NavLink>
            <NavLink to='/'>home</NavLink>
          </div>
        )}
      </div>
    );
  }
}
