import React, { useEffect, useState } from 'react'
import Layout from '../Componnets/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleCocktails } from '../Redux/features/cocktailSlice'
import { Link, useParams } from 'react-router-dom'
import SpinnerAnim from '../Componnets/shared/SpinnerAnim'

const ProductDeails = () => {
  const [modifiedcocktail, setModifiedcocktail] = useState([]);
  const { loading, cocktail } = useSelector((state) => ({ ...state.app }));
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleCocktails({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (cocktail.length > 0) {
      const {
        strDrink: name,
        strDrinkThumb: img,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = cocktail[0];
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      ];
      const newCocktail = { name, category, glass, info, img, ingredients };
      setModifiedcocktail(newCocktail);
    } else {
      setModifiedcocktail(null);
    }
  }, [id, cocktail]);

  if (!modifiedcocktail) {
    return (
      <>
        <Layout>
          <h2>No Cocktails Details</h2>
        </Layout>
      </>
    );
  } else {
    const { name, img, info, category, glass, ingredients } = modifiedcocktail;
    return (
      <>
        {loading ? (
          <SpinnerAnim />
        ) : (
          <Layout>
            <div className="container mt-4">
              <Link to="/" className="btn btn-info">
                GO BACK
              </Link>
              <div className="row mt-4">
                <div className="col-md-5">
                  <img src={img} alt={name} height={300} width={400} />
                </div>
                <div className="col-md-5">
                  <h2>Name : {name}</h2>
                  <p className="mt-1">Category : {category}</p>
                  <p>Info : {info}</p>
                  <p>Glass : {glass}</p>
                  <p>Ingredients : {ingredients + " ,"}</p>
                </div>
              </div>
            </div>
          </Layout>
        )}
      </>
    );
  }
};

export default ProductDeails;

