import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onMenuItemClickHandler = (navigateTo: string) => () => {
    navigate(navigateTo);
    handleCloseNavMenu();
  };

  const onLogoClickHandler = () => {
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={onLogoClickHandler}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ResumeBuilder
            </Typography>
          </Box>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={onMenuItemClickHandler('dataField')}>
                <Typography textAlign="center">
                  Data blocks
                </Typography>
              </MenuItem>
              <MenuItem onClick={onMenuItemClickHandler('template')}>
                <Typography textAlign="center">
                  CV templates
                </Typography>
              </MenuItem>
              <MenuItem onClick={onMenuItemClickHandler('candidate')}>
                <Typography textAlign="center">Candidates</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box onClick={onLogoClickHandler}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              ResumeBuilder
            </Typography>
          </Box>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            <Button
              onClick={onMenuItemClickHandler('dataField')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Data blocks
            </Button>
            <Button
              onClick={onMenuItemClickHandler('template')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              CV templates
            </Button>
            <Button
              onClick={onMenuItemClickHandler('candidate')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Candidates
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
