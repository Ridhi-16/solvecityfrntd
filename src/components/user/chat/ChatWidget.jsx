import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./Chat";
import ApiService from "../../../services/ApiService";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [receiverId, setReceiverId] = useState(null);
    const [users, setUsers] = useState([]);

    const userId = sessionStorage.getItem("userId");
    const role = sessionStorage.getItem("role"); // "admin" | "employee" | "user"

    useEffect(() => {
        if (!userId || !role) return;

        const fetchUsers = async () => {
            try {
                let usersList = [];

                // ======================
                // 🧑‍💼 ADMIN
                // ======================
                if (role === "admin") {
                    const resEmployees = await ApiService.getAllEmployees()

                    if (resEmployees.data.success) {
                        usersList = resEmployees.data.data;
                    }
                }

                // ======================
                // 👨‍🔧 EMPLOYEE
                // ======================
                if (role === "employee") {
                    // Get assigned users
                    const resUsers = await ApiService.getChatUsers({ userId });

                    if (resUsers.data.success) {
                        usersList = resUsers.data.data;
                    }

                    // Add admin
                    const resAdmin = await ApiService.getAdmins()

                    if (resAdmin.data.success) {
                        const adminList = resAdmin.data.data;

                        adminList.forEach((admin) => {
                            const exists = usersList.find(
                                (u) =>
                                    (u?.userId?._id || u?._id) ===
                                    (admin?.userId?._id || admin?._id)
                            );

                            if (!exists) {
                                usersList.push(admin);
                            }
                        });
                    }

                }

                // ======================
                // 👤 USER
                // ======================
                if (role === "user") {
                    const resEmployee = await ApiService.getChatEmployee({ userId })

                    if (resEmployee.data.success) {
                        usersList = resEmployee.data.data;
                    }
                }
                console.log("FINAL USERS LIST 👉", usersList);

                setUsers(usersList);
            } catch (err) {
                console.error("Error fetching chat users:", err);
            }
        };

        fetchUsers();
    }, [userId, role]);

    // ✅ Helper function to safely extract user info
    const getUserName = (u) => {
        return u?.name || u?.userId?.name || "Unknown";
    };

    const getUserId = (u) => {
        return u?.userId?._id || u?._id;
    };

    const getUserRole = (u) => {
        return u?.role || u?.userId?.role;
    };

    const getUserImage = (u) => {
        return u?.profileImage || u?.userId?.profileImage || null;
    };



    return (
        <div style={styles.widget}>
            {!open && (
                <button style={styles.floatingButton} onClick={() => setOpen(true)}>
                    💬
                </button>
            )}

            {open && (
                <div style={{
                    ...styles.chatContainer,
                    display: receiverId ? "flex" : "block",
                }}>
                    {/* Sidebar */}
                    {!receiverId && (
                        <div style={styles.sidebar}>
                            <div style={styles.sidebarHeader}>
                                <span>
                                    {role === "admin"
                                        ? "Employees"
                                        : role === "employee"
                                            ? "Users"
                                            : "Employees"}
                                </span>

                                <button style={styles.closeBtn} onClick={() => setOpen(false)}>
                                    X
                                </button>
                            </div>

                            <div style={styles.userList}>
                                {users.length ? (
                                    users.map((u) => (

                                        <div
                                            key={getUserId(u)}
                                            style={styles.userItem}
                                            onClick={() => setReceiverId(getUserId(u))}
                                        >
                                            {getUserImage(u) && (
                                                <img
                                                    src={getUserImage(u)}
                                                    alt="profile"
                                                    style={styles.profileImg}
                                                />
                                            )}



                                            <div>
                                                {getUserName(u)}{" "}
                                                {getUserRole(u) === "admin" ? "(Admin)" : ""}
                                            </div>
                                        </div>

                                    ))
                                ) : (
                                    <div style={{ padding: 10 }}>No users available</div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Chat panel */}
                    {receiverId && (
                        <div style={styles.chatPanel}>
                            <div style={styles.chatHeader}>
                                <button
                                    onClick={() => setReceiverId(null)}
                                    style={styles.backBtn}
                                >
                                    ←
                                </button>

                                <span>
                                    {users.find((u) => getUserId(u) === receiverId)
                                        ? getUserName(
                                            users.find((u) => getUserId(u) === receiverId)
                                        )
                                        : "Chat"}
                                </span>

                                <button onClick={() => setOpen(false)} style={styles.closeBtn}>
                                    X
                                </button>
                            </div>

                            <div style={styles.chatPanelInner}>
                                <Chat receiverId={receiverId} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const styles = {
    widget: { position: "fixed", bottom: 20, right: 20, zIndex: 9999 },

    floatingButton: {
        borderRadius: "50%",
        width: 60,
        height: 60,
        fontSize: 24,
        background: "#226e58",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },

    chatContainer: {
        display: "flex",
        width: 350,
        height: 500,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        overflow: "hidden",
        
    },

    sidebar: {
        width: "100%",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",

    },

    sidebarHeader: {
        padding: 10,
        fontWeight: "bold",
        background: "#226e58",
        display: "flex",
        justifyContent: "space-between",
        color: "white"
    },

    userList: { flex: 1, overflowY: "auto" },

    userItem: {
        padding: 10,
        borderBottom: "1px solid #226e58",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
    },


    chatPanel: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,        // allows chat box to shrink inside flex
        position: "relative", // for header z-index stacking
    },

    chatHeader: {
        padding: 10,
        background: "#226e58",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontWeight: "bold",
        position: "relative", // <-- add this
        zIndex: 10            // <-- higher than chat area
    },

    chatPanelInner: {
        flex: 1,
        overflowY: "auto",   // scrollable messages
        padding: 0,
    },


    closeBtn: {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        color: "white"
    },

    backBtn: {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: 18,
        color: "white"
    },
    profileImg: {
        width: 35,
        height: 35,
        borderRadius: "50%",
        objectFit: "cover",
        marginRight: 10,
    },

};
