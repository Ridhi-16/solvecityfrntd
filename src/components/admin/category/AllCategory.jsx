import { useEffect, useState } from "react"


import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"
import ReactSwitch from "react-switch"
import ReadMore from "../../pages/ReadMore"

export default function AllCategory() {
    const [category, setCategory] = useState([])
    const [previewImage, setPreviewImage] = useState(null);



    const fetchData = () => {

        // const data = {
        //     limit: Limit,
        //     currentPage: currentPage
        // }
        ApiService.allCategory()
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setCategory(res.data.data)


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


    const changeStatus = (id, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: status ? "Deactivate" : "Activate"
        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    _id: id,
                    status: !status   // 🔥 toggle boolean
                };

                let token = sessionStorage.getItem("token");
                let headers = {
                    Authorization: token
                };

                ApiService.changeStatusCategory(data, headers)
                    .then((res) => {
                        if (res.data.success) {
                            Swal.fire({
                                title: res.data.message,
                                icon: "success"
                            });
                            fetchData();
                        } else {
                            toast.error(res.data.message);
                        }
                    })
                    .catch((err) => {
                        toast.error(err.message);
                    });
            }
        });
    };


    const deleteCategory = (id) => {
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
                ApiService.DeleteCategory(data)
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
      <h1 className="display-1 mb-4"> All Categories </h1>
      <ol className="breadcrumb justify-content-center mb-0 animated bounceInDown">
        <li className="breadcrumb-item">
          <a href="/admin">Home</a>
        </li>
       
        <li className="breadcrumb-item text-dark" aria-current="page">
          Categories
        </li>
      </ol>
    </div>
  </div>
           

            <div className="container">
                <div className="row">
                    <div className="col">
                        {category.length > 0 ? (
                            <div className="table-responsive">
                                < table className="table border ">
                                    <thead className="thead-dark ">
                                        <tr className="text-dark" >
                                            <th  scope="col">Sno</th>
                                            <th  scope="col">category Name</th>

                                            <th  scope="col">Description</th>
                                            <th scope="col">Image</th>


                                            <th  scope="col">Status</th>
                                            <th  scope="col">Actions</th>



                                        </tr>
                                    </thead>
                                    <tbody>

                                        {category?.map((el, index) => (
                                            <tr key={index}>
                                                <td className="text-dark">{index + 1}</td>
                                                <td >
                                                    <h5>{el?.categoryName}</h5>
                                                </td>

                                                <td className="hover-bg">
                                                    <h5> <ReadMore
  text={el?.description}
  limit={20}
  className="text-dark mb-0"
/></h5>
                                                </td>
                                                <td className="hover-bg text-center">
                                                    {el?.image ? (
                                                        <img
                                                            onClick={() => setPreviewImage(el.image)}
                                                            src={el.image}
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
                                                    <h5>{el?.status ? "Active" : "In-active"}</h5>

                                                </td>

                                                <td >
                                                    <button className="btn">
                                                        <ReactSwitch
                                                            checked={el?.status}
                                                            onChange={() => changeStatus(el?._id, el?.status)}
                                                        />
                                                    </button>
                                                    <button className="btn" onClick={() => { deleteCategory(el?._id) }}><i class="bi bi-trash-fill"></i></button>
                                                    <Link to={`/admin/category/update/${el._id}`} className="btn btn-success mx-2"> <i class="bi bi-pencil-fill"></i></Link>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    No category available
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