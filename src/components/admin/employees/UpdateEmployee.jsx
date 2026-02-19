import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../../../services/ApiService";
import { MoonLoader } from "react-spinners";

export default function UpdateEmployee() {
    const { id } = useParams();
    const nav = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        ApiService.singleEmployee({ _id: id })
            .then(res => {
                if (res.data.success) {
                    const emp = res.data.data;
                    setValue("name", emp.name);
                    setValue("email", emp.email);
                    setValue("designation", emp.designation);
                    setValue("phone", emp.phone);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(err => toast.error(err.message));
    };

    const handleForm = data => {
        setLoad(true);
        const formData = new FormData();
        formData.append("_id", id);
       
        formData.append("designation", data.designation);
       

        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        ApiService.updateEmployee(formData)
            .then(res => {
                setLoad(false);
                if (res.data.success) {
                    toast.success(res.data.message);
                    nav("/admin/employees");
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(err => {
                setLoad(false);
                toast.error(err.message);
            });
    };

    const handleError = err => {
        setLoad(false);
        console.log("Form errors:", err);
    };

    return (
        <>
            {load ? (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999
                }}>
                    <MoonLoader size={50} />
                </div>
            ) : (

                <div >
                        <div className="container spacing d-flex justify-content-center w-50">
                            <div className="p-4 bg-light rounded contact-form">
                                <div className="row g-4 ">
                                    <div className="col-12 text-center">

                                        <h1 className="display-5 mb-0">Update Employee</h1>
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
                                                            
                                                            type="file"
                                                            accept="image/*"
                                                            className=" w-100 form-control p-3 mb-4  "
                                                            {...register("profileImage", {
                                                               
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
                                                Update
                                            </button>
                                            {/* <p className="text-center mt-2"><Link to="/register"  >Signup as Owner </Link>| <Link to="/coachregister">Investor</Link></p> */}

                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div >

                    </div>
                




            )}
        </>
    );
}
