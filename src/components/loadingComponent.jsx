import React from 'react';

export default function LoadingPage() {
  // CSS styles as JavaScript objects
  const styles = {
    loadingContainer: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
    },
    loadingContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '40px',
    },
    spinnerContainer: {
      marginBottom: '24px',
    },
    spinner: {
      width: '60px',
      height: '60px',
      border: '5px solid rgba(99, 102, 241, 0.2)',
      borderRadius: '50%',
      borderTopColor: '#6366f1',
      animation: 'spin 1s ease-in-out infinite',
    },
    loadingText: {
      fontFamily: '"CalibreBold", sans-serif',
      fontSize: '28px',
      color: '#333',
      margin: '0 0 12px 0',
    },
    loadingSubtext: {
      fontFamily: '"CalibreRegular", sans-serif',
      fontSize: '16px',
      color: '#666',
      margin: '0',
    },
  };

  // Add keyframes animation to document
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);

    // Clean up function to remove the style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={styles.loadingContainer}>
      <div style={styles.loadingContent}>
        <div style={styles.spinnerContainer}>
          <div style={styles.spinner}></div>
        </div>
        <h2 style={styles.loadingText}>Loading...</h2>
        <p style={styles.loadingSubtext}>Please wait while we prepare your content</p>
      </div>
    </div>
  );
}