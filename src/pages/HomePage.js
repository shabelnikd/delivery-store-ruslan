import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Box } from '@mui/material';
import { productService } from '../services/api';
import { useCart } from '../contexts/CartContext';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesResponse, productsResponse] = await Promise.all([
          productService.getCategories(),
          productService.getProducts({ in_stock: true })
        ]);
        
        setCategories(categoriesResponse.data.results || categoriesResponse.data);
        
        // Get 4 featured products
        const products = productsResponse.data.results || productsResponse.data;
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random?food)',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
            borderRadius: 2,
          }}
        />
        <Box
          sx={{
            position: 'relative',
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography component="h1" variant="h2" color="inherit" gutterBottom>
            Delivery Store
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Быстрая доставка качественных товаров
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/products">
            Перейти в каталог
          </Button>
        </Box>
      </Box>

      {/* Categories Section */}
      <Typography variant="h4" component="h2" gutterBottom>
        Категории товаров
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={category.image || 'https://source.unsplash.com/random?category'}
                alt={category.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {category.name}
                </Typography>
                <Typography>
                  {category.description || 'Discover products in this category'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/products?category=${category.id}`}>
                  Перейти
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Featured Products Section */}
      <Typography variant="h4" component="h2" gutterBottom>
        Популярные товары
      </Typography>
      
      <Grid container spacing={4}>
        {featuredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image || 'https://source.unsplash.com/random?product'}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description?.substring(0, 100)}...
                </Typography>
                <Typography variant="h6" color="primary">
                  {product.price} ₽
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/products/${product.id}`}>
                  Подробнее
                </Button>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  В корзину
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage; 