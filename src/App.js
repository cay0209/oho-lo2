import './App.css';
import {BrowserRouter,Routes, Route} from "react-router-dom"
import MemberCreate from './components/members/MemberCreate';
import EmptyPage from './components/etc/EmptyPage';


function App() {
  return (
    <BrowserRouter>

    <div className='App'>

      <Routes>

{/* 라우터 v6부터는 component -> element로 변경. 형식은 아래와 같음
    <Route path="/example" element={<ExampleComponent />} /> */}
        <Route path= "/members/create" Component={MemberCreate} />
        <Route path= "/*" Component={EmptyPage} />



      </Routes>




    </div>
    
    </BrowserRouter>
  );
}

export default App;
