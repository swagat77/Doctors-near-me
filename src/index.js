// ### Assumptions
// My estimation for this is around  2.5 hours.
// Similar means here is the rating feature. For example :
// We will display the doctors in a simlar doctor page that have the closest rating to the doctor profile we are currently seeing.

// Given More Time
// // In this project, I have implemented a feature to display similar doctors
//  based on the rating of the current doctor profile. This means that when a user is viewing a doctor's profile,
//   they will also see a list of other doctors with similar ratings.
//  Currently, the list of similar doctors is displayed in a basic 
// format, but with more time and effort, I could improve the design and add more features. One potential improvement would be to
//   display the review score in stars rather than just a number,
//  include a location icon, display data in  organized manner to help users easily identify the location of each doctor.
// // Another improvement would be to organize the doctor profiles 
// in a more visually appealing and user-friendly way. For example, I could display each doctor's photo 
// alongside their rating and other information. I could also improve the buttons and add more hovering functions 
// to make the user experience smoother.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import yoda from './yoda.jpg';
import duck from './duck.jpg';
import relate from './relate.jpg';
import mom from './mom.jpg';
const doctors = [
  { 
    img:yoda,
    name: 'Dr.Harry Maguire',
    address: '1500 Horseway Drive',
    specialty: 'Pediatrics',
    yearsOfExperience: 10,
    reviewScore: 4.5,
    acceptingNewPatients: true,
    similar: ['Dr. Lionel Messi', 'Dr. Cristiano Ronaldo']
  },
  { 
    img :duck,
    name: 'Dr. Lionel Messi',
    address: '1501 horseway Drive',
    specialty: 'Cardiology',
    yearsOfExperience: 15,
    reviewScore: 4.8,
    acceptingNewPatients: false,
    similar: ['Dr.Harry Maguire', 'Dr. Tom Brady']
  },
  {
    img:relate,
    name: 'Dr. Cristiano Ronaldo',
    address: '1502 Horseway drive',
    specialty: 'Dermatology',
    yearsOfExperience: 20,
    reviewScore: 4.7,
    acceptingNewPatients: true,
    similar: ['Dr.Harry Maguire', 'Dr. Tom Brady']
  },
  {
    img:mom,
    name: 'Dr. Tom Brady',
    address: '1503 Horseway Drive',
    specialty: 'Oncology',
    yearsOfExperience: 12,
    reviewScore: 4.2,
    acceptingNewPatients: true,
    similar: ['Dr. Lionel Messi', 'Dr. Cristiano Ronaldo']
  }
];

class DoctorBox extends React.Component {
  render() {
    const { doctor, handleClick } = this.props;
    return (
      <div className="doctor-box" onClick={() => handleClick(doctor)}>
        {doctor.name}
      </div>
    );
  }
}
class DoctorProfile extends React.Component {
  render() {
    const { selectedDoctor } = this.props;
    return (
      
      <div style={{textAlign: 'center'}}>
         <img src={selectedDoctor.img} alt={selectedDoctor.name} />
      <h2 style={{fontWeight: 'bold'}}>{selectedDoctor.name}</h2>

      <button 
        style={{
          backgroundColor: 'red',
          fontSize: '1.2em',
          fontWeight: 'bold'
        }}
        onClick={() => console.log('Book an appointment')}
      >
        Book Appointment
      </button>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
  <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Doctor Profile</h1>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px solid black', padding: '20px' , borderRadius: '5px', backgroundColor: '#f8f8f8' }}>
    {/* <img src={require('./yoda.jpg')} alt="Doctor" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%', marginBottom: '20px' }} /> */}
    <p style={{ fontWeight: 'bold', textAlign: 'center' }}>{selectedDoctor.name}</p>
    <p style={{ fontWeight: 'bold' }}>Address: {selectedDoctor.address}</p>
    <p style={{ fontWeight: 'bold' }}>Specialty: {selectedDoctor.specialty}</p>
    <p style={{ fontWeight: 'bold' }}>Years of Experience: {selectedDoctor.yearsOfExperience}</p>
    <p style={{ fontWeight: 'bold' }}>Review Score: {selectedDoctor.reviewScore}</p>
    <p style={{ fontWeight: 'bold' }}>Accepting New Patients: {selectedDoctor.acceptingNewPatients ? 'Yes' : 'No'}</p>
    <p style={{ fontWeight: 'bold' }}>{selectedDoctor.address}</p>
    </div>
    <p style={{ fontWeight: 'bold', fontSize: '1.5rem', color:'blue' }}>Similar Doctors:</p>
   
    <ul style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '28px' }}>
      {this.props.getSimilarDoctors(selectedDoctor).map(doctor => (
        <li key={doctor.name}>{doctor.name} - Review Score: {doctor.reviewScore}</li>
      ))}
    </ul>
  
    </div>

  
    </div>
    
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: null
    };
  }

  handleDoctorClick = doctor => {
    this.setState({
      selectedDoctor: doctor,
      viewingProfile: true // Setting viewingProfile to true when a doctor is selected
    });
  };

  handleBack = () => {
    this.setState({
      selectedDoctor: null,
      viewingProfile: false // Setting viewingProfile to false when the back button is clicked
    });
  };
  
  getSimilarDoctors = (doctor) => {
    const { similar } = doctor;
    const doctorList = doctors.filter(d => similar.includes(d.name));
    const sortedDoctors = doctorList.sort((a, b) => b.reviewScore - a.reviewScore);
    return sortedDoctors;
  }

  render() {
    const { selectedDoctor, viewingProfile } = this.state;
    return (
      <div>
        <h1 style={{ fontWeight: 'bold', fontSize: '3rem'}}>List of Doctors</h1>

        {viewingProfile ? (
          // Render the back button and DoctorProfile component if viewing a doctor profile
          <div>
            <button className ="back_button" onClick={this.handleBack}>Back</button>
            <DoctorProfile
              selectedDoctor={selectedDoctor}
              getSimilarDoctors={this.getSimilarDoctors}
              handleBack={this.handleBack}
            />
          </div>
        ) : (
          // Render the list of doctors if not viewing a doctor profile
          <div className="doctor-list">
            {doctors.map(doctor => (
              <DoctorBox key={doctor.name} doctor={doctor} handleClick={this.handleDoctorClick} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

  ReactDOM.render(<App />, document.getElementById('root'));