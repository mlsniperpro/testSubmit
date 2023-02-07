//Page that displays all of the photos photos, allows users to edit the title of photo and PATCH/PUT request sent to the server
//The photos available at https://jsonplaceholder.typicode.com/photos
//The PATCH/PUT request should be sent to https://jsonplaceholder.typicode.com/photos/:id

import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Typography, Paper } from "@mui/material";

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [photo, setPhoto] = useState({});
    const [title, setTitle] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/photos")
            .then((res) => res.json())
            .then((data) => {
                setPhotos(data);
            });
    }, []);

    const handleEdit = (photo) => {
        setPhoto(photo);
        setTitle(photo.title);
        setId(photo.id);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSave = (photo) => {
        fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                title: title,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    };

    return (
        <div>
            <Grid container spacing={3}>
                {photos.map((photo) => (
                    <Grid item xs={12} sm={6} md={4} key={photo.id}>
                        <Paper>
                            <img src={photo.url} alt={photo.title} />
                            <Typography variant="h5" component="h2">
                                {photo.title}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleEdit(photo)}
                            >
                                Edit
                            </Button>

                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <div>
                <TextField
                    id="standard-basic"
                    label="Title"
                    value={title}
                    onChange={handleTitleChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSave(photo)}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}

export default Photos;