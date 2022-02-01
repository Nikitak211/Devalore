import { useEffect, useState } from 'react'
import axios from 'axios'
import * as timeago from 'timeago.js'

import { Card, Typography } from '@mui/material'
let total = []

const Pets = () => {
    const [pets, setPets] = useState([])

        for (let i = 0; i < pets.length; i++) {
            
            total.push(pets[i].age)
        }

    useEffect(() => {
        axios.get('/api/pets')
            .then(res => {
                const data = res.data;
                total = []
                setPets(data.reverse())
            })
    }, [])
    return (
        <div>
            <Typography variant="h3" component="h3">
                total age: {total.reduce((sum, a) => sum + a, 0)}
            </Typography>
            {pets !== undefined ? pets.map(pet => {
                
                return (
                    <Card
                        key={pet._id}
                        sx={{
                            bgcolor: '#fff',
                            m: 3,
                            p: 2,
                            borderRadius: 3,
                            boxShadow: 2,
                            width: "60vh",
                            height: '50vh',
                            backdropFilter: "blur(3px)",
                            display:"grid",
                            alignItems: "center",
                            justifyContent: "center"

                        }}
                    >
                        <Typography variant="h3" component="h3">
                            name: {pet.name}
                        </Typography>
                        <Typography variant="h3" component="h3">
                            age: {pet.age}
                        </Typography>
                        <Typography variant="h3" component="h3">
                            type: {pet.type}
                        </Typography>
                        <Typography variant="h3" component="h3">
                            created: {timeago.format(new Date(pet.created_at))}
                        </Typography>
                        <Typography variant="h3" component="h3">
                            pet-color: {pet.color}
                        </Typography>
                    </Card>
                )
            }) : <></>}

        </div>

    );
}

export default Pets;