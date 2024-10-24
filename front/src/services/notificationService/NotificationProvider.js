// src/services/NotificationService/NotificationProvider.js

import React from 'react';
import { SnackbarProvider } from 'notistack';

// Composant fournisseur pour le contexte de notifications
const NotificationProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3} // Nombre maximum de notifications affichées simultanément
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right', // Position des notifications
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotificationProvider;
