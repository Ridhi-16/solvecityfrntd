import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import ReadMore from "../../pages/ReadMore"
import ApiService from "../../../services/ApiService"
import { MoonLoader } from "react-spinners"

export default function MyIssues() {
    const [issues, setIssues] = useState([])
    const [previewVideo, setPreviewVideo] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [votes, setVotes] = useState({});
    const[load,setLoad]=useState(false)

    const [userVotes, setUserVotes] = useState({});

    const [categories, setCategories] = useState([]); // list of categories
    const [selectedCategory, setSelectedCategory] = useState(""); // currently selected category
    const [selectedStatus, setSelectedStatus] = useState(""); // All / Resolved / In-progress / Removed
    const [sortByVotes, setSortByVotes] = useState("");






    const userId = sessionStorage.getItem("userId")
    

    const getAddressFromLatLng = async (latlng) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.split(",")[0]}&lon=${latlng.split(",")[1]}`
            );

            const data = await res.json();
            return data.display_name;
        } catch (err) {
            return latlng; // fallback
        }
    };

    const fetchVotes = () => {
        ApiService.allVotes({})
            .then((res) => {
            
                if (res.data.success) {
                    
                    const voteData = res.data.data;
                    const countMap = {};
                    const userVoteMap = {};

                    voteData.forEach((vote) => {
                        const issueId = vote.issuesId?._id;

                        if (issueId) {
                            countMap[issueId] = (countMap[issueId] || 0) + 1;

                            // check if current user voted
                            if (vote.userId?._id === userId) {
                                userVoteMap[issueId] = true;
                            }
                        }
                    });

                    setVotes(countMap);
                    setUserVotes(userVoteMap);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };


    const upVoteIssue = (issueId) => {
        ApiService.addVotes({ issuesId: issueId })
            .then((res) => {
                if (res.data.success) {

                    toast.success(res.data.message);

                    setVotes((prev) => ({
                        ...prev,
                        [issueId]: (prev[issueId] || 0) + 1
                    }));

                    setUserVotes((prev) => ({
                        ...prev,
                        [issueId]: true
                    }));

                } else {
                    toast.info(res.data.message); // already liked
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    const fetchCategories = () => {
        ApiService.allCategory() // replace with your API call
            .then(res => {
                if (res.data.success) {
                    setCategories(res.data.data);
                }
            })
            .catch(err => {
                toast.error(err.message);
            });
    };







    const fetchData = () => {
        console.log("USER ID 👉", userId)
setLoad(true)

        
        ApiService.allIssues({userId:userId})
        

            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setLoad(false)
                    setIssues(res.data.data)


                }
                else {
                setLoad(false)

                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                setLoad(false)
                toast.error(err.message)
            })
    }
    useEffect(() => {
        fetchData()
        fetchVotes();
        fetchCategories();
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
            <section id="events-cards" className="events-cards section">
                {/* Section Title */}
                <div className="container section-title" >
                    <span className="description-title">Issues</span>
                    <h2>Issues</h2>

                </div>
                {/* End Section Title */}

                <div className="container"  >
                    <section id="rooms-2" className="rooms-2 section">
                        <div className="room-filters">
                            <div className="row g-3 align-items-center">
                                {/* <div className="col-lg-3 col-md-6">
            <label className="form-label">Price Range</label>
            <select className="form-select">
              <option>All Prices</option>
              <option>$100 - $200</option>
              <option>$200 - $350</option>
              <option>$350+</option>
            </select>
          </div> */}
                                <div className="col-lg-3 col-md-6">
                                    <label className="form-label">Sort By Votes</label>
                                    <select
                                        className="form-select"
                                        value={sortByVotes}
                                        onChange={(e) => setSortByVotes(e.target.value)}
                                    >
                                        <option value="">Default</option>
                                        <option value="high">Most Voted</option>
                                        <option value="low">Least Voted</option>
                                    </select>
                                </div>

                                <div className="col-lg-3 col-md-6">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="Open">Open</option>
                                        <option value="In-Progress">In-Progress</option>
                                        <option value="Resolved">Resolved</option>
                                      
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <label className="form-label">Categories</label>
                                    <select
                                        className="form-select"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>



                    <div className="row g-4">
                        {issues
                        .filter(el =>
                                    (!selectedCategory || el.categoryId._id === selectedCategory) &&
                                    (!selectedStatus || el.status === selectedStatus)
                                ).length > 0 ? (
                            issues
                                .filter(el =>
                                    (!selectedCategory || el.categoryId._id === selectedCategory) &&
                                    (!selectedStatus || el.status === selectedStatus)
                                )
                                .sort((a, b) => {
                                    if (!sortByVotes) return 0;

                                    const votesA = votes[a._id] || 0;
                                    const votesB = votes[b._id] || 0;

                                    if (sortByVotes === "high") {
                                        return votesB - votesA; // descending
                                    } else if (sortByVotes === "low") {
                                        return votesA - votesB; // ascending
                                    }

                                    return 0;
                                })
                                .map((el, index) => (

                                    <div className="col-lg-4 col-md-6">
                                        <div className="event-item"  >
                                            <div className="event-header">
                                                <div
                                                    className="event-icon"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => upVoteIssue(el._id)}
                                                >
                                                    <i
                                                        className={`bi ${userVotes[el._id] ? "bi-star-fill text-warning" : "bi-star"
                                                            }`}
                                                        style={{ fontSize: "18px" }}
                                                    />
                                                    <span style={{ fontSize: "12px", marginLeft: "5px", color: "white" }}>
                                                        {votes[el._id] || 0}
                                                    </span>
                                                </div>



                                                {/* Show Images Only */}
                                                {el?.media &&
                                                    el.media
                                                        .filter(file => !file.match(/\.(mp4|webm|ogg)$/i))
                                                        .map((img, index) => (
                                                            <img
                                                                key={index}
                                                                src={img}
                                                                alt="media"
                                                                width="70"
                                                                height="55"
                                                                onClick={() => setPreviewImage(img)}
                                                                style={{
                                                                    cursor: "pointer",
                                                                    objectFit: "cover",
                                                                    borderRadius: "4px",
                                                                    border: "1px solid #ddd",
                                                                    marginRight: "5px"
                                                                }}
                                                            />
                                                        ))
                                                }
                                            </div>

                                            <div className="event-content">
                                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <span
                                                        className={`badge ${el.status === "Resolved"
                                                            ? "bg-success"
                                                            : el.status === "In-Progress"
                                                                ? "bg-warning text-dark"
                                                                : el.status === "Open"
                                                                    ? "bg-danger"
                                                                    : "bg-secondary"
                                                            }`}
                                                        style={{ fontSize: "16px" }}
                                                    >
                                                        {el.status}
                                                    </span>
                                                </div>
                                                <h4>{el.title}</h4>


                                                <p>{el.categoryId.categoryName}</p>

                                                {/* Show Video Button If Video Exists */}
                                                <div className="media-preview d-flex gap-2">
                                                    {el.media.map((file, idx) => {
                                                        const isVideo = file.match(/\.(mp4|webm|ogg)$/i);
                                                        return isVideo ? (
                                                            <video
                                                                key={idx}
                                                                src={file}
                                                                width="70"
                                                                height="55"
                                                                muted
                                                                preload="metadata"
                                                                style={{ cursor: "pointer", borderRadius: "4px" }}
                                                                onClick={() => setPreviewVideo(file)}
                                                            />
                                                        ) : (
                                                            <img
                                                                key={idx}
                                                                src={file}
                                                                alt="media"
                                                                width="70"
                                                                height="55"
                                                                style={{ cursor: "pointer", borderRadius: "4px", objectFit: "cover" }}
                                                                onClick={() => setPreviewImage(file)}
                                                            />
                                                        );
                                                    })}
                                                </div>


                                                <div className="event-features mt-3">
                                                    <span className="feature-item">

                                                        <i className="bi bi-check-circle" />
                                                        Description:
                                                        <ReadMore
                                                            text={el.description}
                                                            limit={20}
                                                            className="text-dark "
                                                        />
                                                    </span>
                                                    <span className="feature-item">
                                                        <i className="bi bi-check-circle" />Location: {el.locationText}
                                                    </span>
                                                    <span className="feature-item">
                                                        <i className="bi bi-check-circle" />AI SeverityScore: {el.aiSeverityScore}
                                                    </span>







                                                    <span className="feature-item">
                                                        <i className="bi bi-check-circle" /> {el?.resolveMedia && el.resolveMedia.length > 0 ? (
                                                            el.resolveMedia.map((file, index) => {
                                                                const isVideo = file.match(/\.(mp4|webm|ogg)$/i);

                                                                return isVideo ? (
                                                                    <video
                                                                        key={index}
                                                                        src={file}
                                                                        width="70"
                                                                        height="55"
                                                                        muted
                                                                        preload="metadata"
                                                                        onClick={() => setPreviewVideo(file)}
                                                                        style={{
                                                                            cursor: "pointer",
                                                                            borderRadius: "4px",
                                                                            border: "1px solid #ddd",
                                                                            marginRight: "5px"
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        key={index}
                                                                        src={file}
                                                                        alt="media"
                                                                        width="70"
                                                                        height="55"
                                                                        onClick={() => setPreviewImage(file)}
                                                                        style={{
                                                                            cursor: "pointer",
                                                                            objectFit: "cover",
                                                                            borderRadius: "4px",
                                                                            border: "1px solid #ddd",
                                                                            marginRight: "5px"
                                                                        }}
                                                                    />
                                                                );
                                                            })
                                                        ) : (
                                                            <span>No Resolved Media</span>
                                                        )}
                                                    </span>

                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                ))
                        ) : (<div className="col-12 text-center">
                            <h4 className="text-muted">
                                {issues.length === 0
            ? "No Issues available"
            : "No data found for selected filter"}
                            </h4>
                            <p>Please check back later.</p>
                        </div>
                        )
                        }



                    </div>
                </div>
            </section>
}
            {previewVideo && (
                <div
                    onClick={() => setPreviewVideo(null)} // click outside closes
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}
                >
                    <video
                        src={previewVideo}
                        controls
                        autoPlay
                        onClick={(e) => e.stopPropagation()} // clicking video does not close
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            borderRadius: "6px",
                            boxShadow: "0 0 10px #000"
                        }}
                    />
                </div>
            )}

            {previewImage && (
                <div
                    onClick={() => setPreviewImage(null)} // click outside closes
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}
                >
                    <img
                        src={previewImage}
                        alt="Preview"
                        onClick={(e) => e.stopPropagation()} // clicking image does not close
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            borderRadius: "6px",
                            boxShadow: "0 0 10px #000"
                        }}
                    />
                </div>
            )}
        

        




            {/* <div className="media-preview d-flex gap-2">
    {el.media.map((file, idx) => {
        const isVideo = file.match(/\.(mp4|webm|ogg)$/i);
        return isVideo ? (
            <video
                key={idx}
                src={file}
                width="70"
                height="55"
                muted
                preload="metadata"
                style={{ cursor: "pointer", borderRadius: "4px" }}
                onClick={() => setPreviewVideo(file)}
            />
        ) : (
            <img
                key={idx}
                src={file}
                alt="media"
                width="70"
                height="55"
                style={{ cursor: "pointer", borderRadius: "4px", objectFit: "cover" }}
                onClick={() => setPreviewImage(file)}
            />
        );
    })}
</div> */}












        </>
    )
}



