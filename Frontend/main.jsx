import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Book from './Book.jsx'
import Dashboard from './Dashboard.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App/>}>

        </Route>
        <Route path='/Book' element={<Book/>}>

       </Route>
       <Route path='/admin-dashboard' element={<Dashboard/>}>

       </Route>

      </Routes>
    </Router>
  </StrictMode>,
)
