import React from 'react'
import Alert from '@mui/material/Alert';

const Message = ({ children }) => {
    return (
        <Alert severity="error" sx={{ marginTop: 2 }}>{children}</Alert>
    )
}

export default Message
