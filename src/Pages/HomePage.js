import React, { useEffect, useState, useMemo } from 'react';
import Layout from '../Componnets/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCocktails } from '../Redux/features/cocktailSlice';
import SpinnerAnim from '../Componnets/shared/SpinnerAnim';
import { Link } from 'react-router-dom';
import SearchBox from '../Componnets/SearchBox';

const HomePage = () => {
  const [modified, setModified] = useState([]);
  const { loading, cocktails, error } = useSelector((state) => ({ ...state.app }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCocktails());
  }, []);

  const memoizedModified = useMemo(() => {
    if (Array.isArray(cocktails)) { // Check if cocktails is an array
      const newCocktails = cocktails.map((item) => {
        const { idDrink, strAlcoholic, strDrinkThumb, strGlass, strDrink } = item;
  
        return {
          id: idDrink,
          name: strDrink,
          img: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
        };
      });
      return newCocktails;
    } else {
      return [];
    }
  }, [cocktails]);
  

  useEffect(() => {
    setModified(memoizedModified);
  }, [memoizedModified]);

  if (loading) {
    return <SpinnerAnim />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <div className='container'>
        {/* <SearchBox /> */}
        <div className='row'>
          {modified.map((item) => (
            <div className='col-md-3 mt-3 m-1' key={item.id}>
              <div className='card' style={{ width: '18rem' }}>
                <img src={item.img} className='card-img-top' alt={item.name} />
                <div className='card-body'>
                  <h5 className='card-title'>{item.name}</h5>
                  <h5 className='card-title'>{item.glass}</h5>
                  <p className='card-text'>{item.info}</p>
                  <Link to={`/products/${item.id}`} className='btn btn-primary'>
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
