import React from "react";
import DynamicTexts from "../molecules/DynamicTexts";

function CardsDisplay({ content = [], className = "p-4", isCardList = false }) {
  return (
    <div className={className}>
      <div
        className={
          isCardList
            ? "flex flex-col gap-6 max-w-6xl mx-auto"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        }
      >
        {content.map((item, index) => (
          <div
            key={index}
            className={
              isCardList
                ? "flex flex-col sm:flex-row items-start bg-white p-6 rounded-lg shadow-md border border-gray-200"
                : "bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            }
          >
            {item.card.map((element, idx) => {
              if (element.type === "image") {
                return (
                  <img
                    key={idx}
                    src={element.src}
                    alt={element.alt}
                    className={
                      isCardList
                        ? "w-24 h-24 object-contain sm:mr-4 mb-4 sm:mb-0 rounded-lg"
                        : element.className || "w-full h-48 object-cover"
                    }
                  />
                );
              }
              if (element.type === "text") {
                return (
                  <DynamicTexts
                    key={idx}
                    Texts={[element]}
                    className={isCardList ? "flex-1" : "p-4"}
                  />
                );
              }
              if (element.type === "button") {
                return (
                  <button
                    key={idx}
                    onClick={element.onClick}
                    className={
                      element.className ||
                      "w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-2"
                    }
                  >
                    {element.text}
                  </button>
                );
              }
              if (element.type === "list") {
                return (
                  <ul
                    key={idx}
                    className={element.className || "list-disc pl-5 mt-2"}
                  >
                    {element.items.map((li, i) => (
                      <li key={i} className="text-gray-600">
                        {li}
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsDisplay;
