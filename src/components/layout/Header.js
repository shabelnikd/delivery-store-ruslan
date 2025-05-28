import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Menu, MenuItem, Avatar } from '@mui/material';
import { ShoppingCart, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <AppBar position="static" sx={{ marginBottom: 2 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { md: 'none' }, mr: 2 }}
          onClick={toggleMobileMenu}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Delivery Store
        </Typography>
        
        <div sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Товары
          </Button>
          {currentUser && (
            <Button color="inherit" component={Link} to="/orders">
              Мои заказы
            </Button>
          )}
        </div>
        
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        
        {currentUser ? (
          <>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {currentUser.profile?.profile_picture ? (
                <Avatar src={currentUser.profile.profile_picture} alt={currentUser.username} sx={{ width: 32, height: 32 }} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Профиль</MenuItem>
              <MenuItem component={Link} to="/orders" onClick={handleMenuClose}>Мои заказы</MenuItem>
              <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Войти
          </Button>
        )}
      </Toolbar>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div sx={{ display: { xs: 'block', md: 'none' }, backgroundColor: 'primary.dark', padding: 1 }}>
          <Button color="inherit" component={Link} to="/" fullWidth>
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/products" fullWidth>
            Товары
          </Button>
          {currentUser && (
            <Button color="inherit" component={Link} to="/orders" fullWidth>
              Мои заказы
            </Button>
          )}
        </div>
      )}
    </AppBar>
  );
};

export default Header; 