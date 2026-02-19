import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FloatingAI() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSend = async () => {
        if (!message) return;

        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/ai/check-issue",
                { message }
            );

            if (res.data.success) {
                const { category, priority, solution } = res.data.data;
                if (category === "Other") {
                    alert("This system only handles city-related complaints.");
                    return;
                }

                if (priority === "High") {
                    navigate("/issues/add", {
                        state: { description: message }
                    });
                } else {
                    setReply(solution);
                }
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    return (
        <>
            {/* Floating Button */}
            <div
                onClick={() => setOpen(!open)}
                style={styles.button}
            >
                🤖
            </div>

            {/* Chat Popup */}
            {open && (
                <div style={styles.chatBox}>
                    <h4>City AI Assistant</h4>

                    <textarea
                        placeholder="Describe your issue: Spot, street, area?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={styles.textarea}
                    />

                    <button onClick={handleSend} style={styles.sendBtn}>
                        {loading ? "Checking..." : "Send"}
                    </button>

                    {reply && (
                        <div style={styles.reply}>
                            <strong>Solution:</strong>
                            <p>{reply}</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

const styles = {
    button: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "15px",
        borderRadius: "50%",
        cursor: "pointer",
        fontSize: "20px"
    },
    chatBox: {
        position: "fixed",
        bottom: "80px",
        right: "20px",
        width: "300px",
        background: "white",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)"
    },
    textarea: {
        width: "100%",
        height: "80px",
        marginBottom: "10px"
    },
    sendBtn: {
        width: "100%",
        padding: "8px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer"
    },
    reply: {
        marginTop: "10px",
        backgroundColor: "#f2f2f2",
        padding: "8px",
        borderRadius: "5px"
    }
};
