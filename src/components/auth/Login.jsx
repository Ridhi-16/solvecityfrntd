import { useState } from "react"
import ApiService from "../../services/ApiService"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { MoonLoader } from "react-spinners"

export default function Login() {



  let nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [load, setload] = useState(false)

  const changeEmail = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)

  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleForm = (e) => {
    setload(true)
    e.preventDefault()
    let data = {
      email: email,
      password: password,

    }
    ApiService.login(data)
      .then((res) => {
        console.log(res);
        setload(false);

        if (res.data.success) {


          if (res.data.data.status === false) {
            toast.error("Your account is inactive. Please contact admin.");
            return;
          }
          toast.success(res.data.message)

          sessionStorage.setItem("isLogin", true)
          sessionStorage.setItem("token", res.data.token)
          sessionStorage.setItem("name", res.data.data.name)
          sessionStorage.setItem("email", res.data.data.email)
          sessionStorage.setItem("role", res.data.data.role)
          sessionStorage.setItem("userId", res.data.data._id)
    

          if (res.data.data.role == "admin") {
            nav("/admin")
          }
          else if (res.data.data.role == "employee") {
            nav("/employee")
          }
          else {
            nav("/")
          }

        } else {
          setload(false)
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        setload(false)
        toast.error(err.message)
      })

  }


  return (
    <>
      {
        load ?
          (<div style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}>
            <div style={{ transform: "translateY(-40px)" }}>
              <MoonLoader size={50} />
            </div>
          </div>)
          :
         
            <div className="container py-5  my-5 d-flex justify-content-center">
              <div className="p-4 bg-light rounded contact-form">
                <div className="row g-  ">
                  <div className="col-12 text-center">

                    <h1 className="display-5 mb-0">Login</h1>
                  </div>
                  <div className="col-12 mt-4 ">

                    <form action="" method="POST" onSubmit={handleForm}>

                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            required
                            onChange={changeEmail}
                            type="email"
                            className="w-100 form-control p-3 mb-4 border-dark bg-light"
                            placeholder="Your Email"
                            style={{ height: 55 }}
                          />

                        </div>
                      </div>


                      <div className="col-12">
                        <div className="form-group">
                          <input
                            required
                            onChange={changePassword}
                            type="password"
                            className="w-100 form-control p-3 mb-4 border-dark bg-light"
                            placeholder="Your Password"
                            style={{ height: 55 }}
                          />
                        </div>
                      </div>




                      <button
                   style={{backgroundColor:"#226e58"}}
                        className="w-100 text-white btn-submit form-control p-3  btn-primary rounded-pill"
                        type="submit"
                        
                      >
                        Login
                      </button>
                      <p className="text-center mt-2"><Link to="/register"  >Signup </Link></p>

                    </form>
                  </div>

                </div>
              </div>
            </div >
          
      }
    </>
  )
}
