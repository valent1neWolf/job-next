"use client";
import "@/components/slideshow.css";
import { slideShowContent } from "@/utils";
import { useEffect } from "react";

export default function Slideshow() {
  useEffect(() => {
    const slideshowContainer = document.querySelector(".slideshow-container");

    if (!slideshowContainer) {
      console.error("Slideshow container not found");
      return;
    }

    const handleMouseDown = () => {
      slideshowContainer.style.animationPlayState = "paused";
    };

    const handleMouseUp = () => {
      slideshowContainer.style.animationPlayState = "running";
    };

    const handleTouchStart = () => {
      slideshowContainer.style.animationPlayState = "paused";
    };

    const handleTouchEnd = () => {
      slideshowContainer.style.animationPlayState = "running";
    };

    slideshowContainer.addEventListener("mousedown", handleMouseDown);
    slideshowContainer.addEventListener("mouseup", handleMouseUp);
    slideshowContainer.addEventListener("touchstart", handleTouchStart);
    slideshowContainer.addEventListener("touchend", handleTouchEnd);

    // event listener-ek törlése
    return () => {
      slideshowContainer.removeEventListener("mousedown", handleMouseDown);
      slideshowContainer.removeEventListener("mouseup", handleMouseUp);
      slideshowContainer.removeEventListener("touchstart", handleTouchStart);
      slideshowContainer.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="slideshow-main overflow-hidden">
      <div className="h-fit w-fit flex flex-nowrap gap-4 slideshow-container">
        {slideShowContent.map((slide, index) => (
          <div
            className="w-80 h-72 md:w-96 md:h-80 bg-blue-100 px-2 py-4 rounded-md shadow-lg"
            key={index}
          >
            <div className="slideshow-slide h-full">
              <img
                src={slide.image}
                alt={`reviewers avatar ${index}`}
                className="float-right w-1/5 pl-2"
              />
              <div className="w-4/5 float-left italic relative h-full text-sm md:text-base">
                <p>"{slide.description}"</p>
                <p className="absolute bottom-0 right-0">-{slide.reviewer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
