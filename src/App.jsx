import './App.css'
import { useState } from 'react'

function App() {
  const [names, setNames] = useState([]);
  const [input, setInput] = useState('');
  const [winner, setWinner] = useState('');
  const [homepage, setHomepage] = useState(true);

  const handleAddNames = () => {
    // Split the input by new lines
    const nameEntries = input.split('\n');

    // Process each name, ignoring the number and checking for heart emojis
    const validNames = nameEntries
      .map(name => {
        const nameWithoutNumber = name.replace(/^\d+\.\s*/, ''); // Remove leading number and dot
        return nameWithoutNumber.trim();
      })
      .filter(name => name.endsWith('❤️❤️❤️')) // Only keep names with heart emojis
      .map(name => name.replace(' ❤️❤️❤️', '')); // Remove heart emojis from the name

    // Add each valid name individually to the list
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

  const startRaffle = () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    setWinner(names[randomIndex]);
    setNames(list => {
      return list.filter(name => name !== names[randomIndex]);
    });
    setHomepage(false);
  };

  return (
    <>
      {homepage ? (
        <>
          <h1>Fashion Purses</h1>
          <div className='page-content'>
            <div className='list'>
              {names.map((name, index) => (
                <div key={index} className='name-container'>
                  <p className='name'>{name}</p>
                  <button onClick={deleteName(index)}>X</button>
                </div>
              ))}
            </div>
            <div className='form'>
              <textarea
                rows={20}
                cols={100}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter names here..."
              />
            </div>
            <div className='button-group'>
              <button onClick={() => setNames([])} className='btn btn-red'>Clear Names</button>
              <button onClick={handleAddNames} className='btn btn-blue'>Add</button>
              {names.length === 0 ? null : <button onClick={startRaffle} className='btn btn-green'>Start Raffle</button>}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>The Winner is...</h1>
          <h2>{winner}</h2>
          <div className='button-group'>
            <button className='btn' onClick={() => setHomepage(true)}>Back to Home</button>
            <button className='btn btn-green' onClick={startRaffle}>Pick another!</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
