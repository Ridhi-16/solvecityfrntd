import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { MoonLoader } from "react-spinners";
import ApiService from "../../../services/ApiService";

export default function AddCategory() {
    let nav = useNavigate()
    const [load, setload] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const handleForm = (data) => {
        setload(true)
        const formData = new FormData();

        formData.append("categoryName", data.categoryName);
        formData.append("description", data.description);




        // SINGLE IMAGE
        formData.append("image", data.image[0]);

        console.log("form Submitted", data);
        ApiService.addCategory(formData)
            .then((res) => {
                if (res.data.success) {
                    setload(false)
                    console.log(res.data)
                    toast.success(res.data.message)


                    nav("/admin/category/all")
                }
                else {
                    setload(false)
                    toast.error(res.data.message)
                }

            })
            .catch((err) => {
                setload(false)
                toast.error(err.message);

            })

    }
    const handleError = (error) => {
        setload(false)
        console.log("err", error);

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
                    
                        <div className="container spacing d-flex justify-content-center">
                            <div className="p-4 bg-light rounded contact-form">
                                <div className="row g-  ">
                                    <div className="col-12 text-center">

                                        <h1 className="display-5 mb-0">Add Category</h1>
                                    </div>
                                    <div className="col-12 mt-4 ">

                                        <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        required
                                                        type="text"
                                                        className="w-100 form-control p-3 mb-4  bg-light"
                                                        placeholder="Category Name"
                                                        style={{ height: 55 }}
                                                        {...register("categoryName", {
                                                            required: {
                                                                value: true,
                                                                message: "categoryName is req"
                                                            }
                                                        })}
                                                    />

                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        required
                                                        type="text"
                                                        className="w-100 form-control p-3 mb-4  bg-light"
                                                        placeholder="Description"
                                                        style={{ height: 55 }}
                                                        {...register("description", {
                                                            required: {
                                                                value: true,
                                                                message: "description is req"
                                                            }
                                                        })}
                                                    />

                                                </div>
                                            </div>







                                            <div className="col-12">
                                                <div className="form-group">

                                                    <input
                                                        required
                                                        type="file"
                                                        accept="image/*"
                                                        className=" w-100 form-control p-3 mb-4  "
                                                        {...register("image", {
                                                            required: "image is required"
                                                        })}
                                                    />

                                                </div>
                                            </div>




                                            <button
                                                className="w-100 btn  form-control p-3 temp-button  rounded-pill"
                                                type="submit"
                                            >
                                               Add Category
                                            </button>
                                            {/* <p className="text-center mt-2"><Link to="/register"  >Signup as Owner </Link>| <Link to="/coachregister">Investor</Link></p> */}

                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div >
                    
            }
        </>
    )
}