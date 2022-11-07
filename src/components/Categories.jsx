import React from "react";

const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ["Все", "Сеты", "Суши", "Wok", "Запеченные роллы"];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li
            key={i}
            onClick={() => setActiveIndex(i)}
            className={activeIndex === i ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
