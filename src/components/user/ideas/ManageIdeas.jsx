
import { useEffect, useState } from "react"
import ApiService from "../../../services/ApiService"
import { toast } from "react-toastify"
import { Link, useParams } from "react-router-dom"
import ReadMore from "../../pages/ReadMore"

export default function ManageIdeas() {
  const { id } = useParams()

  const [idea, setIdea] = useState([])
  const [previewVideo, setPreviewVideo] = useState(null);
  const userId = sessionStorage.getItem("userId")
  const data = {
    // ownerId: userId,
    categoryId: id,
    status: "Approved"
  }



  const fetchData = () => {

    ApiService.allIdea(data)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data)
          setIdea(res.data.data)
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

      {/* <div
                className="modal fade"
                id="searchModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Search by keyword
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body d-flex align-items-center">
                            <div className="input-group w-75 mx-auto d-flex">
                                <input
                                    type="search"
                                    className="form-control bg-transparent p-3"
                                    placeholder="keywords"
                                    aria-describedby="search-icon-1"
                                />
                                <span id="search-icon-1" className="input-group-text p-3">
                                    <i className="fa fa-search" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
      {/* Modal Search End */}
      {/* Hero Start */}
      <div className="container-fluid bg-light py-3  mt-0">
        <div className="container text-center animated bounceInDown">
          <h1 className="display-1 mb-4">Ideas </h1>
          <ol className="breadcrumb justify-content-center mb-0 animated bounceInDown">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>

            <li className="breadcrumb-item text-dark" aria-current="page">
              Ideas
            </li>
          </ol>
        </div>
      </div>

      <div className="container-fluid py-6">
        <div className="container">
          <div className="text-center wow bounceInUp" data-wow-delay="0.1s">


          </div>
          <div
            className="row mb-4 wow bounceInUp"
            data-wow-delay="0.1s"
          >


            {
              idea.length > 0 ? (
                idea.map((el, index) => (



                  <div
                    className="faqt-item bg-primary rounded p-4 text-center col-3 me-4"
                    style={{
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      cursor: "pointer"
                    }}
                  >
                    <Link
                      to={`/viewideas/${el._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="mb-2 position-relative">
                        {el?.pitchVideoUrl ? (
                          <video
                            className="img-fluid rounded"
                            src={el.pitchVideoUrl}
                            width="500px"
                            height="200px"
                            muted
                            preload="metadata"
                            onClick={() => setPreviewVideo(el.pitchVideoUrl)}
                            style={{
                              cursor: "pointer",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ddd",
                              maxHeight: "180px"
                            }}
                          />
                        ) : (
                          <span className="text-light">No Video</span>
                        )}
                      </div>

                      <div className="text-start">
                        <h4
                          className="mb-1"
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#fff"
                          }}
                        >
                          Idea Title: {el.title}
                        </h4>

                        <p
                          className="mb-0"
                          style={{
                            fontSize: "14px",
                            lineHeight: "1.4",
                            color: "#f1f1f1",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                          }}
                        >
                          Description: <ReadMore
  text={el.description}
  limit={20}
  className="text-white mb-0"
/>
                        </p>
                      </div>
                    </Link>
                  </div>



                ))
              ) : (
                <div className="col-12 text-center">
                  <h4 className="text-muted">
                    No Ideas available
                  </h4>
                  <p>Please check back later.</p>
                </div>
              )
            }
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




    </>


  )
}




























{/* <div className="container-fluid py-6">
    <div className="container">
      <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
        <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
          Testimonial
        </small>
        <h1 className="display-5 mb-5">What Our Customers says!</h1>
      </div>
      <div
        className="owl-carousel owl-theme testimonial-carousel testimonial-carousel-1 mb-4 wow bounceInUp"
        data-wow-delay="0.1s"
      >
        <div className="testimonial-item rounded bg-light">
          <div className="d-flex mb-3">
            <img
              src="/assets/img/testimonial-1.jpg"
              className="img-fluid rounded-circle flex-shrink-0"
              alt=""
            />
            <div className="position-absolute" style={{ top: 15, right: 20 }}>
              <i className="fa fa-quote-right fa-2x" />
            </div>
            <div className="ps-3 my-auto">
              <h4 className="mb-0">Person Name</h4>
              <p className="m-0">Profession</p>
            </div>
          </div>
          <div className="testimonial-content">
            <div className="d-flex">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
            </div>
            <p className="fs-5 m-0 pt-3">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore
              et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="testimonial-item rounded bg-light">
          <div className="d-flex mb-3">
            <img
              src="/assets/img/testimonial-2.jpg"
              className="img-fluid rounded-circle flex-shrink-0"
              alt=""
            />
            <div className="position-absolute" style={{ top: 15, right: 20 }}>
              <i className="fa fa-quote-right fa-2x" />
            </div>
            <div className="ps-3 my-auto">
              <h4 className="mb-0">Person Name</h4>
              <p className="m-0">Profession</p>
            </div>
          </div>
          <div className="testimonial-content">
            <div className="d-flex">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
            </div>
            <p className="fs-5 m-0 pt-3">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore
              et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="testimonial-item rounded bg-light">
          <div className="d-flex mb-3">
            <img
              src="/assets/img/testimonial-3.jpg"
              className="img-fluid rounded-circle flex-shrink-0"
              alt=""
            />
            <div className="position-absolute" style={{ top: 15, right: 20 }}>
              <i className="fa fa-quote-right fa-2x" />
            </div>
            <div className="ps-3 my-auto">
              <h4 className="mb-0">Person Name</h4>
              <p className="m-0">Profession</p>
            </div>
          </div>
          <div className="testimonial-content">
            <div className="d-flex">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
            </div>
            <p className="fs-5 m-0 pt-3">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore
              et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="testimonial-item rounded bg-light">
          <div className="d-flex mb-3">
            <img
              src="/assets/img/testimonial-4.jpg"
              className="img-fluid rounded-circle flex-shrink-0"
              alt=""
            />
            <div className="position-absolute" style={{ top: 15, right: 20 }}>
              <i className="fa fa-quote-right fa-2x" />
            </div>
            <div className="ps-3 my-auto">
              <h4 className="mb-0">Person Name</h4>
              <p className="m-0">Profession</p>
            </div>
          </div>
          <div className="testimonial-content">
            <div className="d-flex">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
            </div>
            <p className="fs-5 m-0 pt-3">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore
              et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
      <div
        className="owl-carousel testimonial-carousel testimonial-carousel-2 wow bounceInUp"
        data-wow-delay="0.3s"
      >
        <div className="testimonial-item rounded bg-light">
          <div className="d-flex mb-3">
            <img
              src="/assets/img/testimonial-1.jpg"
              className="img-fluid rounded-circle flex-shrink-0"
              alt=""
            />
            <div className="position-absolute" style={{ top: 15, right: 20 }}>
              <i className="fa fa-quote-right fa-2x" />
            </div>
            <div className="ps-3 my-auto">
              <h4 className="mb-0">Person Name</h4>
              <p className="m-0">Profession</p>
            </div>
          </div>
          <div className="testimonial-content">
            <div className="d-flex">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
            </div>
            <p className="fs-5 m-0 pt-3">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore
              et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="testimonial-item rounded bg-light">
          <div className="d-flex mb-3">
            <img
              src="/assets/img/testimonial-2.jpg"
              className="img-fluid rounded-circle flex-shrink-0"
              alt=""
            />
            <div className="position-absolute" style={{ top: 15, right: 20 }}>
              <i className="fa fa-quote-right fa-2x" />
            </div>
            <div className="ps-3 my-auto">
              <h4 className="mb-0">Person Name</h4>
              <p className="m-0">Profession</p>
            </div>
          </div>
          <div className="testimonial-content">
            <div className="d-flex">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
            </div>
            <p className="fs-5 m-0 pt-3">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore
              et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="testimonial-item rounded bg-light">
          <div className="d-flex mb-3">
            <img
              src="/assets/img/testimonial-3.jpg"
              className="img-fluid rounded-circle flex-shrink-0"
              alt=""
            />
            <div className="position-absolute" style={{ top: 15, right: 20 }}>
              <i className="fa fa-quote-right fa-2x" />
            </div>
            <div className="ps-3 my-auto">
              <h4 className="mb-0">Person Name</h4>
              <p className="m-0">Profession</p>
            </div>
          </div>
          <div className="testimonial-content">
            <div className="d-flex">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
            </div>
            <p className="fs-5 m-0 pt-3">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore
              et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="testimonial-item rounded bg-light">
          <div className="d-flex mb-3">
            <img
              src="/assets/img/testimonial-4.jpg"
              className="img-fluid rounded-circle flex-shrink-0"
              alt=""
            />
            <div className="position-absolute" style={{ top: 15, right: 20 }}>
              <i className="fa fa-quote-right fa-2x" />
            </div>
            <div className="ps-3 my-auto">
              <h4 className="mb-0">Person Name</h4>
              <p className="m-0">Profession</p>
            </div>
          </div>
          <div className="testimonial-content">
            <div className="d-flex">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
            </div>
            <p className="fs-5 m-0 pt-3">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore
              et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div> */}