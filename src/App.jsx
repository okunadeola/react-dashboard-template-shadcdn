import RootLayout from './layout/RootLayout'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Others from './pages/Others'
import Teacher from './pages/Teacher'
import Search from './pages/Search'
import Analytics from './pages/Analytics'
import Cloud from './pages/cloudinary/Cloud'
import Payment from './pages/payment/Payment'


function App() {


  return (
    <RootLayout>
       <Routes>

          <Route path='/' element={<Home/>} />
          <Route path='/others' element={<Others/>} />
     
          <Route path='/teacher/courses' element={<Teacher/>} />
        
          <Route path='/search' element={<Search/>} />
          
          <Route path='/cloud' element={<Cloud/>} />

          <Route path='/payment' element={<Payment/>} />
         
          <Route path='/search' element={<Search/>} />
        
          <Route path='/teacher/analytics' element={<Analytics/>} />
        

       </Routes>
    </RootLayout>
  )
}

export default App
