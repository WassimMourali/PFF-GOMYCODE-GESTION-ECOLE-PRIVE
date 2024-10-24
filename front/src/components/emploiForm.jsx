import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Button, Typography, TextField, InputLabel, Grid } from '@mui/material';

const EmploiForm = () => {
  const [classes, setClasses] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/classes')
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error('Error fetching classes:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/professors')
      .then((response) => response.json())
      .then((data) => setProfessors(data))
      .catch((error) => console.error('Error fetching professors:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/subjects')
      .then((response) => response.json())
      .then((data) => setSubjects(data))
      .catch((error) => console.error('Error fetching subjects:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!roomNumber.match(/^salle\s[1-9]$|^salle\s[12][0-9]$|^salle\s30$/)) {
      alert('Room number must start with "salle" followed by a number between 1 and 30.');
      return;
    }

    const schedule = {
      class: selectedClass,
      professor: selectedProfessor,
      subject: selectedSubject,
      hoursPerWeek: hoursPerWeek,
      day: selectedDay,
      time: selectedTime,
      roomNumber: roomNumber,
    };

    fetch('http://localhost:5000/api/emplois', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schedule),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Schedule saved:', data);
        alert('Schedule submitted successfully');
      })
      .catch((error) => {
        console.error('Error submitting schedule:', error);
      });

    setSelectedClass('');
    setSelectedProfessor('');
    setSelectedSubject('');
    setHoursPerWeek('');
    setSelectedDay('');
    setSelectedTime('');
    setRoomNumber('');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Gestion Emploi de Temps</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <InputLabel>Class</InputLabel>
            <Select
              fullWidth
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              required
            >
              {classes.map((classItem) => (
                <MenuItem key={classItem.id} value={classItem.classLevel}>
                  {classItem.classLevel}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={4}>
            <InputLabel>Professor</InputLabel>
            <Select
              fullWidth
              value={selectedProfessor}
              onChange={(e) => setSelectedProfessor(e.target.value)}
              required
            >
              {professors.map((professor) => (
                <MenuItem
                  key={professor.id}
                  value={`${professor.firstName} ${professor.lastName}`}
                >
                  {professor.firstName} {professor.lastName}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={4}>
            <InputLabel>Subject</InputLabel>
            <Select
              fullWidth
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              required
            >
              {subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.subjectClassf}>
                  {subject.subjectClassf}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Hours per Week"
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              required
              inputProps={{ min: 1, max: 40 }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <InputLabel>Day of the Week</InputLabel>
            <Select
              fullWidth
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              required
            >
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
              <MenuItem value="Saturday">Saturday</MenuItem>
              <MenuItem value="Sunday">Sunday</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Room Number"
              placeholder="salle 1"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Enregistrer
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EmploiForm;
