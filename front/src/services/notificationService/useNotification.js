// src/services/NotificationService/useNotification.js

import { useSnackbar } from 'notistack';

// Hook personnalisé pour utiliser les notifications
const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Fonction pour afficher une notification
  const notify = (message, variant = 'default') => {
    enqueueSnackbar(message, { variant });
  };

  return notify;
};

export default useNotification;
