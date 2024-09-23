import './App.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './assets/fashionpurses.png';

function App() {
  const [names, setNames] = useState([]);
  const [input, setInput] = useState('');
  const [winner, setWinner] = useState(null);
  const [homepage, setHomepage] = useState(true);
  const [currentItem, setCurrentItem] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  const handleAddNames = () => {
    const nameEntries = input.split('\n');
    const validNames = nameEntries
      .map(name => {
        const nameWithoutNumber = name.replace(/^\d+\.\s*/, '');
        return nameWithoutNumber.trim();
      })
      .filter(name => name.endsWith('❤️❤️❤️'))
      .map(name => name.replace(' ❤️❤️❤️', ''));

    setNames(prevList => [...prevList, ...validNames]);
    setInput('');
  };

  const deleteName = (index) => {
    return () => {
      const newNames = [...names];
      newNames.splice(index, 1);
      setNames(newNames);
    };
  };

  useEffect(() => {
    let interval;

    if (isSpinning) {
      interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * names.length);
        setCurrentItem(names[randomIndex]);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isSpinning, names]);

  const startRaffle = () => {
    if (names.length === 0) return;
    setHomepage(false);

    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      const randomWinner = names[Math.floor(Math.random() * names.length)];
      setWinner(randomWinner);
      setNames(list => list.filter(name => name !== randomWinner)); 
    }, 6000); 
  };

  return (
    <>
      {homepage ? (
        <>
          <img src={Logo} width="300px" alt="Fashion Purses Logo" />
          <div className="page-content">
            <div className="list">
              {names.map((name, index) => (
                <div key={index} className="name-container">
                  <p className="name">{name}</p>
                  <button className="small-btn" onClick={deleteName(index)}>X</button>
                </div>
              ))}
            </div>
            <div className="form">
              <textarea
                rows={20}
                cols={100}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter names here..."
              />
            </div>
            <div className="button-group">
              <button onClick={handleAddNames} className="btn btn-blue">Add</button>
              {names.length === 0 ? null : <button onClick={() => setNames([])} className="btn btn-red">Clear Names</button>}
              {names.length === 0 ? null : <button onClick={startRaffle} className="btn btn-green">Start Raffle</button>}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>The Winner is...</h1>
          {isSpinning ? (
            <motion.h1
              key={currentItem}
              animate={{ opacity: [0, 1], y: [10, -10] }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: '2rem', marginTop: '20px' }}
            >
              {currentItem}
            </motion.h1>
          ) : (
            <motion.h2
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="winner-name"
            >
              🎉{winner}🎉
            </motion.h2>
          )}

          <div className="button-group">
            <button className="btn" onClick={() => setHomepage(true)}>Back to Home</button>
            <button className="btn btn-green" onClick={startRaffle}>Pick another!</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
