export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar navbar-light fixed-top bg-white border-bottom shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Hamburger for mobile */}
        <button className="btn d-lg-none" onClick={toggleSidebar}>
          <i className="bi bi-list fs-3 text-primary"></i>
        </button>

        <h5 className="m-0 fw-bold text-primary">Admin Dashboard</h5>

        <div className="d-none d-lg-block text-muted fw-semibold">Admin</div>
      </div>
    </nav>
  );
}
