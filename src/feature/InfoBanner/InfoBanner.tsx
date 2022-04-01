import {useI18n} from 'core/i18n'
import {Box, Icon, Link, Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";
import {useState} from "react";
import {styleUtils} from "../../core/theme/theme";


export const InfoBanner = () => {
  const [open, setOpen] = useState(true);


  const handleClose = () => {
    setOpen(false);
  };

  const {m} = useI18n()
  return (
    <Snackbar anchorOrigin={{vertical :'top',horizontal :'right'}} open={open}>
      <Alert severity="warning" sx={{ width: '100%'}} action={<Icon onClick={handleClose}>close</Icon>}>
        <Box sx={{
          textAlign: 'center',
          fontSize: t => styleUtils(t).fontSize.big,
        }}>Vous avez acheté des <b>pizzas FRAÎCH'UP de BUITONI</b> ces derniers jours, signalez-le <Link
          href="/retrait-rappel"> en cliquant ici</Link></Box>
      </Alert>
    </Snackbar>
  )

}

