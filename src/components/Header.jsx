
function Header() {
  return (
    <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
                <a className="navbar-brand">EcoTroca</a>
                <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Filtrar" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Login</button>
                </form>
        </div>
    </nav>
  )
}

export default Header