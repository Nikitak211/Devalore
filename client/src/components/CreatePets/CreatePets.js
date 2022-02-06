import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Alert, CircularProgress, Card, Button, TextField, RadioGroup, Radio, FormControlLabel } from '@mui/material'

const CreatePets = (props) => {
    const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch
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
                    setTimeout(() => {
                        setAlert(false)
                    }, [1000])
                }
            })
    }

    const test = () => {
        if (watch("type") === "other") {
            setInput(true)
        } else {
            setInput(false)
        }
    }

    return (
        <Card sx={{
            bgcolor: '#fff',
            m: 3,
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
            width: "60vh",
            minWidth: "fit-content",
            height: 'fit-content',
            minHeight: "fit-content"
        }}>
            <form
                onSubmit={handleSubmit((data => {
                    let type;
                    if (data.type === 'other') {
                        type = data.otherType
                    } else {
                        type = data.type
                    }
                    const pet = {
                        name: data.name.trim(),
                        age: data.age.trim(),
                        type: type,
                        color: data.color,
                        created_at: new Date()
                    }
                    createPet(pet)
                    reset({
                        color: data.color,
                        name: "",
                        age: "",
                        type: data.type,
                    })
                }))}>
                <div style={{
                    display: 'grid',
                    gap: "1em",
                    justifyContent: 'center',
                    alignItems: "center"
                }}>

                    <TextField
                        sx={{
                            width: "284px"
                        }}
                        id="filled-basic"
                        label="Name"
                        variant="filled"
                        required
                        error={errors.name !== undefined ? true : false}
                        helperText={errors.name !== undefined ? errors.name.message : ""}                        {...register('name', {
                            required: true,
                            validate: value => value.length >= 25 ? "maximum 25 characters" : true,
                            whiteSpace: value => value.match(/^\s+$/) !== null ? "cannot use only whitespace" : true
                        })}
                    />
                    <TextField
                        id="filled-basic"
                        label="Age"
                        variant="filled"
                        required
                        error={errors.age !== undefined ? true : false}
                        helperText={errors.age !== undefined ? errors.age.message : ""}
                        {...register('age', {
                            required: true,
                            validate: value => isNaN(value) || value === 0 ? "Only Numbers accepted" : true,
                            whiteSpace: value => value.match(/^\s+$/) !== null ? "cannot use only whitespace" : true
                        })}
                    />
                    <select
                        onClick={test}
                        name="type"
                        {...register('type', {
                            required: true,
                        })}>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="horse">Horse</option>
                        <option value="other" >Other</option>
                    </select>
                    {input ?
                        (<TextField
                            id="filled-basic"
                            label="Type"
                            variant="filled"
                            required
                            error={errors.otherType !== undefined ? true : false}
                            {...register('otherType', {
                                required: true,
                                whiteSpace: value => value.match(/^\s+$/) !== null ? "cannot use only whitespace" : true
                            })}
                        ></TextField>)
                        :
                        (<></>)}
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="color"
                        name="radio-buttons-group"
                        {...register('color', {
                            required: true,
                        })}
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
                    {loading ?
                        (<CircularProgress
                            sx={{
                                margin: '0 auto',
                                width: '3em',
                                height: '3em'
                            }} />)
                        : (<></>)}
                    <Button type="submit" >Create Pet</Button>
                    {alert ? (<Alert severity="success">Pet has been successfully created</Alert>) : (<></>)}
                </div>
            </form>
        </Card>
    );
}

export default CreatePets;