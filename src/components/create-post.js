import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

const form = () => {
    const [postData, setPostData] = useState({ creator: '', title: '', image: '' });
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingmessage, setLoadingmessage] = useState(false)
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }else{
            window.location='/';
        }
      }, []);

    const clear = () => {
        setPostData({ creator: '', title: '', image: '' });
    };
    const handleSubmit= async (e)=> {
          e.preventDefault();
          setLoading(true);
          setLoadingmessage('Loading..., updating your post and sending message to all the registered medical store')
          const data ={username: user.username, name: user.name, title: postData.title, image: postData.image}
          axios.post('https://medisocial.herokuapp.com/posts/add',data).then(res=>
          console.log(res.data));
           window.location='/';
    }
    return (
        <div>
             <Typography variant="h4" style={{left: '50%',}}>Need a Medicine !!</Typography>
                <br/>
            <Paper style={{padding: 'theme.spacing(2)',}}>
                <form autoComplete="off" style={{
                 display: 'flex',
                 flexWrap: 'wrap',
                 justifyContent: 'center',
                 bottom: 30
                 }} 
                 onSubmit={handleSubmit}>
                <Typography variant="h6">Just enter these details</Typography>
                {loadingmessage && <Alert variant="success">{loadingmessage}</Alert>}
                <TextField name="creator" variant="outlined" required label="Your name:" fullWidth value={user.name || ''} InputProps={{ readOnly: true,}} />
                <TextField name="username" variant="outlined" required label="Your phone no.:" fullWidth value={user.username || ''} InputProps={{ readOnly: true,}} />
                <TextField  variant="outlined" label="Enter name of the medicine" required fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <div style={{width: '97%', margin: '10px 0',}}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, image: base64 })} /></div>
                <Button disabled={loading} style={{ marginBottom: 10,}}variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </div>
    )
}

export default form

