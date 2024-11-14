import React, { useState, useEffect, useRef } from 'react';
import './MenuBar.css';
import SlideViewer from './SlideViewer'; // Assuming SlideViewer is properly imported

function MenuBar() {
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
  const [isInsertMenuOpen, setIsInsertMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState('#000000');
  const [isBold, setIsBold] = useState(false);
  const [insertedMedia, setInsertedMedia] = useState(null);
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
  const [tableRows, setTableRows] = useState(2);
  const [tableCols, setTableCols] = useState(2);
  const [tableData, setTableData] = useState([]);

  const fileMenuRef = useRef(null);
  const homeMenuRef = useRef(null);
  const insertMenuRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleFileMenu = () => {
    setIsFileMenuOpen((prev) => !prev);
    setIsHomeMenuOpen(false);
    setIsInsertMenuOpen(false);
  };

  const toggleHomeMenu = () => {
    setIsHomeMenuOpen((prev) => !prev);
    setIsFileMenuOpen(false);
    setIsInsertMenuOpen(false);
  };

  const toggleInsertMenu = () => {
    setIsInsertMenuOpen((prev) => !prev);
    setIsFileMenuOpen(false);
    setIsHomeMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      fileMenuRef.current && !fileMenuRef.current.contains(event.target) &&
      homeMenuRef.current && !homeMenuRef.current.contains(event.target) &&
      insertMenuRef.current && !insertMenuRef.current.contains(event.target)
    ) {
      setIsFileMenuOpen(false);
      setIsHomeMenuOpen(false);
      setIsInsertMenuOpen(false);
    }
  };

  const handleOpenFile = () => {
    fileInputRef.current.click(); // Trigger the file input dialog
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name); // Display file name in console
    }
  };

  const handleSaveFile = () => {
    const content = "This is the content of the file.";
    const fileName = "example.txt";
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleFontColorChange = (event) => {
    setFontColor(event.target.value);
  };

  const toggleBold = () => {
    setIsBold((prev) => !prev);
  };

  const handleMediaInsert = (mediaType) => {
    const acceptTypes = {
      image: 'image/*',
      video: 'video/*',
      audio: 'audio/*',
    };

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptTypes[mediaType];
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setInsertedMedia({ file, mediaType });
        console.log(`Inserted ${mediaType}:`, file);
      }
    };
    input.click();
  };

  const handleTableInsert = () => {
    setIsTableDialogOpen(true);
  };

  const handleTableDialogClose = () => {
    setIsTableDialogOpen(false);
  };

  const handleTableChange = (event) => {
    const { name, value } = event.target;
    if (name === 'rows') {
      setTableRows(Number(value));
    } else if (name === 'cols') {
      setTableCols(Number(value));
    }
  };

  const handleTableCreate = () => {
    const newTable = Array.from({ length: tableRows }, () =>
      Array(tableCols).fill('')
    );
    setTableData(newTable);
    setIsTableDialogOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="menu-bar">
      <div className="menu-item app-icon">
        <span>◉</span> {/* Placeholder for app icon */}
      </div>
      <div className="menu-item title">Presentation</div>
      <div className="menu-items">
        <div
          className={`menu-item ${isFileMenuOpen ? 'active' : ''}`}
          onClick={toggleFileMenu}
        >
          File
          {isFileMenuOpen && (
            <div className="dropdown-menu" ref={fileMenuRef}>
              <div className="dropdown-item">New</div>
              <div className="dropdown-item" onClick={handleOpenFile}>Open</div>
              <div className="dropdown-item" onClick={handleSaveFile}>Save</div>
            </div>
          )}
        </div>

        <div
          className={`menu-item ${isHomeMenuOpen ? 'active' : ''}`}
          onClick={toggleHomeMenu}
        >
          Home
          {isHomeMenuOpen && (
            <div className="dropdown-menu" ref={homeMenuRef}>
              <div className="dropdown-item">
                Font Size:
                <input
                  type="number"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  style={{ width: '50px', marginLeft: '5px' }}
                />
              </div>
              <div className="dropdown-item">
                Color:
                <input
                  type="color"
                  value={fontColor}
                  onChange={handleFontColorChange}
                  style={{ marginLeft: '5px' }}
                />
              </div>
              <div
                className="dropdown-item"
                onClick={toggleBold}
                style={{ fontWeight: isBold ? 'bold' : 'normal' }}
              >
                Bold
              </div>
            </div>
          )}
        </div>

        <div
          className={`menu-item ${isInsertMenuOpen ? 'active' : ''}`}
          onClick={toggleInsertMenu}
        >
          Insert
          {isInsertMenuOpen && (
            <div className="dropdown-menu" ref={insertMenuRef}>
              <div className="dropdown-item" onClick={() => handleMediaInsert('image')}>Image</div>
              <div className="dropdown-item" onClick={() => handleMediaInsert('video')}>Video</div>
              <div className="dropdown-item" onClick={() => handleMediaInsert('audio')}>Audio</div>
              <div className="dropdown-item" onClick={handleTableInsert}>Table</div>
            </div>
          )}
        </div>
      </div>

      {/* Pass fontSize, fontColor, and isBold to SlideViewer */}
      <SlideViewer
        fontSize={fontSize}
        fontColor={fontColor}
        isBold={isBold}
      />

      {/* Hidden file input for "Open" functionality */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Table Dialog */}
      {isTableDialogOpen && (
        <div className="table-dialog">
          <h3>Create Table</h3>
          <div>
            <label>Rows:</label>
            <input
              type="number"
              name="rows"
              value={tableRows}
              onChange={handleTableChange}
            />
          </div>
          <div>
            <label>Cols:</label>
            <input
              type="number"
              name="cols"
              value={tableCols}
              onChange={handleTableChange}
            />
          </div>
          <button onClick={handleTableCreate}>Insert Table</button>
          <button onClick={handleTableDialogClose}>Close</button>
        </div>
      )}

      {/* Table Display */}
      {tableData.length > 0 && (
        <table className="inserted-table">
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MenuBar;
