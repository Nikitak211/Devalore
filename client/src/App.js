import { useEffect, useState } from 'react'

import axios from 'axios'
import CreatePets from './components/CreatePets/CreatePets';

import { Button } from '@mui/material'

function App() {
  const [pets, setPets] = useState()
  const [success, setSuccess] = useState()

  useEffect(() => {
    axios.get('/api/pets')
      .then(res => {
        const data = res.data;
        setPets(data.length)
        setSuccess()
      })
  }, [success])
  return (
    <div className="App">
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Button 
        onClick={() => window.location.href = '/pets'}
        sx={{
          margin:'0 auto'
        }}>Pets</Button>
        <p>{pets}</p>

      </div>
      
      <CreatePets setSuccess={setSuccess} />
    </div>
  );
}

export default App;
