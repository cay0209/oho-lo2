import './App.css';
import {BrowserRouter,Routes, Route} from "react-router-dom"
import MemberCreate from './components/members/MemberCreate';
import EmptyPage from './components/etc/EmptyPage';
import Main from './components/etc/Main';
import MemberDelete from './components/members/MemberDelete';


function App() {
  return (
    <BrowserRouter>

    <div className='App'>

      <Routes>

{/* 라우터 v6부터는 component -> element로 변경. 형식은 아래와 같음
    <Route path="/example" element={<ExampleComponent />} /> */}
    
       <Route path='/' element={<Main/>}/>
        <Route path= "/members/create" element={<MemberCreate/>} />
        <Route path= "/members/delete" element={<MemberDelete/>} />

        {/* /* : 선언된 것 외의 주소가 입력되는 */}
        <Route path= "/*" element={<EmptyPage/>} /> 

      </Routes>

    </div>
    
    </BrowserRouter>
  );
}

export default App;
