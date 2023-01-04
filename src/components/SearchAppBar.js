import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useAuthContext } from '../hooks/useAuthContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const[term, setTerm] = useState('');

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const pathname = useLocation().pathname;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${term}`);
    setTerm('');
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          > 
            <MenuItem component={NavLink} to="/" onClick={handleClose} selected={pathname === "/"}>Home</MenuItem>
            <MenuItem component={NavLink} to="/create" onClick={handleClose} selected={pathname === "/create"}>Create</MenuItem>
            <MenuItem component={NavLink} to="/about" onClick={handleClose} selected={pathname === "/about"}>About</MenuItem>
          </Menu>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Circle of Excuses
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <div>
              <form onSubmit={handleSubmit}>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => setTerm(e.target.value)}
                  value={term}
                />
              </form>
            </div>
          </Search>
          {!user && (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>Log in</Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>Sign up</Button>
            </>
          )}
          {user && (
            <>
              <p>hello, {user.displayName}</p>
              <Button color="inherit" onClick={logout}>Log out</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}