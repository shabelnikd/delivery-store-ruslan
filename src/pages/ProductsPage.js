import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Pagination,
  CircularProgress,
  Alert
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { productService } from '../services/api';
import { useCart } from '../contexts/CartContext';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const productsPerPage = 8;
  
  useEffect(() => {
    // Parse query parameters
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    const searchParam = queryParams.get('search');
    const pageParam = queryParams.get('page');
    
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchTerm(searchParam);
    if (pageParam) setPage(parseInt(pageParam, 10));
    
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await productService.getCategories();
        setCategories(response.data.results || response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Ошибка загрузки категорий товаров');
      }
    };
    
    fetchCategories();
    fetchProducts(categoryParam, searchParam, pageParam);
  }, [location.search]);
  
  const fetchProducts = async (categoryId, search, pageNum) => {
    try {
      setLoading(true);
      const params = {
        in_stock: true,
        page: pageNum || page,
        page_size: productsPerPage
      };
      
      if (categoryId) params.category = categoryId;
      if (search) params.search = search;
      
      const response = await productService.getProducts(params);
      
      // Check if response has pagination info
      if (response.data.results) {
        setProducts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / productsPerPage));
      } else {
        setProducts(response.data);
        setTotalPages(1);
      }
      
      setError('');
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Ошибка загрузки товаров');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    updateQueryParams(categoryId, searchTerm, 1);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    updateQueryParams(selectedCategory, searchTerm, 1);
  };
  
  const handlePageChange = (event, value) => {
    setPage(value);
    updateQueryParams(selectedCategory, searchTerm, value);
  };
  
  const updateQueryParams = (categoryId, search, pageNum) => {
    const queryParams = new URLSearchParams();
    
    if (categoryId) queryParams.set('category', categoryId);
    if (search) queryParams.set('search', search);
    if (pageNum) queryParams.set('page', pageNum.toString());
    
    navigate({
      pathname: '/products',
      search: queryParams.toString()
    });
  };
  
  const handleAddToCart = (product) => {
    addToCart(product);
  };
  
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Каталог товаров
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Категория</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              label="Категория"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">Все категории</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Box component="form" onSubmit={handleSearch}>
            <Grid container spacing={1}>
              <Grid item xs>
                <TextField
                  fullWidth
                  label="Поиск товаров"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ height: '100%' }}
                >
                  Найти
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
        <Alert severity="info">
          Товары не найдены. Попробуйте изменить параметры поиска.
        </Alert>
      ) : (
        <>
          <Grid container spacing={4}>
            {products.map((product) => (
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
                    <Typography variant="body2" color="text.secondary">
                      Категория: {product.category_name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(product)}
                      fullWidth
                      variant="contained"
                    >
                      В корзину
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default ProductsPage; 