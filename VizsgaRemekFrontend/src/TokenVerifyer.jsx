import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

const TokenVerifyer = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate(`/`);
            }
        } catch (error) {
            console.error("Error verifying token:", error);
            navigate(`/`);
        }
    }, [navigate]);

    return children;
}
export default TokenVerifyer;