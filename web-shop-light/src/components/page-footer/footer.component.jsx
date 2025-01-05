import React from "react";

const PageFooter = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
    <div className="container">
      <div className="row">
        {/* Stolpec 1: O podjetju */}
        <div className="col-md-4 mb-3">
          <h5 className="text-uppercase">O Brenkalu</h5>
          <p>
            Brenkalo ponuja širok izbor glasbil za vse ljubitelje glasbe. Naš cilj je povezati ljudi z glasbo in omogočiti dostop do vrhunskih instrumentov.
          </p>
        </div>

        {/* Stolpec 2: Hitra navigacija */}
        <div className="col-md-3 mb-3">
          <h5 className="text-uppercase">Hitra navigacija</h5>
          <ul className="list-unstyled">
            <li>
              <a href="/" className="text-light text-decoration-none">
                Domov
              </a>
            </li>
            <li>
              <a href="/shop" className="text-light text-decoration-none">
                Trgovina
              </a>
            </li>
            <li>
              <a href="/contact" className="text-light text-decoration-none">
                Kontakt
              </a>
            </li>
            <li>
              <a href="/about" className="text-light text-decoration-none">
                O nas
              </a>
            </li>
          </ul>
        </div>

        {/* Stolpec 3: Kontaktni podatki */}
        <div className="col-md-3 mb-3">
          <h5 className="text-uppercase">Kontakt</h5>
          <p>
            <i className="fa fa-map-marker-alt"></i> Ljubljana, Slovenija
          </p>
          <p>
            <i className="fa fa-phone"></i> +386 40 123 456
          </p>
          <p>
            <i className="fa fa-envelope"></i> info@brenkalo.si
          </p>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="mb-0">&copy; {new Date().getFullYear()} Brenkalo. Vse pravice pridržane.</p>
      </div>
    </div>
  </footer>
  );
}
export default PageFooter;