const { Link } = ReactRouterDOM;

export function AppsusHome() {
  return (
    <div className='appsus-home'>
      <h1>Wellcome to Appsus</h1>

      <div className='navigation-links'>
        <Link to='/about'>
          <img src='assets/SVG/about.svg' alt='' />
        </Link>

        <Link to='/mail'>
          <img src='assets/SVG/mail.svg' alt='' />
        </Link>

        <Link to='/keep'>
          <img src='assets/SVG/keep.svg' alt='' />
        </Link>

        <Link to='/book'>
          <img src='assets/SVG/book.svg' alt='' />
        </Link>

        <Link to='/'>
          <img src='assets/SVG/home.svg' alt='' />
        </Link>
      </div>
    </div>
  );
}
