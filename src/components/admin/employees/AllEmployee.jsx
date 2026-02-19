import { useEffect, useState } from "react"

import ReactSwitch from "react-switch"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import ApiService from "../../../services/ApiService"


export default function AllEmployee() {
    const [employees, setEmployees] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]); // list of categories




    const fetchData = () => {

        // const data = {
        //     limit: Limit,
        //     currentPage: currentPage
        // }
        ApiService.allEmployee()
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setEmployees(res.data.data)


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
        fetchCategories()
    }, [])

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


      const changeStatus = (id, status) => {
                 Swal.fire({
                     title: "Are you sure?",
                     text: "You will be able to revert this!",
                     icon: "warning",
                     showCancelButton: true,
                     confirmButtonColor: "#3085d6",
                     cancelButtonColor: "#d33",
                     confirmButtonText: status === "Active" ? "Suspended" : "Activate"
                 }).then((result) => {
                     if (result.isConfirmed) {
                         let data = {
                             _id: id,
         
                         }
                         let token = sessionStorage.getItem("token")
                         let headers = {
                             Authorization: token
                         }
                         ApiService.changeStatusEmployee(data)
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

    const deleteEmployees = (id) => {
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
                ApiService.DeleteEmployee(data)
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
      <h1 className="display-1 mb-4">All employees</h1>
      <ol className="breadcrumb justify-content-center mb-0 animated bounceInDown">
        <li className="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        
        <li className="breadcrumb-item text-dark" aria-current="page">
          All employees
        </li>
      </ol>
    </div>
  </div>



           

            <div className="container py-2">
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
                            {/* <div className="col-lg-3 col-md-6">
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
                            </div> */}

                            {/* <div className="col-lg-3 col-md-6">
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
                                        <option value="Removed">Removed</option>
                                    </select>
                                </div> */}
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
                <div className="row">
                    <div className="col">
                        {employees
                        .filter(el => !selectedCategory || el.categoryId._id === selectedCategory)
                        .length > 0 ? (
                            <div className="table-responsive">
                                < table className="table border ">
                                    <thead className="thead-dark">
                                        <tr className="text-dark">
                                            <th scope="col">Sno</th>
                                            <th scope="col">employees Name</th>
                                            <th scope="col">Email</th>
                                            
                                            <th scope="col">Contact</th>
                                            
                                            <th scope="col">Category</th>
                                             <th scope="col">Designation</th>
                                            <th scope="col">Image</th>

                                            
                                            <th scope="col">Status</th>
                                            <th scope="col">Actions</th>



                                        </tr>
                                    </thead>
                                    <tbody>

                                        {employees
                                        .filter(el => !selectedCategory || el.categoryId._id === selectedCategory)
                                        ?.map((el, index) => (
                                            <tr key={index}>
                                                <td className="text-dark">{index + 1}</td>
                                                <td >
                                                    <h5>{el?.userId?.name}</h5>
                                                </td>

                                                <td >
                                                    <h5>{el?.userId?.email}</h5>
                                                </td>
                                                <td className="hover-bg">
                                                    <h5> {el?.userId?.contact}</h5>
                                                </td>
                                                 <td >
                                                    <h5>{el?.categoryId?.categoryName}</h5>
                                                </td>
                                                <td >
                                                    <h5>{el?.designation}</h5>
                                                </td>
                                                
                                                

                                                
                                                <td className="hover-bg text-center">
                                                    {el?.userId?.profileImage ? (
                                                        <img
                                                            onClick={() => setPreviewImage(el?.userId?.profileImage)}
                                                            src={el?.userId?.profileImage}
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
                                                    <h5> {el?.status === "Active" ? "Active" : "Suspended"}</h5>
                                                </td>

                                                <td >
                                                    <button className="btn">
                                                        <ReactSwitch
                                                            checked={el?.status === "Active"}
                                                            onChange={() => { changeStatus(el?._id, el?.status) }} /></button>

                                               
                                                    <button className="btn" onClick={() => { deleteEmployees(el?._id) }}><i class="bi bi-trash-fill"></i></button>
                                                    <Link to={`/admin/employees/update/${el._id}`} className="btn btn-success mx-2"> <i class="bi bi-pencil-fill"></i></Link>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="col-12 text-center">
                                <h4 className="text-muted">
                                    {employees.length === 0
            ? "No Issues available"
            : "No data found for selected filter"}
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