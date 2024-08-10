import React, { useState } from "react";

const Navbar = ({ setCategory, setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
    }
  };

  return (
    <div className="sticky-top bg-white ">
      <header className="pt-3  ">
        <div className="container d-flex flex-wrap justify-content-center">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none"
          >
            <span className="fs-5 fw-bold badge text-bg-primary ">
              Headline <span className="badge text-bg-light">Hunt</span>
            </span>
          </a>
          <form className="col-12 col-lg-4 mb-3 mb-lg-0 " role="search" onSubmit={handleSearch}>
            <input
              name="search"
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>
      </header>
      <nav className="py-2 bg-body-white border-bottom ">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <div className="nav-link " aria-current="page" onClick={() => { setCategory("general"); setSearchQuery(''); }}>
                Home 
              </div>
            </li>
          </ul>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <div className="nav-link" onClick={() => { setCategory("entertainment"); setSearchQuery(''); }}>
                Entertainment
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => { setCategory("business"); setSearchQuery(''); }}>
                Business
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => { setCategory("health"); setSearchQuery(''); }}>
                Health
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => { setCategory("science"); setSearchQuery(''); }}>
                Science
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => { setCategory("sports"); setSearchQuery(''); }}>
                Sports
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => { setCategory("technology"); setSearchQuery(''); }}>
                Technology
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
