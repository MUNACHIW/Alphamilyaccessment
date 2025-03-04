
import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <main className='Hotel-background'>
             <h1>Book A Hotel Reservation With Us </h1>
             <p>On This platform you get to book a room or suite and also get the best Hospitality from any location you are.</p>
             <div className="linkholder">
                <Link to="/Book">Book A Suite</Link>
             </div>
    </main>

  )
}

export default App
