import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={product.productName}
        subheader={product.date}
      /> */}
      <CardMedia
        component="img"
        height="194"
        image='https://media.istockphoto.com/id/1363326235/photo/flat-lay-of-different-apple-products-on-a-grey-background.jpg?s=612x612&w=0&k=20&c=4Rnk6g84skwbVy7EVpgwyUQGvq6i3knYbK-TicM5AMk='
        alt={product.productName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {product.productName}
        </Typography>
        <div>
          <Typography level="body-xs">Price:</Typography>
          <Typography
            fontSize="lg"
            fontWeight="lg"
            fontFamily="sans-serif"
            lineHeight="1.25"
            mb="10"
          >
            ৳ {product.price} .00
          </Typography>

          <Typography
          fontSize="lg"
          fontWeight="lg"
          fontFamily="sans-serif"
          lineHeight="1.25"
          mb="10"
        >
          {product.createDate}
          {/* Start from here */}
        </Typography>


        </div>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMoreIcon />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
