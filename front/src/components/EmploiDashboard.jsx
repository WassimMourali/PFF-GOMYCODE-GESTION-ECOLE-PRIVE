// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import {
  Paper, Grid, Typography, CircularProgress, Modal, Box, Table, TableBody, TableCell, TableHead, TableRow, TableContainer
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme();

// Styled component for Paper
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[8],
  },
}));

// Styled modal box
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  maxHeight: '80vh', // Makes sure the modal doesn't exceed the viewport height
};

// EmploiDashboard component
const EmploiDashboard = () => {
  const [emplois, setEmplois] = useState([]); // Initialize state as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedClass, setSelectedClass] = useState(null); // State to track selected class for modal
  const [open, setOpen] = useState(false); // State to control modal visibility

  // Fetching data from /emplois API
  useEffect(() => {
    const fetchEmplois = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/emplois');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Log to verify the structure of the response
        setEmplois(data); // Set data to state
      } catch (error) {
        setError(error.message); // Set error if fetch fails
      } finally {
        setLoading(false); // Stop loading once data is fetched or if there's an error
      }
    };

    fetchEmplois(); // Call the function when the component mounts
  }, []); // Empty dependency array to run once on mount

  // Function to group emploi by class
  const groupByClass = (emplois) => {
    return emplois.reduce((acc, emploi) => {
      const { class: className } = emploi;
      if (!acc[className]) {
        acc[className] = [];
      }
      acc[className].push(emploi);
      return acc;
    }, {});
  };

  // Function to sort emploiList by time (8h - 17h)
  const sortByTime = (emploiList) => {
    const timeOrder = [
      '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
      '14:00', '15:00', '16:00', '17:00'
    ];

    return timeOrder.map((hour) => {
      const emploiAtThisHour = emploiList.find(emploi => emploi.time === hour);
      return emploiAtThisHour || { time: hour, roomNumber: '', professor: '' };
    });
  };

  // Grouping emplois by class
  const emploisGroupedByClass = groupByClass(emplois);

  // Function to handle card click and open modal
  const handleCardClick = (classEmploi) => {
    setSelectedClass(classEmploi);
    setOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedClass(null); // Clear selected class
  };

  // Handle print button during printing
  useEffect(() => {
    const handleBeforePrint = () => {
      document.getElementById('print-button').style.display = 'none';
    };
    const handleAfterPrint = () => {
      document.getElementById('print-button').style.display = 'block';
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    // Cleanup to avoid memory leaks
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []); // <-- The empty dependency array ensures that the hook runs once, unconditionally

  // Handle loading state
  if (loading) {
    return <CircularProgress />;
  }

  // Handle error state
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Render Emplois data if available
  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      {emplois && emplois.length > 0 ? (
        // Display cards for each class
        Object.keys(emploisGroupedByClass).map((className, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledPaper onClick={() => handleCardClick(emploisGroupedByClass[className])}>
              <Typography variant="h6" gutterBottom>
                {className} {/* Display class name */}
              </Typography>
            </StyledPaper>
          </Grid>
        ))
      ) : (
        <Typography variant="body1">No data available</Typography> // Display message if no data
      )}

      {/* Modal to display the class's weekly schedule */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h5" gutterBottom>
            Programme de la semaine - {selectedClass && selectedClass[0].class}
          </Typography>

          {selectedClass ? (
            selectedClass.length > 0 ? (
              Object.entries(selectedClass.reduce((acc, emploi) => {
                const { day } = emploi;
                if (!acc[day]) {
                  acc[day] = [];
                }
                acc[day].push(emploi);
                return acc;
              }, {})).map(([day, emploiList], dayIndex) => (
                <div key={dayIndex}>
                  <Typography variant="h6" gutterBottom>
                    {day} {/* Display the day */}
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Heure</TableCell>
                          <TableCell>Salle</TableCell>
                          <TableCell>Professeur</TableCell>
                          <TableCell>Matiére</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortByTime(emploiList).map((emploiAtThisHour, hourIndex) => (
                          <TableRow key={hourIndex}>
                            <TableCell>{emploiAtThisHour.time}</TableCell>
                            <TableCell>{emploiAtThisHour.roomNumber || '-'}</TableCell>
                            <TableCell>{emploiAtThisHour.professor || '-'}</TableCell>
                            <TableCell>{emploiAtThisHour.subject || '-'}</TableCell>

                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              ))
            ) : (
              <Typography variant="body2">Aucune donnée disponible pour cette classe.</Typography>
            )
          ) : (
            <Typography variant="body2">Aucune donnée sélectionnée.</Typography>
          )}
        </Box>
      </Modal>

      {/* Hidden print button */}
      <button id="print-button" onClick={() => window.print()} style={{ display: 'block' }}>
        Imprimer
      </button>
    </Grid>
  );
};

// Main App component
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <EmploiDashboard />
    </ThemeProvider>
  );
};

// Export the App component
export default App;
