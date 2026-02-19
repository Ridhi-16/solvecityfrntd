import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { toast } from "react-toastify"

import { useEffect, useState } from "react"
import { MoonLoader } from "react-spinners"
import ApiService from "../../../services/ApiService"


export default function AddEmployee() {

    let nav = useNavigate()
    const [load, setload] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const [category, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState("")





    const handleForm = (data) => {
        setload(true)

        const formData = new FormData();
        formData.append("name", data?.name);
        formData.append("email", data?.email);
        formData.append("password", data?.password);
        formData.append("contact", data?.contact);
        formData.append("designation", data?.designation);



        formData.append("profileImage", data.profileImage[0]);       // user
        // investor
        formData.append("categoryId", data.categoryId);



        console.log("form Submitted", formData);
        ApiService.addEmployee(formData)
            .then((res) => {
                console.log(res)

                if (res.data.success) {
                    setload(false)
                    toast.success(res.data.message)
                    nav("/admin/employees")


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
        toast.error("Please fix the form errors");
    };
    const fetchData = () => {




        ApiService.allCategory({ status: true })
            .then((res) => {
                if (res.data.success) {
                    setCategory(res.data.data);
                }
            })
            .catch(err => toast.error(err.message));
    };





    useEffect(() => {
        fetchData()
    }, [])











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

                    <div >
                        <div className="container spacing d-flex justify-content-center w-50">
                            <div className="p-4 bg-light rounded contact-form">
                                <div className="row g-4 ">
                                    <div className="col-12 text-center">

                                        <h1 className="display-5 mb-0">Add Employee</h1>
                                    </div>
                                    <div className="col-16 mt-4 ">

                                        <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
                                            <div className="row">
                                                <div className="col-md-6">
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

                                                <div className="col-md-6">
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



                                                <div className="col-md-6">
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


                                                <div className="col-md-6">
                                                    <div className="form-group">

                                                        <input
                                                            required
                                                            type="text"
                                                            inputMode="numeric"
                                                            maxLength={10}



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
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <select
                                                            className="form-select  p-2 mb-4"
                                                            aria-label="Default select example"
                                                            {...register("categoryId", {
                                                                required: "category is required",
                                                            })}
                                                        >
                                                            <option value="">
                                                                Select Category
                                                            </option>

                                                            {category.map((el) => (
                                                                <option key={el._id} value={el._id}>
                                                                    {el.categoryName}
                                                                </option>
                                                            ))}
                                                        </select>


                                                    </div>
                                                </div>


                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input
                                                            required
                                                            type="text"
                                                            className="w-100 form-control p-3 mb-4  bg-light"
                                                            placeholder="Designation"
                                                            style={{ height: 55 }}
                                                            {...register("designation", {
                                                                required: {
                                                                    value: true,
                                                                    message: "designation is req"
                                                                }
                                                            })}
                                                        />

                                                    </div>
                                                </div>


                                                <div className="col-md-6">
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

                                            </div>



                                            <button
                                                style={{ backgroundColor: "#226e58" }}
                                                className="w-100 text-light  btn-submit form-control p-3  btn-primary rounded-pill"
                                                type="submit"
                                            >
                                                Add
                                            </button>
                                            {/* <p className="text-center mt-2"><Link to="/register"  >Signup as Owner </Link>| <Link to="/coachregister">Investor</Link></p> */}

                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div >

                    </div>




            }
        </>
    )
}



