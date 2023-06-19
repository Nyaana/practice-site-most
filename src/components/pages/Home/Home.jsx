import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  const getProucts = async () => {
    await fetch("https://dummyjson.com/products")
      .then((resp) => resp.json())
      .then((resp) => {
        setProducts(resp.products);
      });
  };

  useEffect(() => {
    getProucts();
  }, []);

  return (
    <body>
      <header>
        <div>
          <span className="logo">Nyaana</span>
        </div>
        <nav className="navigacion">
          <Link to="/" className="linkInHome">
            Home
          </Link>
          <Link to="/State" className="linkState">
            State
          </Link>
        </nav>
      </header>

      <div className="classHome">
        <div className="classContainerProducts">
          {products.map((item) => {
            return (
              <div className="classProducts" key={item.id}>
                <img
                  className="classImgProducts"
                  src={item.thumbnail}
                  alt={item.title}
                />
                <p className="classTitleProducts">{item.title}</p>
                <p className="classPriceProducts">{item.price} руб.</p>
              </div>
            );
          })}
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

export default Home;
