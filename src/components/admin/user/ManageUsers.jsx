import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"

export default function ManageUsers() {
    const [user, setUser] = useState([])
    const [previewImage, setPreviewImage] = useState(null);



    const fetchData = () => {

        // const data = {
        //     limit: Limit,
        //     currentPage: currentPage
        // }
        ApiService.allUser({role:"users"})
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setUser(res.data.data)


                }
                else {
                    toast.error(res.data.essage)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])



    const softDelete = (id, status) => {
            Swal.fire({
                title: "Are you sure?",
                text: "You will be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: status === "Active" ? "Deactivate" : "Activate"
            }).then((result) => {
                if (result.isConfirmed) {
                    let data = {
                        _id: id,
    
                    }
                    let token = sessionStorage.getItem("token")
                    let headers = {
                        Authorization: token
                    }
                    ApiService.softDeleteUser(data)
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


    

    const deleteUser = (id) => {
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
                ApiService.Deleteuser(data)
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
      <h1 className="display-1 mb-4">Users</h1>
      <ol className="breadcrumb justify-content-center mb-0 animated bounceInDown">
        <li className="breadcrumb-item">
          <a href="#">Home</a>
        </li>
     
        <li className="breadcrumb-item text-dark" aria-current="page">
      Users
        </li>
      </ol>
    </div>
  </div>
           
            <div className="container py-4">
                <div className="row">
                    <div className="col">
                        {user.length > 0 ? (
                            <div className="table-responsive">
                                < table className="table border ">
                                    <thead className="thead-dark">
                                        <tr className="text-dark">
                                            <th scope="col">Sno</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>

                                            <th scope="col">Contact</th>
                                            <th scope="col">Image</th>

                                           
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>



                                        </tr>
                                    </thead>
                                    <tbody>

                                        {user?.map((el, index) => (
                                            <tr key={index}>
                                                <td className="text-dark">{index + 1}</td>
                                                <td >
                                                    <h5>{el?.name}</h5>
                                                </td>

                                                <td >
                                                    <h5>{el?.email}</h5>
                                                </td>

                                                <td className="hover-bg">
                                                    <h5> {el?.contact}</h5>
                                                </td>


                                                <td className="hover-bg text-center">
                                                    {el?.profileImage ? (
                                                        <img
                                                            onClick={() => setPreviewImage(el?.profileImage)}
                                                            src={el?.profileImage}
                                                            alt="land"
                                                            width="70"
                                                            height="55"
                                                            style={{
                                                                objectFit: "cover",
                                                                borderRadius: "4px",
                                                                border: "1px solid #ddd"
                                                            }}
                                                        />
                                                    ) : (
                                                        <span>No Image</span>
                                                    )}
                                                </td>
                                                
                                                <td className="hover-bg">
                                                    <h5> {el?.status === "Active" ? "Active" : "In-active"}</h5>
                                                </td>

                                                <td >
                                                    <button className="btn">
                                                        <ReactSwitch
                                                            checked={el?.status === "Active"}
                                                            onChange={() => { softDelete(el?._id, el?.status) }} /></button>

                                                    <button className="btn" onClick={() => { deleteUser(el?._id) }}><i class="bi bi-trash-fill"></i></button>
                                                    {/* <Link to={`/coach/update/${el._id}`} className="btn btn-success mx-2"> <i class="bi bi-pencil-fill"></i></Link> */}
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No Idea Owners available
                                </h4>
                                <p>Please check back later.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>

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