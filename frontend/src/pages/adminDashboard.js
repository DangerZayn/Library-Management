import React, { useEffect } from 'react';
import { useRole } from '../components/RoleContext';
import { useLogin } from '../components/IsLoginContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { role } = useRole();
    const { isLogin } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin === true && role !== "admin") {
            navigate('/user/login');
        }
    }, [isLogin, role, navigate]);

    return (
        <div className="jumbotron text-center" style={{ marginTop: "50px", marginBottom: "50px" }}>
            <h1 className="display-4">Welcome to the Admin Dashboard</h1>
        </div>
    );
};

export default AdminDashboard;
