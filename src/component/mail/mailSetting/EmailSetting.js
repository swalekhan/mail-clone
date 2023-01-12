
import CheckBoxOutlineBlankTwoToneIcon from '@material-ui/icons/CheckBoxOutlineBlankTwoTone';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import RefreshTwoToneIcon from '@material-ui/icons/RefreshTwoTone';
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone';
import KeyboardArrowLeftTwoToneIcon from '@material-ui/icons/KeyboardArrowLeftTwoTone';
import KeyboardArrowRightTwoToneIcon from '@material-ui/icons/KeyboardArrowRightTwoTone';
import { IconButton } from '@material-ui/core';
import './EmailSetting.css'

const EmailSetting = () => {

    return (
        <div className='emali-setting'>
            <div className='email-setting-left'>
                <IconButton>
                    <CheckBoxOutlineBlankTwoToneIcon />
                </IconButton>
                <IconButton>
                    <ExpandMoreTwoToneIcon />
                </IconButton>
                <IconButton>
                    <RefreshTwoToneIcon />
                </IconButton>
                <IconButton>
                    <MoreVertTwoToneIcon />
                </IconButton>
            </div>
            <div className='email-setting-right'>
                <p>1-50 of 10,22</p>
                <IconButton>
                    <KeyboardArrowLeftTwoToneIcon />
                </IconButton>
                <IconButton>
                    <KeyboardArrowRightTwoToneIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default EmailSetting;