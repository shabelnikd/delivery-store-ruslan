import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              О компании
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Delivery Store - ваш надежный интернет-магазин с быстрой доставкой.
              Мы предлагаем широкий ассортимент товаров высокого качества.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Контакты
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Адрес: г. Москва, ул. Примерная, д. 123
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Телефон: +7 (999) 123-45-67
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@deliverystore.ru
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Полезные ссылки
            </Typography>
            <Link href="/products" color="inherit" display="block">
              Каталог товаров
            </Link>
            <Link href="/delivery" color="inherit" display="block">
              Доставка и оплата
            </Link>
            <Link href="/about" color="inherit" display="block">
              О нас
            </Link>
          </Grid>
        </Grid>
        
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Delivery Store. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 