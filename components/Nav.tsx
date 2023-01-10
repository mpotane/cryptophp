import { useState, useEffect } from "react";

export default function Nav() {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    // update data-theme attribute on html element
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function handleClick() {
    setTheme((prevTheme) => {
      if (prevTheme === "light") {
        return "dark";
      } else {
        return "light";
      }
    });
  }

  return (
    <header>
      <nav>
        <div className="fixed w-full flex flex-wrap gap-5 justify-center items-center p-5">
          <label>light</label>
          <input
            type="checkbox"
            className="toggle toggle-warning"
            onClick={handleClick}
          />
          <label>dark</label>
        </div>
      </nav>
    </header>
  );
}
