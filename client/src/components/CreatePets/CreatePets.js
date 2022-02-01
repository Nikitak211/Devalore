import { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Alert, CircularProgress, Card, Button, TextField, RadioGroup, Radio, FormControlLabel } from '@mui/material'

const CreatePets = (props) => {
    const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const createPet = async (data) => {
        await axios.post('/api/pet', data)
            .then(res => {
                const data = res.data;
                if (res.onload) {
                    setLoading(true)
                } else {
                    setLoading(false)
                }
                // console.log(res)
                props.setSuccess(true)
                if (data.success) {
                    setAlert(true)
                }
            })
    }

    return (
        <Card sx={{
            bgcolor: '#fff',
            m: 3,
            p: 2,
            borderRadius: 3,
            boxShadow: 2,
            width: "60vh",
            height: '50vh',
            backdropFilter: "blur(3px)",
            minHeight: '50vh'

        }}>
            <form
                onSubmit={handleSubmit((data => {
                    const pet = {
                        name: data.name,
                        age: data.age,
                        type: data.type,
                        color: data.color,
                        created_at: new Date()
                    }

                    createPet(pet)
                    reset(setAlert(), {

                    })
                }))}>
                <div style={{
                    display: 'grid',
                    gap: "1em",
                    justifyContent: 'center',
                    alignItems: "center"
                }}>

                    <TextField
                        id="filled-basic"
                        label="Name"
                        variant="filled"
                        required
                        helperText={errors.name !== undefined ? errors.name.message : ""}                        {...register('name', {
                            required: true,
                            validate: value => value.length >= 25 ? "maximum 25 characters" : true
                        })}
                    />
                    <TextField
                        id="filled-basic"
                        label="Age"
                        variant="filled"
                        required
                        helperText={errors.age !== undefined ? errors.age.message : ""}
                        {...register('age', {
                            required: true,
                            validate: value => isNaN(value) || value === 0 ? "Only Numbers accepted" : true
                        })}
                    />
                    <select
                        name="type"
                        {...register('type', {
                            required: true,
                        })}>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="horse">Horse</option>
                        <option value="other" >Other</option>
                    </select>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="color"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            value="black"
                            control={<Radio />}
                            label="Black"
                            {...register('color', {
                                required: true,
                            })}
                        />
                        <FormControlLabel
                            value="white"
                            control={<Radio />}
                            label="White"
                            {...register('color', {
                                required: true,
                            })}
                        />
                    </RadioGroup>
                    {loading ? (<CircularProgress />) : (<></>)}
                    <Button type="submit" >Create Pet</Button>
                    {alert ? (<Alert severity="success">Pet has been successfully created</Alert>) : (<></>)}
                </div>
            </form>
        </Card>
    );
}

export default CreatePets;