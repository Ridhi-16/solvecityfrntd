import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./header.css";
import { useState } from "react";


export default function EmployeeHeader() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null)


  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  let { pathname } = useLocation

  let isLogin = sessionStorage.getItem("isLogin")
  let name = sessionStorage.getItem("name")
  const nav = useNavigate()
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
  <div className="branding d-flex align-items-cente">
    <div className="container position-relative d-flex align-items-center justify-content-between">
      <Link to="/employee" className="logo d-flex align-items-center">
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
            <Link to="/employee" className="active">
              Home
            </Link>
          </li>
         
          
          
           {/* <li className="dropdown">
            <a href="#">
              <span>Employee</span>{" "}
              <i className="bi bi-chevron-down toggle-dropdown" />
            </a>
            <ul>
              <li>
                <Link to="/admin/employee/add">Add Employee</Link>
              </li>
              <li>
                <Link to="/admin/employees">All Employee</Link>
              </li>
              
            </ul>
          </li> */}
          {/* <li className="dropdown">
            <a href="#">
              <span>Category</span>{" "}
              <i className="bi bi-chevron-down toggle-dropdown" />
            </a>
            <ul>
              <li>
                <Link to="/admin/category/add">Add Category</Link>
              </li>
              <li>
                <Link to="/admin/category/all">All Category</Link>
              </li>
              
            </ul>
          </li> */}
          <li>
            <Link to="/employee/issues/manage">Issues</Link>
          </li>


          {/* <li>
            <Link to="/admin/users">Users</Link>
          </li> */}
         
          {isLogin ?

            <>

              

               <li>
                <Link to="#"  onClick={logout} >Logout {name}</Link>
              </li>
            </>

            :
            <>
            <li>
              <Link to="/login"> Login</Link>
            </li>
            </>
          }
          {/* <li className="dropdown">
            <a href="#">
              <span>Pages</span>{" "}
              <i className="bi bi-chevron-down toggle-dropdown" />
            </a>
            <ul>
              <li>
                <Link to="/room-details">Room Details</Link>
              </li>
              <li>
                <Link to="/restaurant">Restaurant</Link>
              </li>
              <li>
                <Link to="/offers">Offers</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/booking">Booking</Link>
              </li>
             
              <li>
                <Link to="/terms">Terms Page</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Page</Link>
              </li>
              <li>
                <Link to="/404">404 Page</Link>
              </li>
              <li>
                <Link to="/starter-page">Starter Page</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li className="dropdown">
            <a href="#english">
              <svg
                className="icon"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 0H6V2H10V4H8.86807C8.57073 5.66996 7.78574 7.17117 6.6656 8.35112C7.46567 8.73941 8.35737 8.96842 9.29948 8.99697L10.2735 6H12.7265L15.9765 16H13.8735L13.2235 14H9.77647L9.12647 16H7.0235L8.66176 10.9592C7.32639 10.8285 6.08165 10.3888 4.99999 9.71246C3.69496 10.5284 2.15255 11 0.5 11H0V9H0.5C1.5161 9 2.47775 8.76685 3.33437 8.35112C2.68381 7.66582 2.14629 6.87215 1.75171 6H4.02179C4.30023 6.43491 4.62904 6.83446 4.99999 7.19044C5.88743 6.33881 6.53369 5.23777 6.82607 4H0V2H4V0ZM12.5735 12L11.5 8.69688L10.4265 12H12.5735Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
              <span>English</span>
              <i className="bi bi-chevron-down toggle-dropdown" />
            </a>
            <ul>
              <li>
                <a href="#french">French</a>
              </li>
              <li>
                <a href="#deutsch">Deutsch</a>
              </li>
              <li>
                <a href="#spanish">Spanish</a>
              </li>
            </ul>
          </li> */}
        </ul>
        
      </nav>
       <i
               className={`mobile-nav-toggle  bi ${mobileOpen ? "bi-x" : "bi-list"
                 }`}
               onClick={() => setMobileOpen(!mobileOpen)}
               style={{ cursor: "pointer",color: "black",marginLeft:"-30px" }}
            
             />
    </div>
  </div>
</header>


    </>
  )
}