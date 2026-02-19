import axios from "axios"
const BASEURL = "https://solvecity-bcknd.onrender.com"

class ApiServices {
    getToken() {
        let token = sessionStorage.getItem("token")
        let headers = {
            Authorization: token
        }
        return headers
    }

    login(data) {
        return axios.post(BASEURL + "/api/user/login", data, { headers: this.getToken() })
    }
    softDeleteUser(data) {
        return axios.post(BASEURL + "/admin/user/softDelete", data, { headers: this.getToken() })
    }
    register(data) {
        return axios.post(BASEURL + "/api/user/register", data)
    }
    addEmployee(data) {
        return axios.post(BASEURL + "/admin/employee/add", data, { headers: this.getToken() })
    }
    allUser(data) {
        return axios.post(BASEURL + "/api/user/all", data)
    }
    addCategory(data) {
        return axios.post(BASEURL + "/admin/category/add", data, { headers: this.getToken() })
    }
    allCategory(data) {
        return axios.post(BASEURL + "/api/category/all", data)
    }
    changeStatusCategory(data) {
        return axios.post(BASEURL + "/admin/category/changeStatus", data, { headers: this.getToken() })
    }
    singleCategory(data) {
        return axios.post(BASEURL + "/api/category/single", data)
    }
    updateCategory(data) {
        return axios.post(BASEURL + "/admin/category/update", data, { headers: this.getToken() })
    }
    DeleteCategory(data) {
        return axios.post(BASEURL + "/admin/category/delete", data, { headers: this.getToken() })
    }
    addIssues(data) {
        return axios.post(BASEURL + "/user/issues/add", data, { headers: this.getToken() })
    }
    allIssues(data) {
        return axios.post(BASEURL + "/api/issues/all", data, { headers: this.getToken() })
    }
    changeStatusIssues(data) {
        return axios.post(BASEURL + "/employee/issues/changeStatus", data, { headers: this.getToken() })
    }
    singleIssues(data) {
        return axios.post(BASEURL + "/api/issues/single", data)
    }
    updateIssues(data) {
        return axios.post(BASEURL + "/user/issues/update", data, { headers: this.getToken() })
    }
    DeleteIssues(data) {
        return axios.post(BASEURL + "/admin/issues/delete", data, { headers: this.getToken() })
    }


    allIssuesAssignment(data) {
        return axios.post(BASEURL + "/api/assign/all", data, { headers: this.getToken() })
    }
    // ApiService.js
    getEmployeeIssues(data) {

        return axios.post(BASEURL + "/api/assignissues", data, { headers: this.getToken() })
    }



    addIdeaMedia(data) {
        return axios.post(BASEURL + "/owner/ideaMedia/add", data, { headers: this.getToken() })
    }
    updateIdeaMedia(data) {
        return axios.post(BASEURL + "/owner/ideaMedia/update", data, { headers: this.getToken() })
    }
    allIdeaMedia(data) {
        return axios.post(BASEURL + "/api/ideaMedia/all", data, { headers: this.getToken() })
    }
    addVotes(data) {
        return axios.post(BASEURL + "/user/upvote/add", data, { headers: this.getToken() })
    }
    addComments(data) {
        return axios.post(BASEURL + "/investor/ideaComment/add", data, { headers: this.getToken() })
    }
    allVotes(data) {
        return axios.post(BASEURL + "/api/upvote/all", data, { headers: this.getToken() })
    }
    allComments(data) {
        return axios.post(BASEURL + "/api/ideaComment/all", data, { headers: this.getToken() })
    }
    addInvestment(data) {
        return axios.post(BASEURL + "/investor/investment/add", data, { headers: this.getToken() })
    }
    allInvestment(data) {
        return axios.post(BASEURL + "/api/investment/all", data, { headers: this.getToken() })
    }
    updateInvestment(data) {
        return axios.post(BASEURL + "/investor/investment/all", data, { headers: this.getToken() })
    }
    changeStatusInvestment(data) {
        return axios.post(BASEURL + "/investor/investment/changeStatus", data, { headers: this.getToken() })
    }
    addPayment(data) {
        return axios.post(BASEURL + "/investor/payment/add", data, { headers: this.getToken() })
    }

    allEmployee(data) {
        return axios.post(BASEURL + "/admin/employee/all", data, { headers: this.getToken() })
    }
    changeStatusEmployee(data) {
        return axios.post(BASEURL + "/admin/employee/changeStatus", data, { headers: this.getToken() })
    }
    singleEmployee(data) {
        return axios.post(BASEURL + "/admin/employee/single", data, { headers: this.getToken() })
    }
    updateEmployee(data) {
        return axios.post(BASEURL + "/admin/employee/update", data, { headers: this.getToken() })
    }
    DeleteEmployee(data) {
        return axios.post(BASEURL + "/admin/employee/delete", data, { headers: this.getToken() })
    }
    addBooking(data) {
        return axios.post(BASEURL + "/user/booking/add", data, { headers: this.getToken() })
    }
    allBooking(data) {
        return axios.post(BASEURL + "/api/booking/all", data, { headers: this.getToken() })
    }
    changeStatusBooking(data) {
        return axios.post(BASEURL + "/admin/booking/changeStatus", data, { headers: this.getToken() })
    }
    singleBooking(data) {
        return axios.post(BASEURL + "/api/booking/single", data)
    }
    updateBooking(data) {
        return axios.post(BASEURL + "/user/user/booking/update", data, { headers: this.getToken() })
    }
    DeleteBooking(data) {
        return axios.post(BASEURL + "/farmer/booking/delete", data, { headers: this.getToken() })
    }

    addMatchApplication(data) {
        return axios.post(BASEURL + "owner/matchapplication/add", data, { headers: this.getToken() })
    }


    singleInvestment(data) {
        return axios.post(BASEURL + "/api/investment/single", data)
    }
    updateInvestment(data) {
        return axios.post(BASEURL + "admin/investment/update", data, { headers: this.getToken() })
    }
    DeleteInvestment(data) {
        return axios.post(BASEURL + "/admin/investment/delete", data, { headers: this.getToken() })
    }
    addMatch(data) {
        return axios.post(BASEURL + "/admin/match/add", data, { headers: this.getToken() })
    }
    allMatch(data) {
        return axios.post(BASEURL + "/api/match/all", data, { headers: this.getToken() })
    }
    changeStatusMatch(data) {
        return axios.post(BASEURL + "/admin/match/changeStatus", data, { headers: this.getToken() })
    }
    singleMatch(data) {
        return axios.post(BASEURL + "/api/match/single", data)
    }
    updateMatch(data) {
        return axios.post(BASEURL + "/admin/match/update", data, { headers: this.getToken() })
    }
    DeleteMatch(data) {
        return axios.post(BASEURL + "/admin/match/delete", data, { headers: this.getToken() })
    }
    dashboard(data) {
        return axios.post(BASEURL + "/api/dashboard", data)
    }

    assignIssue(data) {
        return axios.post(BASEURL + "/admin/assign/add", data, { headers: this.getToken() })
    }

    addAnnouncment(data) {
        return axios.post(BASEURL + "/admin/announcment/add", data, { headers: this.getToken() })
    }
    allAnnouncment(data) {
        return axios.post(BASEURL + "/api/announcment/all", data, { headers: this.getToken() })
    }
    changeStatusAnnouncment(data) {
        return axios.post(BASEURL + "/admin/announcment/changeStatus", data, { headers: this.getToken() })
    }
    singleAnnouncment(data) {
        return axios.post(BASEURL + "/api/announcment/single", data, { headers: this.getToken() })
    }
    updateAnnouncment(data) {
        return axios.post(BASEURL + "/admin/announcment/update", data, { headers: this.getToken() })
    }


    getGeminiCropSuggestion(data) {
        return axios.post(
            BASEURL + "/gemini/suggest",
            data,
            // optional auth
        );
    }
    getAISeverityScore = (data) => {
        return axios.post(BASEURL + "/ai/idea-score", data);
    };

    getInvestmentSuggestion = (data) => {
        return axios.post(BASEURL + "/ai/investment-suggestion", data);
    };

    enhanceDescription = async (data) => {
        const response = await axios.post(BASEURL + "/ai/enhance-description", data);
        return response.data;
    };

    reverseGeocode(lat, lon) {
  return axios.get(`${BASEURL}/api/location/reverse`, {
    params: { lat, lon }
  });
}



    getAllEmployees() {
    return axios.post(
      BASEURL + "/chat/get-all-employees",
      {},
      { headers: this.getToken() }
    );
  }

  // Get All Admins
  getAdmins() {
    return axios.post(
      BASEURL + "/chat/get-admin",
      {},
      { headers: this.getToken() }
    );
  }

  // Get All Users (Admin direct chat)
  getAllUsers() {
    return axios.post(
      BASEURL + "/chat/get-all-users",
      {},
      { headers: this.getToken() }
    );
  }

  // ===============================
  // ✅ EMPLOYEE SECTION
  // ===============================

  // Get Users Assigned to Employee
  getChatUsers(data) {
    // data = { userId }
    return axios.post(
      BASEURL + "/chat/get-chat-users",
      data,
      { headers: this.getToken() }
    );
  }

  // ===============================
  // ✅ USER SECTION
  // ===============================

  // Get Assigned Employee for User
  getChatEmployee(data) {
    // data = { userId }
    return axios.post(
      BASEURL + "/chat/get-chat-employee",
      data,
      { headers: this.getToken() }
    );
  }

  // ===============================
  // ✅ COMMON CHAT SECTION
  // ===============================

  // Load Old Messages
  getMessages(data) {
    // data = { userId, receiverId }
    return axios.post(
      BASEURL + "/chat/get-messages",
      data,
      { headers: this.getToken() }
    );
  }

  // Get Conversations List
  getConversations(data) {
    // data = { userId }
    return axios.post(
      BASEURL + "/chat/get-conversations",
      data,
      { headers: this.getToken() }
    );
  }


    



}
export default new ApiServices