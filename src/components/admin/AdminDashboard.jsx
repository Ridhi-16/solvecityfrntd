import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ApiService from "../../services/ApiService"


export default function AdminDashboard(){
  const userId=sessionStorage.getItem("userId")
    const [details, setDetails]=useState([])
    const fetchData=()=>{
        ApiService.dashboard({userId:userId})
         .then((res)=>{
                    console.log(res)
                    if(res.data.success){
                        setDetails(res.data)
        
                    }
                    else{
                        toast.error(res.data.message)
                    }
                })
                .catch((err)=>{
                    toast.error(err.message)
                })
    }
    useEffect(()=>{
        fetchData()
    },[])
    return(

    <>
    <div className="container-fluid bg-light py-4 my-4 mt-0">
    <div className="container text-center animated bounceInDown">
      <h1 className="display-1 mb-4"> Dashboard </h1>
      
    </div>
  </div>
    
                
            
             <div className="container-fluid py-5">
    <div className="container">
      <div className="row g-5">
        {/* <div className="col-lg-4 col-md-6">
          <div className="mb-3">
            <h6 className="text-primary text-uppercase">Land</h6>
            <h1 className="display-5">{details.totalLand}</h1>
          </div>
          
        </div> */}
        <div className="col-lg-4 col-md-6">
          <div className="faqt-item temp-button rounded p-4 text-center">
            <i class="bi bi-person-square fs-1 mb-4 "></i>
            <h4 className="text-light">User</h4>
            <p className="mb-0  fs-4">
              {details.totalUsers}            </p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="faqt-item temp-button rounded p-4 text-center">
           <i class="bi bi-person-check fs-1 mb-4 "></i>
            <h4 className="text-light">Employee</h4>
            <p className="mb-0  fs-4">
                 { details.totalEmployee}
            </p>
          </div>
        </div>


        <div className="col-lg-4 col-md-6">
          <div className="faqt-item temp-button rounded p-4 text-center">
           <i class="bi bi-plus-circle-fill fs-1 mb-4 " ></i>
            <h4 className="text-light">Issue</h4>
            <p className="mb-0  fs-4">
             { details.totalIssue}
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="faqt-item  temp-button rounded p-4 text-center">
            <i class="bi bi-star-fill fs-1 mb-4 "></i>
            <h4 className="text-light">Upvote</h4>
            <p className="mb-0  fs-4">
            { details.totalUpvote}            </p>
          </div>
        </div>
        {/* <div className="col-lg-4 col-md-6">
          <div className="faqt-item temp-button rounded p-4 text-center">
            <i class="fas fa-comment mb-4 "></i>
            <h4 className="text-light">Comments</h4>
            <p className="mb-0  fs-4">
            { details.totalIdeaComment}
            </p>
          </div>
        </div> */}
        
        <div className="col-lg-4 col-md-6">
          <div className="faqt-item  temp-button rounded p-4 text-center">
          <i class="bi bi-images fs-1 mb-4 "></i>
            <h4 className="text-light">Category</h4>
            <p className="mb-0  fs-4">
                 { details.totalCategory}
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="faqt-item temp-button rounded p-4 text-center">
           <i class="bi bi-receipt fs-1 mb-4 "></i>
            <h4 className="text-light">IssueAssign</h4>
            <p className="mb-0  fs-4">
              {details.totalIssueAssign}            </p>
          </div>
        </div>
       
      </div>
    </div>
  </div>



    </>
    
)
}