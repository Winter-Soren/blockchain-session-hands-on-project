import { Link } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import { MENU_OPEN } from 'store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  return (
    <Button disableRipple  component={Link} to={config.defaultPath}>
      <Logo />
    </Button>
  );
};

export default LogoSection;
