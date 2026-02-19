import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import { MoonLoader } from "react-spinners"

export default function UpdateIssues() {

    let { id } = useParams()
    let nav = useNavigate()
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()
        const [load, setload] = useState(false)
    

    useEffect(() => {
        fetchData()
    }, [])





    const fetchData = () => {
        let data = {
            _id: id
        }
        ApiService.singleIssues(data)
            .then((res) => {
                console.log(res);

                if (res.data.success) {

                    setValue("title", res.data.data.title);
                    setValue("description", res.data.data.description);
                    setValue("location", res.data.data.location);

                    

                    

                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })

       

    }

    const getLiveLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // You can either store lat-long
                setValue("location", `${latitude}, ${longitude}`);

                // OR later convert to real address (advanced method)
            },
            (error) => {
                alert("Unable to fetch location");
            }
        );
    };


    const handleForm = (data) => {
           setload(true)
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("totalSales", data.totalSales);
        formData.append("location", data.location);


        // formData.append("duration", data.duration);
        formData.append("description", data.description);
        // formData.append("seasonId", seasonId);
        // formData.append("landId", landId);
        formData.append("_id",id)
        // append image ONLY if selected
       if (data.media && data.media.length > 0) {
    for (let i = 0; i < data.media.length; i++) {
        formData.append("media", data.media[i]);
    }
}


        
        console.log("form Submitted", data);
        ApiService.updateIssues(formData)
            .then((res) => {
                if (res.data.success) {
                       setload(false)
                    console.log(res.data)
                    toast.success(res.data.message)
                    nav("/issues/all")
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
           <div
                        className="container-fluid contact py-6 wow bounceInUp"
                        data-wow-delay="0.1s"
                    >
                        <div className="container d-flex justify-content-center">
                            <div className="p-4 bg-light rounded contact-form">
                                <div className="row g-  ">
                                    <div className="col-12 text-center">

                                        <h1 className="display-5 mb-0">Update Issues</h1>
                                    </div>
                                    <div className="col-12 mt-4 ">

                                        <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
                                            {/* <div className="col-md-12">
                                                <div className="form-group">
                                                    <select
                                                        className="form-select border-primary p-2 mb-4"
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
                                            </div> */}
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        required
                                                        type="text"
                                                        className="w-100 form-control p-3 mb-4 border-primary bg-light"
                                                        placeholder="Issues title"
                                                        style={{ height: 55 }}
                                                        {...register("title", {
                                                            required: {
                                                                value: true,
                                                                message: "title is req"
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
                                                        className="w-100 form-control p-3 mb-4 border-primary bg-light"
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
                                            <div className="col-md-12">
                                            <div className="form-group d-flex align-items-center gap-2">

                                                <input
                                                    className="form-control p-3 bg-light"
                                                    placeholder="Enter Location"
                                                    {...register("location", {
                                                        required: {
                                                            value: true,
                                                            message: "Location is required"
                                                        }
                                                    })}
                                                />

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-lg "
                                                    onClick={getLiveLocation}
                                                >
                                                    📍
                                                </button>

                                            </div>
                                        </div>

                                            {/* <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        required
                                                        type="text"
                                                        className="w-100 form-control p-3 mb-4 border-primary bg-light"
                                                        placeholder="AI Score"
                                                        style={{ height: 55 }}
                                                        {...register("aiScore", {
                                                            required: {
                                                                value: true,
                                                                message: "aiScore is req"
                                                            }
                                                        })}
                                                    />

                                                </div>
                                            </div> */}

                                            







                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input
                                                        type="file"
                                                        accept="image/*,video/*"
                                                        multiple
                                                        className="w-100 form-control p-3 mb-4 border-primary"
                                                        {...register("media", {
                                                            
                                                            validate: {
                                                                maxFiles: (files) =>
                                                                    files.length <= 3 || "Maximum 3 files allowed",
                                                            },
                                                        })}
                                                    />
                                                </div>
                                            </div>





                                            <button
                                                className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                                                type="submit"
                                            >
                                               Update Issue
                                            </button>
                                            {/* <p className="text-center mt-2"><Link to="/register"  >Signup as Owner </Link>| <Link to="/coachregister">Investor</Link></p> */}

                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div >
                    </div >

}
        </>
    )
}