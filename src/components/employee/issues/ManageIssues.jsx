import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import ReadMore from "../../pages/ReadMore"
import ApiService from "../../../services/ApiService"



export default function ManageIssues() {
    const [Issues, setIssues] = useState([])
    const [previewVideo, setPreviewVideo] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);


    const [showResolveModal, setShowResolveModal] = useState(false);
    const [selectedIssueId, setSelectedIssueId] = useState(null);
    const [resolveFiles, setResolveFiles] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");

 const [categories, setCategories] = useState([]); // list of categories
const [selectedCategory, setSelectedCategory] = useState("");

const [sortByVotes, setSortByVotes] = useState("");
    const [votes, setVotes] = useState({});
    const [userVotes, setUserVotes] = useState({});



    const userId = sessionStorage.getItem("userId")


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
    const data = { userId }; // logged-in employee ID

    ApiService.getEmployeeIssues(data)
        .then(res => {
            if (res.data.success) {
                setIssues(res.data.data);
            } else {
                toast.error(res.data.message || "Failed to fetch issues");
            }
        })
        .catch(err => toast.error(err.message));
};

    useEffect(() => {
        fetchData()
        fetchCategories()
        fetchVotes()
    }, [])


    const statuses = ["Open", "In-progress", "Resolved"]


    const changeStatus = (id, newStatus) => {

        if (newStatus === "Resolved") {
            setSelectedIssueId(id);
            setSelectedStatus(newStatus);
            setShowResolveModal(true);
            return;
        }

        // Normal status update
        Swal.fire({
            title: "Are you sure?",
            text: `Change status to "${newStatus}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, update"
        }).then((result) => {
            if (result.isConfirmed) {
                ApiService.changeStatusIssues({
                    _id: id,
                    status: newStatus
                })
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire("Updated!", res.data.message, "success")
                            fetchData()
                        }
                    })
                    .catch((err) => toast.error(err.message))
            }
        });
    };

    const handleResolveFileChange = (e) => {
        setResolveFiles([...e.target.files]);
    };
    const submitResolveStatus = () => {

        if (resolveFiles.length === 0) {
            toast.error("Please upload resolve media");
            return;
        }

        const formData = new FormData();
        formData.append("_id", selectedIssueId);
        formData.append("status", selectedStatus);

        resolveFiles.forEach((file) => {
            formData.append("resolveMedia", file);
        });

        ApiService.changeStatusIssues(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    setShowResolveModal(false);
                    setResolveFiles([]);
                    fetchData();
                }
            })
            .catch((err) => toast.error(err.message));
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
    



    const deleteIssues = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${!id ? "Enable" : "Delete"}`
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    _id: id,

                }
                let token = sessionStorage.getItem("token")
                let headers = {
                    Authorization: token
                }
                ApiService.DeleteIssues(data)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                // text: "Your file has been deleted.",
                                icon: "success"
                            });
                            fetchData()
                        }
                        else {
                            toast.error(res.data.message)
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message)
                    })
            }
        })


    }


    return (
        <>




            <div className="container-fluid bg-light py-4 my-4 mt-0">
                <div className="container text-center animated bounceInDown">
                    <h1 className="display-1 mb-4">All Issuess</h1>
                    <ol className="breadcrumb justify-content-center mb-0 animated bounceInDown">
                        <li className="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>

                        <li className="breadcrumb-item text-dark" aria-current="page">
                            All Issuess
                        </li>
                        <li>
                            
                        </li>
                    </ol>
                </div>
            </div>

            <div className="container">
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
                            {/* <div className="col-lg-3 col-md-6">
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
                            </div> */}
                        </div>
                    </div>
                </section>
                <div className="row">
                    
                    <div className="col">
                        {Issues
                        .filter(el =>
        (!selectedCategory || el.categoryId._id === selectedCategory) &&
        (!selectedStatus || el.status === selectedStatus)
    ).length > 0 ? (
                            <div className="table-responsive">
                                < table className="table border ">
                                    <thead className="thead-dark">
                                        <tr className="text-dark">
                                            <th scope="col">Sno</th>
                                            <th scope="col">Issues Title</th>
                                            <th scope="col">Category Name</th>

                                            <th scope="col">Description</th>
                                            

                                            {/* <th scope="col">Current Amount</th>
                                            <th scope="col">Total Amount</th> */}
                                            <th scope="col">Issued by</th>

                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>



                                        </tr>
                                    </thead>
                                    <tbody>

                                        {Issues
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
                                        ?.map((el, index) => (
                                            <tr key={index}>
                                                <td className="text-dark">{index + 1}</td>
                                                <td >
                                                    <h5 ><ReadMore
                                                        text={el.title}
                                                        limit={20}
                                                        className="text-dark mb-0"
                                                    /></h5>
                                                </td>
                                                <td className="hover-bg">
                                                    <h5> {el?.categoryId?.categoryName}</h5>
                                                </td>

                                                <td className="hover-bg">
                                                    <h5 > <ReadMore
                                                        text={el.description}
                                                        limit={20}
                                                        className="text-dark mb-0"
                                                    /></h5>
                                                </td>
                                                <td className="hover-bg">
                                                    <h5 >{el?.userId?.name} </h5>
                                                </td>
                                                

                                                {/* <td className="hover-bg text-center">
                                                    {el?.media && el.media.length > 0 ? (
                                                        el.media.map((file, index) => {
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
                                                        <span>No Media</span>
                                                    )}
                                                </td> */}



                                                <td className="hover-bg">
                                                    <h5 className={
                                                        el.status === "Approved"
                                                            ? "text-success"
                                                            : el.status === "Open"
                                                                ? "text-danger"
                                                                : "text-warning"
                                                    }>
                                                        {el.status}
                                                    </h5>
                                                </td>







                                                <td >
                                                    <select
                                                        className="form-select form-select-sm d-inline w-auto"
                                                        value={el.status}
                                                        onChange={(e) => changeStatus(el._id, e.target.value)}
                                                    >
                                                        <option value="Open">Open</option>
                                                        <option value="In-Progress">In-Progress</option>
                                                        
                                                        <option value="Resolved">Resolved</option>
                                                    </select>

                                                    <Link to={`/employee/employeeissues/${el._id}`} className="btn btn-success mx-2"> View</Link>

                                                    {/* <button className="btn" onClick={() => { deleteIssues(el?._id) }}><i class="bi bi-trash-fill"></i></button> */}
                                                    {/* <Link to={`/owner/Issues/update/${el._id}`} className="btn btn-success mx-2"> <i class="bi bi-pencil-fill"></i></Link> */}
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    {Issues.length === 0
            ? "No Issues available"
            : "No data found for selected filter"}
                                </h4>
                                <p>Please check back later.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
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




            {showResolveModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 2000
                    }}
                    onClick={() => setShowResolveModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "#fff",
                            padding: "25px",
                            borderRadius: "8px",
                            width: "400px"
                        }}
                    >
                        <h5>Add Resolve Media</h5>

                        <input
                            type="file"
                            multiple
                            className="form-control my-3"
                            onChange={handleResolveFileChange}
                        />

                        <div className="d-flex justify-content-end gap-2">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowResolveModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={submitResolveStatus}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
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




        </>



    )
}