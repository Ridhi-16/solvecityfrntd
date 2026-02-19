import { Link } from "react-router-dom";

export default function Footer(){
    return(
      <>
      
      <footer id="footer" className="footer position-relative dark-background">
  <div className="footer-top">
    <div className="container">
      <div className="row gy-4">
        <div className="col-lg-4 col-md-6 footer-about">
          <a href="/" className="logo d-flex align-items-center">
            <span className="sitename">Save City</span>
          </a>
          <div className="footer-contact pt-3">
            <p>abc street </p>
            <p>Jalandhar, 144004</p>
            <p className="mt-3">
              <strong>Phone:</strong> <span>+91 1234567898</span>
            </p>
            <p>
              <strong>Email:</strong> <span>savecity@gmail.com</span>
            </p>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 footer-links">
          <h4>Useful Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/viewcategories">Report</Link>
            </li>
            <li>
              <Link to="/issues/view">View An issue</Link>
            </li>
          
          </ul>
        </div>
        <div className="col-lg-2 col-md-3 footer-links">
          <h4>Categories</h4>
          <ul>
            <li>
              <Link to="/viewcategories">Electricity</Link>
            </li>
            <li>
             <Link to="/viewcategories">Water</Link>
            </li>
            <li>
              
            </li>
            <li>
              <Link to="/viewcategories">Roads</Link>
            </li>
            <li>
            <Link to="/viewcategories">Buildings</Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-3 footer-links">
          <h4>Report</h4>
          <ul>
            <li>
            <Link to="/issues/add">Buildings</Link>
            
            </li>
            <li>
                      <Link to="/issues/add">Roads</Link>
            </li>
            <li>
              <Link to="/issues/add">Water</Link>
            </li>
            <li>
                   <Link to="/issues/add">Electricity</Link>
            </li>
            
          </ul>
        </div>
        {/* <div className="col-lg-2 col-md-3 footer-links">
          <h4>Nobis illum</h4>
          <ul>
            <li>
              <a href="#">Ipsam</a>
            </li>
            <li>
              <a href="#">Laudantium dolorum</a>
            </li>
            <li>
              <a href="#">Dinera</a>
            </li>
            <li>
              <a href="#">Trodelas</a>
            </li>
            <li>
              <a href="#">Flexo</a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  </div>
  <div className="copyright text-center">
    <div className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
      <div className="d-flex flex-column align-items-center align-items-lg-start">
        <div>
          © Copyright{" "}
          <strong>
            <span>SaveCity</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="credits">
          {/* All the links in the footer should remain intact. */}
          {/* You can delete the links only if you purchased the pro version. */}
          {/* Licensing information: https://bootstrapmade.com/license/ */}
          {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/herobiz-bootstrap-business-template/ */}
          {/* Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> |{" "}
          <a href="https://bootstrapmade.com/tools/">DevTools</a> */}
        </div>
      </div>
      {/* <div className="social-links order-first order-lg-last mb-3 mb-lg-0">
        <a href="twitter.com">
          <i className="bi bi-twitter-x" />
        </a>
        <a href="facebook.com">
          <i className="bi bi-facebook" />
        </a>
        <a href="instagram.com">
          <i className="bi bi-instagram" />
        </a>
        <a href="linkedin.com">
          <i className="bi bi-linkedin" />
        </a>
      </div> */}
    </div>
  </div>
</footer>

      
      
      </>
    )
}