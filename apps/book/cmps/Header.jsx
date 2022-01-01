const { NavLink, withRouter } = ReactRouterDOM;

export function Header() {
  return (
    <header className='main-header'>
      <h1>Book Shop</h1>
      <div className='main-nav'>
        <NavLink exact to='/'>
          Home
        </NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/books'>Our Books</NavLink>
      </div>
    </header>
  );
}
