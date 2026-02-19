import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./header.css";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [mobileNav, setMobileNav] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)


  let isLogin = sessionStorage.getItem("isLogin")
  let name = sessionStorage.getItem("name")
  const nav = useNavigate()
  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear()
        nav("/login")
        Swal.fire({
          title: "Logout!",
          text: "Logout successfully.",
          icon: "success"
        });
      }
    });
  }
  return (
    <>

      <header id="header" className="header sticky-top">
        <div className="topbar d-flex align-items-center dark-background">
          <div className="container d-flex justify-content-center justify-content-md-between">
            <div className="contact-info d-flex align-items-center">
              <i className="bi bi-envelope d-flex align-items-center">
                <a href="mailto:contact@example.com">savecity@gmail.com</a>
              </i>
              <i className="bi bi-phone d-flex align-items-center ms-4">
                <span>+91 123456789</span>
              </i>
            </div>
            {/* <div className="social-links d-none d-md-flex align-items-center">
              <a href="twitter.com" className="twitter">
                <i className="bi bi-twitter-x" />
              </a>
              <a href="facebook.com" className="facebook">
                <i className="bi bi-facebook" />
              </a>
              <a href="instangram.com" className="instagram">
                <i className="bi bi-instagram" />
              </a>
              <a href="linkedin.com" className="linkedin">
                <i className="bi bi-linkedin" />
              </a>
            </div> */}
          </div>
        </div>
        {/* End Top Bar */}
        <div className="branding d-flex align-items-center">
          <div className="container  header-inner ">
            <Link to="/" className="logo d-flex align-items-center">
              {/* Uncomment the line below if you also wish to use an image logo */}
              {/* <img src="assets/img/logo.webp" alt=""> */}
              <h1 className="sitename">Save City</h1>
            </Link>
            <nav
              id="navmenu"
              className={`navmenu ${mobileOpen ? "mobile-active" : ""}`}
            >



              <ul>
                <li>
                  <Link to="/" className="active text-light">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="viewcategories"> Categories</Link>
                </li>
                <Link to="/issues/view" className="text-light" >
                  View Issues
                </Link>


                {isLogin ?

                  <>



                    <li className={`dropdown ${openDropdown === "services" ? "active" : ""}`}>
                      <span
                        className="dropdown-toggle text-light"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenDropdown(openDropdown === "services" ? null : "services");
                        }}
                      >
                        Issues
                      </span>

                      <ul
                        className={`dropdown-menu ${openDropdown === "services" ? "show" : ""}`}
                        style={{ display: openDropdown === "services" ? "block" : "none" }}
                      >
                        <li>
                          <Link to="/issues/add" onClick={() => setMobileOpen(false)}>
                            Add Issues
                          </Link>
                        </li>
                        <li>
                          <Link to="/myissues" onClick={() => setMobileOpen(false)}>
                            My Issues
                          </Link>
                        </li>
                      </ul>
                    </li>


                  </>

                  :
                  <>

                  </>
                }









                {/* <li>
             <Link to="/amenities">Amenities</Link>
           </li> */}
                {isLogin ?

                  <>



                    <li>
                      <Link to="#" className="" onClick={logout} >Logout {name}</Link>
                    </li>
                  </>

                  :
                  <>
                    <li>
                      <Link to="/login" > Login</Link>
                    </li>
                  </>
                }

              </ul>



            </nav>
            <i
              className={`mobile-nav-toggle  bi ${mobileOpen ? "bi-x" : "bi-list"
                }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </header>



    </>
  )
}

