import React, { useState, useEffect } from 'react';
import axios from 'axios';

const windowSize = 10;

function App() {
  const [windowState, setWindowState] = useState([]);
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const fetchNumbers = async (numberId) => {
      try {
        const response = await axios.get(https://test-server-apl.com/${numberId}, {
          timeout: 500,
        });
        return response.data.numbers;
      } catch (error) {
        console.error(Error fetching numbers: ${error});
        return [];
      }
    };

    const calculateAverage = (numbers) => {
      const sum = numbers.reduce((acc, num) => acc + num, 0);
      return sum / numbers.length;
    };

    const handleRequest = async (numberId) => {
      if (!['p', 'f', 'e', 'r'].includes(numberId)) {
        return { error: 'Invalid number ID' };
      }

      const newNumbers = await fetchNumbers(numberId);
      const uniqueNumbers = [...new Set(newNumbers)];

      setWindowPrevState(windowState);
      setWindowState([...windowState, ...uniqueNumbers].slice(-windowSize));
      setNumbers(uniqueNumbers);

      const average = calculateAverage(windowState);
      setAverage(average);
    };

    return handleRequest;
  }, [windowState]);

  const handleRequest = async (numberId) => {
    const response = await handleRequest(numberId);
    return response;
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <form>
        <input type="text" placeholder="Enter number ID (p, f, e, or r)" />
        <button onClick={(e) => handleRequest(e.target.value)}>Calculate</button>
      </form>
      <div>
        <h2>Response</h2>
        <pre>
          {JSON.stringify({
            windowPrevState,
            windowCurrState: windowState,
            numbers,
            avg: average.toFixed(2),
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;