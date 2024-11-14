// // SlideViewer.jsx
// import React from "react";
// import "./SlideViewer.css";

// function SlideViewer({ slide, updateSlideContent }) {
//   return (
//     <div className="slide-viewer">
//       <div className="slide-content">
//         <h1
//           contentEditable
//           suppressContentEditableWarning
//           onBlur={(e) => updateSlideContent("title", e.target.innerText)}
//           className="editable-title"
//           placeholder="Enter slide title here"
//         >
//           {slide.title || "Enter slide title here"}
//         </h1>
//         <p
//           contentEditable
//           suppressContentEditableWarning
//           onBlur={(e) => updateSlideContent("subtitle", e.target.innerText)}
//           className="editable-subtitle"
//           placeholder="Enter subtitle here"
//         >
//           {slide.subtitle || "Enter subtitle here"}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default SlideViewer;  // Make sure this line exists and it's a default export


// SlideViewer.jsx
import React from "react";
import "./SlideViewer.css";

function SlideViewer({ slide, updateSlideContent }) {
  if (!slide) return null; // Make sure slide is not undefined or null

  return (
    <div className="slide-viewer">
      <div className="slide-content">
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateSlideContent("title", e.target.innerText)}
          className="editable-title"
          placeholder="Enter slide title here"
        >
          {slide.title || "Enter slide title here"}
        </h1>
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateSlideContent("subtitle", e.target.innerText)}
          className="editable-subtitle"
          placeholder="Enter subtitle here"
        >
          {slide.subtitle || "Enter subtitle here"}
        </p>
      </div>
    </div>
  );
}

export default SlideViewer;
