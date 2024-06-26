import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import pen from "../assets/pen.png";
import { TextField } from '@mui/material';
import { useModal } from '../hooks/useModal';
import { useMessage } from '../hooks/useMessage';

const style = {
  position: 'absolute',
  top: '61%',
  left: '71%',
  transform: 'translate(-50%, -50%)',
  width: "40vw",
  height: "35vw",
  minHeight: "505px",
  bgcolor: 'background.paper',
  padding: "1vw",
};

export default function Message() {
  const { open, handleOpen, handleClose } = useModal();
  const { mailId, setMailId, message, setMessage, inbox } = useMessage();

  const handleSend = async () => {
    await inbox();
    handleClose(); // Close the modal after sending the message
  };

  return (
    <div>
      <div onClick={handleOpen} style={{
        cursor: 'pointer', height: "4.5vw", marginLeft: "1vw",
        width: "12vw", display: "flex", alignItems: "center",
        borderRadius: "20px", backgroundColor: "#BEE0FF"
      }}>
        <img src={pen} alt="Refresh" style={{ width: "1.2vw", marginLeft: "2vw" }} />
        <h4 style={{ marginLeft: "1.6vw", fontWeight: "400", fontSize: '1.3vw' }}>Compose</h4>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{
            backgroundColor: "#EDF9FF", position: 'absolute',
            top: "0", left: "0", width: "41vw", padding: "0.5vw", fontSize: "1vw"
          }}>
            New Message
          </Typography>
          <TextField onChange={(e) => setMailId(e.target.value)} variant='standard' label="To" sx={{ width: "39vw", marginTop: "1vw" }} />
          <br />
          <TextField variant='standard' label="Subject" sx={{ width: "39vw" }} />
          <br />
          <TextField onChange={(e) => setMessage(e.target.value)} multiline rows={12} sx={{ width: "39vw", "& fieldset": { border: "none" } }} />
          <br />
          <Button onClick={handleSend} variant='contained' sx={{
            borderRadius: "6vw",
            fontSize: "1vw", width: "4vw", height: "3vw"
          }}>Send</Button>
        </Box>
      </Modal>
    </div>
  );
}
