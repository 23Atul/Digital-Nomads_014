// import React, { useState } from "react";
// import SlideSidebar from "./SlideSidebar";
// import SlideViewer from "./SlideViewer";
// import "./SlideEditor.css";

// function SlideEditor() {
//   const [slides, setSlides] = useState([{ title: "Click to add title", subtitle: "Click to add subtitle" }]);
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

//   const addSlide = () => {
//     setSlides([...slides, { title: "Click to add title", subtitle: "Click to add subtitle" }]);
//     setCurrentSlideIndex(slides.length);
//   };

//   const deleteSlide = () => {
//     if (slides.length > 1) {
//       const updatedSlides = slides.filter((_, index) => index !== currentSlideIndex);
//       setSlides(updatedSlides);
//       setCurrentSlideIndex(Math.max(currentSlideIndex - 1, 0));
//     }
//   };

//   const updateSlideContent = (field, value) => {
//     const updatedSlides = slides.map((slide, index) =>
//       index === currentSlideIndex ? { ...slide, [field]: value } : slide
//     );
//     setSlides(updatedSlides);
//   };

//   return (
//     <div className="slide-editor">
//       <SlideSidebar
//         slides={slides}
//         currentSlideIndex={currentSlideIndex}
//         addSlide={addSlide}
//         deleteSlide={deleteSlide}
//         selectSlide={setCurrentSlideIndex}
//       />
//       <SlideViewer
//         slide={slides[currentSlideIndex]}
//         updateSlideContent={updateSlideContent}
//       />
//     </div>
//   );
// }

// export default SlideEditor;




// SlideEditor.jsx
import React, { useState } from "react";
import SlideSidebar from "./SlideSidebar";
import SlideViewer from "./SlideViewer";
import "./SlideEditor.css";

function SlideEditor() {
  const [slides, setSlides] = useState([{ title: "Click to add title", subtitle: "Click to add subtitle" }]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const addSlide = () => {
    setSlides([...slides, { title: "Click to add title", subtitle: "Click to add subtitle" }]);
    setCurrentSlideIndex(slides.length);
  };

  const deleteSlide = () => {
    if (slides.length > 1) {
      const updatedSlides = slides.filter((_, index) => index !== currentSlideIndex);
      setSlides(updatedSlides);
      setCurrentSlideIndex(Math.max(currentSlideIndex - 1, 0));
    }
  };

  const updateSlideContent = (field, value) => {
    const updatedSlides = slides.map((slide, index) =>
      index === currentSlideIndex ? { ...slide, [field]: value } : slide
    );
    setSlides(updatedSlides);
  };

  // Ensure that `slides[currentSlideIndex]` is always valid
  const currentSlide = slides[currentSlideIndex] || { title: '', subtitle: '' };

  return (
    <div className="slide-editor">
      <SlideSidebar
        slides={slides}
        currentSlideIndex={currentSlideIndex}
        addSlide={addSlide}
        deleteSlide={deleteSlide}
        selectSlide={setCurrentSlideIndex}
      />
      <SlideViewer
        slide={currentSlide}  // Make sure to pass a valid slide
        updateSlideContent={updateSlideContent}
      />
    </div>
  );
}

export default SlideEditor;
