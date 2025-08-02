import React, { useState, useRef, useEffect } from "react";
import "../../src/App.css";

const Terminal = () => {
  const [lines, setLines] = useState([{ type: "input", value: "" }]);
  const terminalEndRef = useRef(null);

  const handleCommand = (e, index) => {
    if (e.key === "Enter") {
      const command = lines[index].value.trim().toLowerCase();

      const updatedLines = [...lines];
      updatedLines[index] = { type: "submitted", value: command };

      if (command === "clear") {
        setLines([{ type: "input", value: "" }]);
        return;
      }

      const output = getCommandOutput(command);
      const outputLines = output.split("\n").filter(line => line !== "");
      let currentLines = [...updatedLines];

      const animateOutput = (i) => {
        if (i < outputLines.length) {
          currentLines = [
            ...currentLines,
            { type: "output", value: outputLines[i] }
          ];
          setLines([...currentLines]);
          setTimeout(() => animateOutput(i + 1), 150); // Increased delay here
        } else {
          setLines([
            ...currentLines,
            { type: "space" },
            { type: "header" },
            { type: "input", value: "" }
          ]);
        }
      };

      animateOutput(0);
    }
  };

  const handleChange = (e, index) => {
    const newLines = [...lines];
    newLines[index].value = e.target.value;
    setLines(newLines);
  };

  const getCommandOutput = (command) => {
    switch (command) {
      case "help":
        return `\nAvailable commands:\n- about     : About me\n- skills    : My technical skills\n- projects  : My projects\n- contact   : Contact info\n- clear     : Clear terminal`;
      case "about":
        return `\nAbout Me:\nI'm Girdhari Sharma — a creative and dedicated frontend + Python developer.\nI love building interactive web experiences and exploring data and ML.`;
      case "skills":
        return `\nSkills:\n- Frontend: HTML, CSS, JavaScript, React, Bootstrap, Tailwind\n- Backend : Python, Flask (learning), REST API basics\n- Tools   : Git, GitHub, VS Code, Figma\n- Others  : C++, MySQL, basic Java`;
      case "projects":
        return `\nProjects:\n1. Portfolio Website - This terminal-style site you're viewing.\n2. Weather App       - Weather checker using OpenWeatherMap API.\n3. Blog Platform     - CRUD blog with HTML, CSS, and JS.\n4. OTP Login System  - Python-based email OTP login system.`;
      case "contact":
        return `\nContact Info:\n- Email   : <a href="https://mail.google.com/mail/u/0/#sent?compose=new" target="_blank">girdharisharma@email.com</a>\n- Phone   : +91-7838775607\n- LinkedIn: <a href="https://linkedin.com/in/girdharisharma" target="_blank">linkedin.com/in/girdharisharma</a>\n- GitHub  : <a href="https://github.com/girdharisharma" target="_blank">github.com/girdharisharma</a>`;
      case "":
        return "";
      default:
        return `"${command}" is not recognized. Type "help" to see available commands.`;
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="body">
      <div className="tab">
        <div className="head">
          <div className="button">
            <div className="red"></div>
            <div className="yellow"></div>
            <div className="green"></div>
          </div>
          <div className="title">-Portfolio_~</div>
        </div>

        <div className="mainframe">
          <div className="mainline">
            <h1 className="name">
              Welcome To My Portfolio
            </h1>
            <div className="flexbox">
              <div className="rect"></div>
              <div className="terminal">
                <div
                  className="terminal-body"
                  style={{
                    overflowY: 'auto',
                    flex: 1,
                    padding: '10px',
                    color: '#4ee25a',
                    fontFamily: 'monospace',
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#4ee25a #000',
                    maxHeight: '60vh'
                  }}
                >
                  <div className="header">
                    <span className="username">(GS</span>@
                    <span className="host">Portfolio)</span>:
                    <span className="path">[~/Terminal]</span>
                    <span>Type help for terminal command</span>
                  </div>

                  {lines.map((line, index) => {
                    if (line.type === "header") {
                      return (
                        <div key={index} className="header" style={{ marginTop: '1rem' }}>
                          <span className="username">(GS</span>@
                          <span className="host">Portfolio)</span>:
                          <span className="path">[~/Terminal]</span>
                        </div>
                      );
                    } else if (line.type === "space") {
                      return <div key={index} style={{ height: '1rem' }}></div>;
                    } else if (line.type === "input") {
                      return (
                        <div key={index} className="input-line">
                          <span className="prompt">$</span>
                          <input
                            type="text"
                            className="command-input"
                            value={line.value}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleCommand(e, index)}
                            autoFocus={index === lines.length - 1}
                          />
                        </div>
                      );
                    } else if (line.type === "submitted") {
                      return (
                        <div key={index} className="submitted-line">
                          <span className="prompt">$</span>
                          {line.value}
                        </div>
                      );
                    } else if (line.type === "output") {
                      return (
                        <div
                          key={index}
                          className="output-line"
                          style={{ marginLeft: '1rem', whiteSpace: 'pre-wrap' }}
                          dangerouslySetInnerHTML={{ __html: line.value }}
                        ></div>
                      );
                    }
                    return null;
                  })}
                  <div ref={terminalEndRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;