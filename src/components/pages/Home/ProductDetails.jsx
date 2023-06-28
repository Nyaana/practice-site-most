import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchProductDetails } from "../../store/productDetailsSlice";
import { addToBasket } from "../../store/basketSlice";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const handleAddToBasket = (product) => {
    dispatch(addToBasket(product));
  };

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  if (productDetails.loading) {
    return <p>Loading...</p>;
  }

  if (productDetails.error) {
    return <p>Error: {productDetails.error}</p>;
  }

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
          <Link to="/Basket" className="linkBasket">
            Basket
          </Link>
        </nav>
      </header>

      <div className="classProductDetails">
        <div className="classContainerProductDetails">
          <img
            src={productDetails.thumbnail}
            alt="Thumbnail"
            className="classImgProductDetails"
          />
          <div className="classContainerInfoProductDetails">
            <h2 className="classTitleProductDetails">{productDetails.title}</h2>
            <p className="classInfoProductDetails">
              {productDetails.description}
            </p>
            <p className="classDopInfoProductDetails">
              <span>Category:</span> {productDetails.category}
            </p>
            <p className="classDopInfoProductDetails">
              <span>Brand:</span> {productDetails.brand}
            </p>
            <p className="classDopInfoProductDetails">
              <span>Stock:</span> {productDetails.stock}
            </p>
            <p className="classDopInfoProductDetails">
              <span>Rating:</span> {productDetails.rating}
            </p>
            <p className="classDopInfoProductDetails">
              <span>Discount:</span> {productDetails.discountPercentage}%
            </p>
            <p className="classPriceProductDetails">
              Price: {productDetails.price}$
            </p>
            <div className="addToBasketDivProductDetails">
              <button
                className="addToBasketProductDetails"
                onClick={() => handleAddToBasket(productDetails)}
              >
                В корзину
              </button>
            </div>
          </div>
          <div className="classDivImgProductDetails2">
            {productDetails.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="classImgProductDetails2"
              />
            ))}
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

export default ProductDetails;
