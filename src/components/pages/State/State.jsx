import React, { useState } from "react";
import { Link } from "react-router-dom";

function State() {
  const [count, setCount] = useState(1);

  const plusCount = () => {
    setCount(count + 1);
  };

  const minusCount = () => {
    setCount(count - 1);
  };

  return (
    <body>
      <header>
        <div>
          <span className="logo">Nyaana</span>
        </div>
        <nav className="navigacion">
          <Link to="/" className="linkHome">
            Home
          </Link>
          <Link to="/State" className="linkInState">
            State
          </Link>
          <Link to="/Basket" className="linkBasket">
            Basket
          </Link>
        </nav>
      </header>

      <div className="classState">
        <div className="classContainerState">
          <div className="classPlusMinus">
            <button onClick={minusCount} className="classMinus">
              -
            </button>
            <p>{count}</p>
            <button onClick={plusCount} className="classPlus">
              +
            </button>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-container">
          <p>Copyriting</p>
        </div>
      </footer>
    </body>
  );
}

export default State;
