import React from 'react';
import { Button, Paper, Typography } from '@mui/material';

function MessageDetail({ message, onBack }) {
    return (
        <Paper style={{ padding: "2vw", margin: "2vw" }}>
            <Button onClick={onBack} style={{marginBottom:"1vw"}}> Back to Inbox </Button>
            <Typography variant="h5" gutterBottom>{message.sender}</Typography>
            <Typography variant="body1">{message.email}</Typography>
            <Typography variant="body2">{message.content}</Typography>
        </Paper>
    );
}

export default MessageDetail;
