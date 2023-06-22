import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromBasket, clearBasket } from "../../store/basketSlice";

export default function Basket() {
  const basketItems = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  const handleRemoveFromBasket = (itemId) => {
    dispatch(removeFromBasket(itemId));
  };

  const handleClearBasket = () => {
    dispatch(clearBasket());
  };

  const calculateTotal = () => {
    let total = 0;
    basketItems.forEach((item) => {
      total += item.price * item.count;
    });
    return total;
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
          <Link to="/State" className="linkState">
            State
          </Link>
          <Link to="/Basket" className="linkInBasket">
            Basket
          </Link>
        </nav>
      </header>

      <div className="classBasket">
        <p className="TitleBasket">Ваша корзина</p>
        {basketItems.length === 0 ? (
          <p className="clearBasket">Ваша корзина пуста.</p>
        ) : (
          <div className="classContainerBasket">
            <button className="classClearBasket" onClick={handleClearBasket}>
              Очистить корзину
            </button>
            <div>
              {basketItems.map((item) => (
                <div className="classProductsBasket" key={item.id}>
                  <img
                    className="classImgProductsBasket"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                  <div className="classInfoProductsBasket">
                    <p className="classTitleProductsBasket">{item.title}</p>
                    <p className="classPriceProductsBasket">
                      {item.price} руб.
                    </p>
                    <button
                      className="classDeletBasket"
                      onClick={() => handleRemoveFromBasket(item.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="classSumPriceBasket">
              Общая сумма: {calculateTotal()}$
            </p>
          </div>
        )}
      </div>

      <footer>
        <div className="footer-container">
          <p>Copyriting</p>
        </div>
      </footer>
    </body>
  );
}
