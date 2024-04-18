import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AddEditUser from './pages/AddEditUser';
import NavBar from './components/NavBar';
import Gallary from './pages/Gallary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userdetails from './pages/Userdetails';


// import Spinner from './components/Spinner';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <ToastContainer />
      <NavBar/>
        {/* <div className="content"> */}
      {/* <AddUserPage/> */}
      {/* <Spinner/> */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/gallary' element={<Gallary/>}/>
          <Route path='/add' element={<AddEditUser/>}/>
          <Route path='/update' element={<AddEditUser/>}/>
          <Route path='/userdetails/:id' element={<Userdetails/>}/>
        </Routes>
        </div>
      {/* </div> */}
    </BrowserRouter>

  );
}

export default App;

// import React from 'react'
// import { Button } from 'semantic-ui-react'
// const App = () => {
//   return (
//     <div>
//     <Button primary>Primary</Button>
//     <Button secondary>Secondary</Button>
//   </div>
//   )
// }

// export default App
