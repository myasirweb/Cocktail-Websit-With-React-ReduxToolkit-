import {Routes, Route} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductDeails from "./Pages/ProductDeails";
import PageNotFound from "./Componnets/PageNotFound";
import SearchBox from "./Componnets/SearchBox";
import Layout from "./Componnets/Layout";

function App() {
  return (
    <>
     <Routes>

      <Route path='/' element={
      <>
      <Layout>
      <SearchBox />
      <HomePage/>
      </Layout>
      </>
      }
      />
      <Route path='/products/:id' element={<ProductDeails />} />
      <Route path='*' element={<PageNotFound/>}/>
     </Routes>
    </>
  );
}

export default App;
