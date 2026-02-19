import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import { toast } from "react-toastify"
import { Link, useParams } from "react-router-dom"
import ReadMore from "../../pages/ReadMore"

export default function EmployeeIssue() {
    const { id } = useParams()
    const [previewImage, setPreviewImage] = useState(null);

    const [issues, setissues] = useState([])
    const [issuesMedia, setissuesMedia] = useState([])

    const [previewVideo, setPreviewVideo] = useState(null);
    const [votes, setVotes] = useState({});
    const [userVotes, setUserVotes] = useState({});






    const login = sessionStorage.getItem("isLogin")
    const userId = sessionStorage.getItem("userId")
    const data = {
        _id: id
    }



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


    const fetchData = () => {

        ApiService.allIssues({ _id: id })
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    setissues(res.data.data)
                }
                else {
                    toast.error(res.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })




        // ApiService.allLikes({ issuesId: id }).then(res => {
        //     if (res.data.success) {
        //         const allLikes = res.data.data || [];
        //         setLikes(allLikes);

        //         const likedMap = {};
        //         allLikes.forEach(l => {
        //             if (l.userId === userId) {
        //                 likedMap[l.issuesId._id] = true;
        //             }
        //         });
        //         setLikedissuess(likedMap);
        //     }
        // });




    }
    useEffect(() => {
        fetchData()
        fetchVotes()
    }, [])
    issues.map((el, index) => {
        // filter media for this issues
        const mediaForissues = issuesMedia.filter(
            (m) => m.issuesId.toString() === el._id.toString()
        )
    });





    return (


        <>


            <main className="main">
                {/* Page Title */}
                <div className="page-title light-background">
                    <div className="container d-lg-flex justify-content-between align-items-center">
                        <h1 className="mb-2 mb-lg-0">Issues</h1>
                        <nav className="breadcrumbs">
                            <ol>
                                <li>
                                    <a href="/admin">Home</a>
                                </li>
                                <li className="current">Issues</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/* End Page Title */}
                {/* Amenities Section */}
                <section id="amenities" className="amenities section">
                    <div className="container"  >
                        <div className="row gy-4">

                            {issues.length > 0 ? (
                                issues
                                    // .filter(el =>
                                    //     (!selectedCategory || el.categoryId._id === selectedCategory) &&
                                    //     (!selectedStatus || el.status === selectedStatus)
                                    // )
                                    .map((el, index) => (

                                        <div className="col-lg-6"  >
                                            <div className="amenity-card">
                                                <div className="amenity-image">
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
                                                <div className="amenity-content">
                                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                        <button type="button" class="btn temp-button">
                                                            <i className="bi bi-star-fill text-warning" /> Votes <span class="badge badge-light fs-5">{votes[el._id] || 0}</span>

                                                        </button>
                                                    </div>
                                                    
                                                    <h3>{el.title}</h3>
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
                                                    <p>
                                                       
                                                      {el.description}
                                                           
                                                    </p>
                                                   
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


                                                    {/* {el?.media && el.media.length > 0 && (
                                                        <button
                                                            className="btn btn-sm btn-outline-primary mb-2"
                                                            onClick={() => {
                                                                const file = el.media[0]; // pick the first media file
                                                                if (file.match(/\.(mp4|webm|ogg)$/i)) {
                                                                    setPreviewVideo(file); // it's a video
                                                                } else {
                                                                    setPreviewImage(file); // it's an image
                                                                }
                                                            }}
                                                        >
                                                            🎥 View Media
                                                        </button>
                                                    )} */}

                                                    <ul className="amenity-features">
                                                        <li>

                                                        </li>
                                                        <li>
                                                            <i className="bi bi-geo-alt" /> {el.locationText}
                                                        </li>
                                                        <li>
                                                          <i className="bi bi-check-circle" />  <span>AI Severity Score: </span>  {el.aiSeverityScore}
                                                        </li>
                                                        <li>
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
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>


                                    ))
                            ) : (<div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No Issues available
                                </h4>
                                <p>Please check back later.</p>
                            </div>
                            )
                            }





                        </div>

                    </div>
                </section>
                {/* /Amenities Section */}
            </main>






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








