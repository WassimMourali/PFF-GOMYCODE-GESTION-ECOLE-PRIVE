import React from 'react';
import { Button, Popconfirm } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Suppression du token d'authentification
    navigate('/'); // Redirection vers la page de connexion
  };

  return (
    <Popconfirm
      title="Êtes-vous sûr de vouloir vous déconnecter?"
      onConfirm={handleLogout}
      okText="Oui"
      cancelText="Non"
    >
      <Button 
        type="primary" 
        danger 
        icon={<LogoutOutlined />} 
        style={{ marginTop: '10px', marginLeft: '10px', width: '30%' }}
      >
        Déconnexion
      </Button>
    </Popconfirm>
  );
};

export default LogoutButton;
