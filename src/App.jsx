import "./App.css";
import Logo from "./assets/fashionpurses.png";
import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleProcess = () => {
    const lines = inputText.split("\n");
    const entries = {};

    // Parse each line for entries
    lines.forEach((line) => {
      const match = line.match(/^(\d+)\.\s*(.+?)(❤️❤️❤️)?$/);
      if (match) {
        const number = parseInt(match[1]);
        const name = match[2].trim();
        entries[number] = match[3] ? name : "";
      }
    });

    // Create output for numbers 1 to 100
    const result = Array.from({ length: 100 }, (_, i) => {
      const number = i + 1;
      return `${number}. ${entries[number] || ""}`;
    });

    setOutputText(result.join("\n"));
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputText).then(() => {
      alert("Copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  };

  return (
    <div className="page-content">
      <div className="header">
        <img src={Logo} width="300px" alt="Fashion Purses Logo" />
        <div>
          <p>Entries must have a number, name, and 3 Hearts (❤️❤️❤️) </p>
          <div className="example">
            Example:<br />
            1. Elvie Chiong ❤️❤️❤️<br />
            2. Marvie Chiong ❤️❤️❤️<br />
            3. Ashley Chiong
          </div>
        </div>
      </div>
      <div className="form">
        <div className="form-section">
          <h2>Input</h2>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows="20"
            cols="60"
            placeholder="Enter your list here"
          />
          <button className="btn btn-blue" onClick={handleProcess}>
            Convert
          </button>
        </div>
        <div className="form-section">
          <h2>Result</h2>
          <textarea
            value={outputText}
            readOnly
            rows="20"
            cols="60"
            placeholder="Processed output will appear here"
          />
          <button className="btn btn-green" onClick={handleCopyToClipboard}>
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
