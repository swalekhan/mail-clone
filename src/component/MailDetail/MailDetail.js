import EmailSetting from '../mail/mailSetting/EmailSetting';
import { IconButton, Avatar } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import './MailDetail.css'

const MailDetail = ({ item }) => {

    return (
        <div className="single-email">
            <EmailSetting />
            <div className="sinle-email-header">
                <div className="single-email-left">
                    <IconButton>
                        <Avatar />
                    </IconButton>
                    <h4>{item?.subject}</h4>
                </div>
                <div className="single-email-right">
                    <p>{item?.date}</p>
                    <IconButton>
                        <StarIcon />
                    </IconButton>
                </div>
            </div>
            <div className="single-email-text">
                <p>{item?.text}</p>
            </div>
        </div>
    )
}
export default MailDetail