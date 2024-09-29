import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import './SurveyForm.css'; // Import the CSS file

const SurveyForm = () => {
  const [userData, setUserData] = useState({ name: '', upi: '' });
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleResponseChange = (question, answer) => {
    setResponses({ ...responses, [question]: answer });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.name && userData.upi) {
      try {
        await addDoc(collection(db, 'surveys'), {
          userData: userData,
          surveyResponses: responses,
          timestamp: serverTimestamp(),
        });
        setSubmitted(true);
      } catch (error) {
        console.error('Error saving survey data:', error);
      }
    } else {
      alert('Please fill out your name and UPI.');
    }
  };

  return (
    <div className="container">
      <h1>Survey Form</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>UPI:</label>
            <input
              type="text"
              name="upi"
              value={userData.upi}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <p>How satisfied are you with our service?</p>
            <label>
              <input
                type="radio"
                name="satisfaction"
                value="Very Satisfied"
                onChange={() => handleResponseChange('satisfaction', 'Very Satisfied')}
              />
              Very Satisfied
            </label>
            <label>
              <input
                type="radio"
                name="satisfaction"
                value="Satisfied"
                onChange={() => handleResponseChange('satisfaction', 'Satisfied')}
              />
              Satisfied
            </label>
            <label>
              <input
                type="radio"
                name="satisfaction"
                value="Dissatisfied"
                onChange={() => handleResponseChange('satisfaction', 'Dissatisfied')}
              />
              Dissatisfied
            </label>
          </div>

          <div>
            <p>Would you recommend us to a friend?</p>
            <label>
              <input
                type="radio"
                name="recommend"
                value="Yes"
                onChange={() => handleResponseChange('recommend', 'Yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="recommend"
                value="No"
                onChange={() => handleResponseChange('recommend', 'No')}
              />
              No
            </label>
          </div>

          <div>
            <p>Do you trust your friend who sent an unknown link?</p>
            <label>
              <input
                type="radio"
                name="trustFriend"
                value="Yes"
                onChange={() => handleResponseChange('trustFriend', 'Yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="trustFriend"
                value="No"
                onChange={() => handleResponseChange('trustFriend', 'No')}
              />
              No
            </label>
          </div>

          <button type="submit">Submit Survey</button>
        </form>
      ) : (
        <div>
          <h2>Thank you for completing the survey!</h2>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
