import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { toast } from "react-toastify"

import { useEffect, useState } from "react"
import { MoonLoader } from "react-spinners"
import ApiService from "../../../services/ApiService"



export default function AddIssues() {

    const userId = sessionStorage.getItem("userId")

    let nav = useNavigate()
    const [load, setload] = useState(false)
    const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm()
    const [category, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [locationLoading, setLocationLoading] = useState(false);



    const [enhancedDescription, setEnhancedDescription] = useState("");
    const [enhancedTitle, setEnhancedTitle] = useState("");

    const [enhancing, setEnhancing] = useState(false);


    const data = {
        status: "Approved"
    }
   


  const getLiveLocation = () => {
    if (!navigator.geolocation) {
        toast.error("Geolocation not supported");
        return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const res = await ApiService.reverseGeocode(latitude, longitude)


                const data = await res.data;

                if (data?.display_name) {

                    // Save address string
                    setValue("location", data.display_name);

                    // Save geojson directly in hidden field
                    setValue("geoLocation", {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    });

                    toast.success("Location fetched successfully");
                } else {
                    toast.error("Address not found");
                }
            } catch (err) {
                console.error(err);
                toast.error("Error fetching address");
            } finally {
                setLocationLoading(false);
            }
        },
        (err) => {
            console.error(err);
            toast.error("Permission denied or unable to fetch location");
            setLocationLoading(false);
        }
    );
};







        const handleEnhanceDescription = () => {
      const currentTitle = getValues("title");
      const currentDesc = getValues("description");

      if (!currentTitle) {
        toast.error("Enter title first!");
        return;
      }

      if (!currentDesc) {
        toast.error("Enter description first!");
        return;
      }

      setEnhancing(true);

      // 🔥 SAME API NAME, NEW PAYLOAD
      ApiService.enhanceDescription({
        title: currentTitle,
        description: currentDesc
      })
        .then((res) => {
            console.log("AI RESPONSE 👉", res.data); // keep once for sanity

    const { enhancedTitle, enhancedDescription } = res.data;
            // ✅ Update form correctly
            setValue("title", enhancedTitle);
            setValue("description", enhancedDescription);

            setEnhancedTitle(enhancedTitle);
            setEnhancedDescription(enhancedDescription);

            toast.success("Title & Description enhanced!");

        })
        .catch((err) => {
          console.error(err);
          toast.error("Error enhancing idea");
        })
        .finally(() => {
          setEnhancing(false);
        });
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







    const handleForm = async (data) => {
        setload(true);

        try {
            // 1️⃣ Generate AI score FIRST (hidden)
            const aiRes = await ApiService.getAISeverityScore({
                title: data.title,
                description: data.description,
                
            });
console.log("AI Response:", aiRes.data);

            const aiSeverityScore = aiRes.data.data.aiScore;

            // 2️⃣ Prepare form data
            const formData = new FormData();
console.log("AI Response:", aiRes.data);

            formData.append("title", data.title);
            formData.append("description", data.description);

            // Keep address separately if you want

formData.append("locationText", data.location);

if (data.geoLocation) {
    formData.append("location", JSON.stringify(data.geoLocation));
}



            formData.append("aiSeverityScore", aiSeverityScore); // ✅ CORRECT
            formData.append("categoryId", data.categoryId);
            formData.append("ownerId", userId);
            for (let i = 0; i < data.media.length; i++) {
                formData.append("media", data.media[i]);
            }

            // 3️⃣ Submit idea
            const res = await ApiService.addIssues(formData);

            if (res.data.success) {
                toast.success(res.data.message);
                nav("/issues/view");
            } else {
                toast.error(res.data.message);
            }

        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong"
            );
            console.log(err);
        } finally {
            setload(false);
        }
    };



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

                    <div className="container spacing d-flex justify-content-center">
                        <div className="p-4 bg-light rounded contact-form">
                            <div className="row g-  ">
                                <div className="col-12 text-center">

                                    <h1 className="display-5 mb-0">Add Issues</h1>
                                </div>
                                <div className="col-12 mt-4 ">

                                    <form action="" method="POST" onSubmit={handleSubmit(handleForm, handleError)}>
                                        <div className="col-md-12">
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
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-100 form-control p-3 mb-4  bg-light"
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
                                                <textarea
                                                    required
                                                    className="w-100 form-control p-3 mb-4  bg-light"
                                                    placeholder="Description"
                                                    rows={3} // adjust height
                                                    {...register("description", {
                                                        required: {
                                                            value: true,
                                                            message: "description is req"
                                                        }
                                                    })}
                                                />


                                            </div>
                                        </div>


                                         <div className="col-md-12 mb-2 d-flex align-items-center">
                                                <button

                                                    type="button"
                                                    className="btn btn-outline-success me-2"
                                                    onClick={handleEnhanceDescription}
                                                    disabled={enhancing}
                                                >
                                                    {enhancing ? "Enhancing..." : "Enhance Description and Title"}
                                                </button>
                                                {enhancedDescription && (
                                                    <span className="text-success">✅ Enhanced!</span>
                                                )}
                                            </div>
                                        <div className="col-md-12">
                                            <div className="form-group d-flex align-items-center gap-2">

                                                <input
                                                    className="form-control p-3 mb-4 bg-light"
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
                                                    className="btn mb-4 btn-outline-primary btn-lg"
                                                    onClick={() => {
                                                        getLiveLocation();
                                                       
                                                    }}
                                                    disabled={locationLoading}
                                                >
                                                    {locationLoading ? "Fetching..." : "📍"}
                                                </button>


                                            </div>
                                        </div>
                                        <input type="hidden" {...register("geoLocation")} />

                                        




                                       








                                        {/* <div className="col-md-12">
                                                <div className="form-group position-relative d-flex">

                                                    
                                                    <input 
                                                        readOnly
                                                        type="text"
                                                        className={`w-75  h-25 form-control p-3 mb-2  bg-light ${aiLoading ? "pe-none opacity-75" : ""
                                                            }`}
                                                        placeholder={aiLoading ? "AI is analyzing your idea..." : "AI Score"}
                                                        
                                                        {...register("aiSeverityScore")}
                                                    />

                                                   
                                                    <button
                                                        type="button"
                                                        className=" w-25  h-25 btn btn-sm btn-outline-primary d-flex align-items-center "
                                                        disabled={aiLoading}
                                                        onClick={() => generateAISeverityScore(getValues())}
                                                    >
                                                        {aiLoading ? (
                                                            <>
                                                                <span  className="spinner-border spinner-border-sm h-25 w-25" />
                                                                Generating
                                                            </>
                                                        ) : (
                                                            <>
                                                                🤖 Generate AI Score
                                                            </>
                                                        )}
                                                    </button>

                                                    
                                                   

                                                </div>
                                            </div> */}









                                        <div className="col-12">
                                            <div className="form-group">
                                                <input
                                                    required
                                                    type="file"
                                                    accept="image/*,video/*"
                                                    multiple
                                                    className="w-100 form-control p-3 mb-4 "
                                                    {...register("media", {
                                                        required: "Media is required",
                                                        validate: {
                                                            maxFiles: (files) =>
                                                                files.length <= 3 || "Maximum 3 files allowed",
                                                        },
                                                    })}
                                                />
                                            </div>
                                        </div>








                                        <button
                                            className="w-100 btn temp-button form-control p-3  rounded-pill"
                                            type="submit"
                                        >
                                            Add Issues
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



