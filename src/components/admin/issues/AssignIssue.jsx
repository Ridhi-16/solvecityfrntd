import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../../services/ApiService";

export default function AssignIssue() {

    const { id,userId } = useParams(); // ✅ correct
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [load, setLoad] = useState(false);
    const [employees, setEmployees] = useState([]);

    

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await ApiService.allEmployee();

            if (res?.data?.success) {
                setEmployees(res.data.data || []);
            }

        } catch (err) {
            toast.error("Error fetching employees");
        }
    };

    const handleForm = async (data) => {
        setLoad(true);

        try {
            const res = await ApiService.assignIssue({
                userId:userId,
                issuesId: id, // issue from URL
                employeeId: data.employeeId
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/issues/all"); // redirect
            } else {
                toast.error(res.data.message);
            }

        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong"
            );
        } finally {
            setLoad(false);
        }
    };

    const handleError = (errors) => {
        console.log("Form Errors:", errors);
        toast.error("Please select employee");
    };

    return (
        <>
            {load ? (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999
                }}>
                    <MoonLoader size={50} />
                </div>
            ) : (

                <div className="container spacing d-flex justify-content-center">
                    <div className="p-4 bg-light rounded contact-form">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h1 className="display-5 mb-0">Assign Issue</h1>
                            </div>

                            <div className="col-12 mt-4">
                                <form onSubmit={handleSubmit(handleForm, handleError)}>

                                    {/* Select Employee */}
                                    <div className="col-md-12">
                                        <select
                                            className="form-select p-2 mb-2"
                                            {...register("employeeId", {
                                                required: "Employee is required"
                                            })}
                                        >
                                            <option value="">Select Employee</option>

                                            {employees && employees.length > 0 ? (
                                                employees.map((emp) => (
                                                    <option key={emp?._id} value={emp?._id}>
                                                        {emp?.userId?.name}-{emp?.categoryId.categoryName}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No Employees Found</option>
                                            )}

                                        </select>

                                        {errors.employeeId && (
                                            <p className="text-danger">
                                                {errors.employeeId.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        className="w-100 btn temp-button form-control p-3 rounded-pill mt-3"
                                        type="submit"
                                    >
                                        Assign Issue
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
