import React, { useState, useEffect } from 'react';

function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('Loading location...');

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
            );
            const data = await response.json();
            setLocation(`${data.city}, ${data.countryName}`);
          } catch (error) {
            setLocation('Location unavailable');
          }
        },
        () => {
          setLocation('Location access denied');
        }
      );
    }

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="time-display">
      <div>{formatTime(currentTime)}</div>
      <div style={{ fontSize: '1rem' }}>{formatDate(currentTime)}</div>
      <div style={{ fontSize: '0.9rem', color: 'var(--secondary-color)' }}>{location}</div>
    </div>
  );
}

export default TimeDisplay;