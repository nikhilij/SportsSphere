import React from "react";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
Box,
Container,
Typography,
Grid,
Card,
CardMedia,
CardContent,
CardActions,
Button,
useTheme,
} from "@mui/material";

// Example products
const products = [
{
    id: 1,
    name: "Pro Soccer Ball",
    price: "$29.99",
    image: "/assets/store/soccer-ball.jpg",
    description: "Official size and weight. Perfect for matches and training.",
},
{
    id: 2,
    name: "Running Shoes",
    price: "$79.99",
    image: "/assets/store/running-shoes.jpg",
    description: "Lightweight, durable, and comfortable for all runners.",
},
{
    id: 3,
    name: "Sports Jersey",
    price: "$39.99",
    image: "/assets/store/jersey.jpg",
    description: "Breathable fabric, available in all sizes and colors.",
},
{
    id: 4,
    name: "Fitness Tracker",
    price: "$59.99",
    image: "/assets/store/fitness-tracker.jpg",
    description: "Track your workouts, heart rate, and more.",
},
];

const Store = () => {
const theme = useTheme();

return (
    <Box
        sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
            minHeight: "100vh",
            py: 6,
        }}
    >
        <Container maxWidth="lg">
            <Box
                display="flex"
                alignItems="center"
                gap={2}
                mb={4}
                justifyContent="center"
            >
                <SportsSoccerIcon
                    sx={{ fontSize: 40, color: theme.palette.primary.main }}
                />
                <Typography
                    variant="h3"
                    fontWeight={700}
                    color={theme.palette.text.primary}
                >
                    SportsSphere Store
                </Typography>
            </Box>
            <Typography
                variant="h6"
                color={theme.palette.text.secondary}
                align="center"
                mb={6}
            >
                Gear up with the best sports equipment and apparel!
            </Typography>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: 4,
                                transition: "transform 0.2s",
                                "&:hover": {
                                    transform: "translateY(-8px) scale(1.03)",
                                    boxShadow: 8,
                                },
                                background: theme.palette.background.paper,
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="180"
                                image={product.image}
                                alt={product.name}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                    fontWeight={600}
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color={theme.palette.text.secondary}
                                    mb={1}
                                >
                                    {product.description}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color={theme.palette.primary.main}
                                    fontWeight={700}
                                >
                                    {product.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    startIcon={<ShoppingCartIcon />}
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);
};

export default Store;