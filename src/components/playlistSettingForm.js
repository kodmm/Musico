import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PlaylistSettingForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <button  onClick={handleOpen}>
            <SettingsApplicationsIcon 
            color="disabled"
            fontSize="large"
            />
        </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h4 id="transition-modal-title">{props.playlist.name}の設定</h4>
            <form >
                        <div>
                            <label htmlFor="name">Playlist Name</label>
                            <input type="text" name="name" id="name"  value={}/>
                        </div>
                        <div>
                            <label htmlFor="isPublic">みんなに公開しますか？
                                <input type="radio" name="isPublic" value="true" />Yes(Public)
                                <input type="radio" name="isPublic" defaultChecked="checked" value="false" />No(Private)
                            </label>
                        </div>
                        <input type="submit" value=" Playlist Create" />
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}