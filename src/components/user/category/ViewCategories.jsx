import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import ReadMore from "../../pages/ReadMore";

export default function ViewCategories() {

    const [category, setCategory] = useState([])

    const fetchData = () => {

        ApiService.allCategory({ status: true })
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    setCategory(res.data.data)
                }
                else {
                    toast.error(res.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])





    return (
        <>

            <div className="container spacing mb-5">
                <div className="row features-showcase">
                    <div className="col-12">
                        <div
                            className="features-header text-center"


                        >
                            <h3>Categories</h3>
                            <p>
                                Discover the issues and services that help us in a better city

                            </p>
                        </div>
                    </div>
                </div>
                <div className="row ">

                    {category.length > 0 ? (
                        category.map((el, index) => (
                            <div className="col-lg-3 col-md-6 shadow p-3 mb-5 bg-body-tertiary me-5 rounded-2">
                                <Link
                                    to={`/issues/view?category=${el._id}`}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >

                                    <div className="feature-card"  >
                                        <div className="feature-visual">
                                            <img
                                                src={el.image}
                                                style={{ width: "300px", height: "200px" }}

                                                alt="Spa Services"
                                                className="img-fluid rounded-3 "
                                            />
                                            <div className="feature-overlay">

                                            </div>
                                        </div>
                                        <div className="feature-details mt-4">
                                            <h4>{el.categoryName}</h4>
                                            <p>
                                                {el.description}
                                            </p>
                                        </div>
                                    </div>

                                    </Link>
                            </div>

                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <h4 className="text-muted">
                                No Categories available
                            </h4>
                            <p>Please check back later.</p>
                        </div>
                    )}

                </div>

            </div>




        </>





    )
}


