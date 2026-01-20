import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [success, setSuccess] = useState(0);

  useEffect(() => {
    socket.on('record', payload => {
      setRecords(prev => [...prev.slice(-100), payload]);
    });

    socket.on('stats', ({ total, success }) => {
      setTotal(prev => prev + total);
      setSuccess(prev => prev + success);
    });

    return () => {
      socket.off('record');
      socket.off('stats');
    };
  }, []);

  const successRate = total
      ? ((success / total) * 100).toFixed(2)
      : 0;

  return (
      <div style={{ padding: 20 }}>
        <h1>Encrypted Timeseries Dashboard</h1>

        <div style={{ marginBottom: 20 }}>
          <p><strong>Total Messages Received:</strong> {total}</p>
          <p><strong>Valid Messages:</strong> {success}</p>
          <p><strong>Success Rate:</strong> {successRate}%</p>
        </div>

        <h3>Live Valid Records</h3>
        <ul>
          {records.map((r, i) => (
              <li key={i}>
                {r.name} | {r.origin} → {r.destination}
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
