 // Function to create the log container and style
 function createLogContainer() {
  const style = document.createElement('style');
  style.textContent = `
      #log {
          white-space: pre-wrap;
          background-color: #f0f0f0;
          margin: 0;
          padding: 2rem;
          height: 100vh;
          overflow-x: auto;
          line-height: 1.7;
          font-size: 16px;
          font-family: courier new;
          color: #4CAF50;
          background: black;
          font-weight: 700;
      }

      #log table {
        margin-top: 2rem;
        border-collapse: collapse;
        width: 100%;
        border: 1px solid #4CAF50;
      }

      #log table thead {
        background: green;
        color: black;
      }

      #log table td {
        padding: 5px;
        border: 1px solid #4CAF50;
      }
  `;
  document.head.appendChild(style);

  const logPre = document.createElement('pre');
  logPre.id = 'log';
  document.body.appendChild(logPre);
}

// Call the function to create the log container
createLogContainer();

// Save the original console functions
const originalConsoleLog = console.log;
const originalConsoleTable = console.table;

// Override console.log
console.log = function(message) {
  originalConsoleLog(message);
  document.getElementById('log').textContent += message + '\n';
};

// Override console.table
console.table = function(data) {
  originalConsoleTable(data);
  const table = convertToHtmlTable(data);
  document.getElementById('log').appendChild(table);
};

// Convert array or object to HTML table
function convertToHtmlTable(data) {
  const table = document.createElement('table');
  // Add header row for objects/arrays
  const thead = table.createTHead();
  const headerRow = thead.insertRow();
  if (Array.isArray(data)) {
      // Use index numbers as headers for arrays
      Object.keys(data[0]).forEach(key => {
          const th = document.createElement('th');
          th.textContent = key;
          headerRow.appendChild(th);
      });
  } else {
      // Use object keys as headers for objects
      const th = document.createElement('th');
      th.textContent = 'Key';
      headerRow.appendChild(th);

      const th2 = document.createElement('th');
      th2.textContent = 'Value';
      headerRow.appendChild(th2);
  }

  // Add data rows
  const tbody = table.createTBody();
  if (Array.isArray(data)) {
      data.forEach(item => {
          const row = tbody.insertRow();
          Object.values(item).forEach(val => {
              const cell = row.insertCell();
              cell.textContent = val;
          });
      });
  } else {
      Object.keys(data).forEach(key => {
          const row = tbody.insertRow();
          const keyCell = row.insertCell();
          keyCell.textContent = key;

          const valueCell = row.insertCell();
          valueCell.textContent = data[key];
      });
  }
  
  return table;
}