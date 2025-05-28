import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  TextField,
  Divider,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { cart, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleUpdateQuantity = (productId, currentQuantity, change) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    updateQuantity(productId, newQuantity);
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Ваша корзина пуста
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Добавьте товары в корзину, чтобы оформить заказ
          </Typography>
          <Button variant="contained" component={Link} to="/products">
            Перейти к товарам
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Корзина
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Товар</TableCell>
                  <TableCell align="right">Цена</TableCell>
                  <TableCell align="right">Количество</TableCell>
                  <TableCell align="right">Сумма</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          src={item.image || 'https://source.unsplash.com/random?product'}
                          alt={item.name}
                          sx={{ width: 50, height: 50, mr: 2, objectFit: 'cover' }}
                        />
                        <Typography variant="subtitle1">{item.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{item.price} ₽</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <IconButton 
                          size="small"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <TextField
                          size="small"
                          variant="outlined"
                          value={item.quantity}
                          InputProps={{ readOnly: true }}
                          sx={{ width: 50, mx: 1, '& input': { textAlign: 'center' } }}
                        />
                        <IconButton 
                          size="small"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{(item.price * item.quantity).toFixed(2)} ₽</TableCell>
                    <TableCell align="right">
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button startIcon={<DeleteIcon />} onClick={clearCart} color="error">
              Очистить корзину
            </Button>
            <Button component={Link} to="/products">
              Продолжить покупки
            </Button>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Сводка заказа
            </Typography>
            
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>Товары ({cart.length}):</Typography>
                </Grid>
                <Grid item>
                  <Typography>{totalPrice.toFixed(2)} ₽</Typography>
                </Grid>
              </Grid>
              
              <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                <Grid item>
                  <Typography>Доставка:</Typography>
                </Grid>
                <Grid item>
                  <Typography>Бесплатно</Typography>
                </Grid>
              </Grid>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
              <Grid item>
                <Typography variant="h6">Итого:</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">{totalPrice.toFixed(2)} ₽</Typography>
              </Grid>
            </Grid>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
              onClick={handleCheckout}
            >
              Оформить заказ
            </Button>
            
            <Alert severity="info" sx={{ mt: 2 }}>
              Оформляя заказ, вы соглашаетесь с условиями доставки и правилами магазина.
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage; 