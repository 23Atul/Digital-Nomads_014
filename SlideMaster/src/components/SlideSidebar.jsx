// import React from "react";
// import "./SlideSidebar.css";

// function SlideSidebar({ slides, currentSlideIndex, addSlide, deleteSlide, selectSlide }) {
//   return (
//     <div className="slide-sidebar">
//       <button onClick={addSlide} className="sidebar-button">+ New Slide</button>
//       <button onClick={deleteSlide} className="sidebar-button">Delete Slide</button>
//       <div className="slides-container">
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`slide-thumbnail ${index === currentSlideIndex ? "active" : ""}`}
//             onClick={() => selectSlide(index)}
//           >
//             Slide {index + 1}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SlideSidebar;



import React from "react";
import "./SlideSidebar.css";

function SlideSidebar({ slides, currentSlideIndex, addSlide, deleteSlide, selectSlide }) {
  return (
    <div className="slide-sidebar">
      <button onClick={addSlide} className="sidebar-button">+ New Slide</button>
      <button
        onClick={deleteSlide}
        className="sidebar-button"
        disabled={slides.length === 1} // Disable if there's only one slide
      >
        Delete Slide
      </button>
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide-thumbnail ${index === currentSlideIndex ? "active" : ""}`}
            onClick={() => selectSlide(index)}
          >
            Slide {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlideSidebar;
