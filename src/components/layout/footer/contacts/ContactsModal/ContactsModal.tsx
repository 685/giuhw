import {Box, Fade, Modal} from "@mui/material";
import styles from "./ContactsModal.module.scss";
import {
    ContactsField
} from "@/components/layout/footer/contacts/ContactsModal/ui/ContactField/ContactsField";

// email icon
import EmailIcon from "@mui/icons-material/Email";

import {DiscordSvg} from "@/components/ui/DiscordSvg";

interface ContactsModalProps {
    opened: boolean;
    handleClose: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'var(--bg-secondary)',
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: "4px",
};


export function ContactsModal({opened, handleClose}: ContactsModalProps) {
    return (
        <Modal
            open={opened}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableEnforceFocus
        >
            <Fade in={opened}>
                <Box sx={style}>
                    <h2 id="modal-modal-title"
                        className={styles.modal__title}>Ways you can contact
                        me</h2>
                    <div className={styles.fields}>
                        <ContactsField title={"Email"}
                                       value={"exampleemail@gmail.com"}
                                       Icon={EmailIcon} link={true}
                                       linkTo={"https://gmail.com/"}
                                       newTab={true}/>
                        <ContactsField title={"My Discord"}
                                       value={"Giuliano#0001"} Icon={DiscordSvg}
                                       link={true}
                                       linkTo={"https://discord.com/users/813959385708757012"}
                                       newTab={true}/>
                    </div>
                </Box>
            </Fade>

        </Modal>
    )
}