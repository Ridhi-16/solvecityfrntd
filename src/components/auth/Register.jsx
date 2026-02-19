import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import ApiService from "../../services/ApiService"
import { toast } from "react-toastify"

import { useEffect, useState } from "react"
import { MoonLoader } from "react-spinners"


export default function Register() {

    let nav = useNavigate()
    const [load, setload] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const handleForm = (data) => {
        setload(true)

        const formData = new FormData();
        formData.append("name", data?.name);
        formData.append("email", data?.email);
        formData.append("password", data?.password);
        formData.append("contact", data?.contact);
        formData.append("profileImage", data.profileImage[0]);



        console.log("form Submitted", formData);
        ApiService.register(formData)
            .then((res) => {
                console.log(res)

                if (res.data.success) {
                    setload(false)
                    toast.success(res.data.message)

                    let logindata = {
                        email: data.email,
                        password: data.password
                    }
                    console.log(logindata);

                    ApiService.login(logindata)
                        .then((result) => {
                            console.log(result);
                            if (result.data.success) {
                                toast.success(result.data.message)
                                setload(false)
                                sessionStorage.setItem("isLogin", true)

                                sessionStorage.setItem("token", result.data.token)
                                sessionStorage.setItem("name", result.data.data.name)
                                sessionStorage.setItem("email", result.data.data.email)
                                sessionStorage.setItem("role", result.data.data.role)
                                sessionStorage.setItem("userId", result.data.data._id)
                                if (result.data.data.role == "admin") {
                                    nav("/admin")
                                }
                                else if (result.data.data.role == "owner") {
                                    nav("/owner")
                                }
                                else {
                                    nav("/")
                                }

                            } else {
                                toast.error("something went wrong")
                            }
                        })
                        .catch((err) => {
                            setload(false)
                            toast.error(
                                err.response?.data?.message ||
                                err.message ||
                                "Something went wrong"
                            );
                            console.log("1", err);

                        })
                }
            })
            .catch((err) => {
                setload(false)
                toast.error(
                    err.response?.data?.message ||
                    err.message ||
                    "Something went wrong"
                );

            })
    }

    const handleError = (errors) => {
        setload(false);
        console.log("Form Errors:", errors);
        toast.error(
            errors.response?.data?.message ||
            errors.message ||
            "Something went wrong"
        );
    };










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
                                
                                    <div className="container  my-5 py-5 d-flex justify-content-center">
                                        <div className="p-4 bg-light rounded contact-form">
                                            <div className="row g-  ">
                                                <div className="col-12 text-center">

                                                    <h1 className="display-5 mb-0">Register</h1>
                                                </div>
                                                <div className="col-12 mt-4 ">

                                                    <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <input
                                                                    required
                                                                    type="text"
                                                                    className="w-100 form-control p-3 mb-4  bg-light"
                                                                    placeholder="Name"
                                                                    style={{ height: 55 }}
                                                                    {...register("name", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "name is req"
                                                                        }
                                                                    })}
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <input
                                                                    required
                                                                    type="email"
                                                                    className="w-100 form-control p-3 mb-4  bg-light"
                                                                    placeholder="Your Email"
                                                                    style={{ height: 55 }}
                                                                    {...register("email", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "email is req"
                                                                        }
                                                                    })}
                                                                />

                                                            </div>
                                                        </div>



                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <input
                                                                    required

                                                                    type="password"
                                                                    className=" w-100 form-control p-3 mb-4  "
                                                                    placeholder="Password"
                                                                    style={{ height: 55 }}
                                                                    {...register("password", {
                                                                        required: {
                                                                            value: true,
                                                                            message: "password is req"
                                                                        }
                                                                    })}
                                                                />


                                                            </div>
                                                        </div>

                                                    
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                               
                                                                    <input
                                                                        required
                                                                        type="text"
                                                                        inputMode="numeric"
                                                                        maxLength={10}
                                                                        minLength={10}



                                                                      className=" w-100 form-control p-3 mb-4  "
                                                                        placeholder="Contact"
                                                                        style={{ height: 55 }}
                                                                        {...register("contact", {
                                                                            required: {
                                                                                value: true,
                                                                                message: "contact is req"
                                                                            },
                                                                            pattern: {
                                                                                value: /^[0-9]{10}$/,
                                                                                message: "Contact must be exactly 10 digits"
                                                                            }

                                                                        })}
                                                                    />
                                                               
                                                            </div>
                                                        </div> <div className="col-12">
                                                            <div className="form-group">
                                                               
                                                                    <input
                                                                        required
                                                                        type="file"
                                                                        accept="image/*"
                                                                        className=" w-100 form-control p-3 mb-4  "
                                                                        {...register("profileImage", {
                                                                            required: "profileImage is required"
                                                                        })}
                                                                    />
                                                               
                                                            </div>
                                                        </div>




                                                        <button
                                                         style={{backgroundColor:"#226e58"}}
                                                            className="w-100 text-light  btn-submit form-control p-3  btn-primary rounded-pill"
                                                            type="submit"
                                                        >
                                                            Register
                                                        </button>
                                                        {/* <p className="text-center mt-2"><Link to="/register"  >Signup as Owner </Link>| <Link to="/coachregister">Investor</Link></p> */}

                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div >
                                
                        }
                    </>

                // <main className="main">

                //     <section id="contact-2" className="contact-2 section mt-5">



                //         <div className="container">
                //             <div
                //                 className="row justify-content-center"
                //                 data-aos="fade-up"
                //                 data-aos-delay={300}
                //             >
                //                 <div className="col-lg-10">
                //                     <div className="contact-form-wrapper">
                //                         <h2 className="text-center mb-4">Register</h2>
                //                         <form
                //                             action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}
                //                             className="php-email-form"
                //                         >
                //                             <div className="row g-3">
                //                                 <div className="col-md-6">
                //                                     <div className="form-group">
                //                                         <div className="input-with-icon">
                //                                             <i className="bi bi-person" />
                //                                             <input
                //                                                 required

                //                                                 type="text"
                //                                                 className="form-control "
                //                                                 placeholder="Name"
                //                                                 style={{ height: 55 }}
                //                                                 {...register("name", {
                //                                                     required: {
                //                                                         value: true,
                //                                                         message: "name is req"
                //                                                     }
                //                                                 })}
                //                                             />
                //                                         </div>
                //                                     </div>
                //                                 </div>
                //                                 <div className="col-md-6">
                //                                     <div className="form-group">
                //                                         <div className="input-with-icon">
                //                                             <i className="bi bi-envelope" />
                //                                             <input
                //                                                 required
                //                                                 type="email"
                //                                                 className="form-control  "
                //                                                 placeholder="Your Email"
                //                                                 style={{ height: 55 }}
                //                                                 {...register("email", {
                //                                                     required: {
                //                                                         value: true,
                //                                                         message: "email is req"
                //                                                     }
                //                                                 })}
                //                                             />
                //                                         </div>
                //                                     </div>
                //                                 </div>
                //                                 <div className="col-md-6">
                //                                     <div className="form-group">
                //                                         <div className="input-with-icon">
                //                                             <i className="bi bi-text-left" />
                //                                             <input
                //                                                 required

                //                                                 type="password"
                //                                                 className="form-control "
                //                                                 placeholder="Password"
                //                                                 style={{ height: 55 }}
                //                                                 {...register("password", {
                //                                                     required: {
                //                                                         value: true,
                //                                                         message: "password is req"
                //                                                     }
                //                                                 })}
                //                                             />
                //                                         </div>
                //                                     </div>
                //                                 </div>
                //                                 <div className="col-md-6">
                //                                     <div className="form-group">
                //                                         <div className="input-with-icon">
                //                                             <i class="bi bi-person-lines-fill"></i>
                //                                             <input
                //                                                 required
                //                                                 type="text"
                //                                                 inputMode="numeric"
                //                                                 maxLength={10}



                //                                                 className="form-control "
                //                                                 placeholder="Contact"
                //                                                 style={{ height: 55 }}
                //                                                 {...register("contact", {
                //                                                     required: {
                //                                                         value: true,
                //                                                         message: "contact is req"
                //                                                     },
                //                                                     pattern: {
                //                                                         value: /^[0-9]{10}$/,
                //                                                         message: "Contact must be exactly 10 digits"
                //                                                     }

                //                                                 })}
                //                                             />
                //                                         </div>
                //                                     </div>
                //                                 </div>
                //                                 <div className="col-12">
                //                                     <div className="form-group">
                //                                         <div className="input-with-icon">
                //                                             <i class="bi bi-image"></i>
                //                                             <input
                //                                     required
                //                                     type="file"
                //                                     accept="image/*"
                //                                     className="form-control"
                //                                     {...register("profileImage", {
                //                                         required: "profileImage is required"
                //                                     })}
                //                                 />
                //                                         </div>
                //                                     </div>
                //                                 </div>
                //                                 <div className="col-12">
                //                                     <div className="loading">Loading</div>
                //                                     <div className="error-message" />
                //                                     <div className="sent-message">
                //                                         Your message has been sent. Thank you!
                //                                     </div>
                //                                 </div>
                //                                 <div className="col-12 text-center">
                //                                     <button type="submit" className="btn btn-primary btn-submit">
                //                                        Register
                //                                     </button>
                //                                 </div>
                //                             </div>
                //                         </form>
                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     </section>

                // </main>

            }
        </>
    )
}