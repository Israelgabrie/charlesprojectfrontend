import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();
  // CSS styles as JavaScript objects
  const styles = {
    notFoundContainer: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: '20px',
    },
    notFoundContent: {
      maxWidth: '500px',
      textAlign: 'center',
      padding: '40px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    },
    errorCode: {
      fontFamily: '"CalibreBold", sans-serif',
      fontSize: '120px',
      fontWeight: 700,
      color: '#6366f1',
      lineHeight: 1,
      marginBottom: '20px',
      textShadow: '2px 2px 0px rgba(99, 102, 241, 0.2)',
    },
    errorTitle: {
      fontFamily: '"CalibreBold", sans-serif',
      fontSize: '32px',
      color: '#333',
      margin: '0 0 16px 0',
    },
    errorMessage: {
      fontFamily: '"CalibreRegular", sans-serif',
      fontSize: '18px',
      color: '#666',
      margin: '0 0 30px 0',
      lineHeight: 1.5,
    },
    homeButton: {
      backgroundColor: '#6366f1',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '12px 24px',
      fontFamily: '"CalibreRegular", sans-serif',
      fontSize: '16px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
  };

  // State for button hover effect
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={styles.notFoundContainer}>
      <div style={styles.notFoundContent}>
        <div style={styles.errorCode}>404</div>
        <h1 style={styles.errorTitle}>Page Not Found</h1>
        <p style={styles.errorMessage}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button 
          style={{
            ...styles.homeButton,
            backgroundColor: isHovered ? '#4f46e5' : '#6366f1'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={()=>{navigate("/homepage/home")}}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}