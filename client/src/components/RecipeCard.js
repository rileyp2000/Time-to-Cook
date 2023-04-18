import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import TimerIcon from "@mui/icons-material/Timer";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { CardActionArea, CardActions } from "@mui/material";
import Sheet from "@mui/joy/Sheet";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { purple } from "@mui/material/colors";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

function RecipeCard(props) {
  //used to handle modal being opened
  const [openCard, setOpenCard] = React.useState(false);
  const handleOpenCard = () => setOpenCard(true);
  const handleClose = () => setOpenCard(false);

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const handleDelete = () => {
    // Open the delete confirmation modal
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    fetch("/deleteRecipe", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props.rec._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Close the delete confirmation modal
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    // Close the delete confirmation modal
    setDeleteModalOpen(false);
  };

  //setting based on status of recipecard:
  const [isFavorite, setIsFavorite] = React.useState(props.rec.favorite);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    fetch("/toggleFavorite", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props.rec._id,
        value: !isFavorite,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Add a check to make sure that the `rec` prop is not undefined
  if (!props.rec) {
    console.log("we returned null");
    return null;
  }

  return (
    <div>
      <Card
        variant="outlined"
        sx={{ width: "100%", borderColor: "hsl(294deg 9% 91%)", padding: "17px", marginBottom: "20px"}}
      >
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="primary"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: 8,
            top: 8,
            transform: "translateY(50%)",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={handleClick}
        >
          <FavoriteIcon
            sx={{
              color: isFavorite ? "purple" : "white",
              fontSize: "40px",
            }}
          />
        </IconButton>
        <CardActionArea onClick={handleOpenCard} sx={{ width: "100%" }}>
          <CardOverflow>
            <AspectRatio ratio="2">
              <img
                src={props.rec.image.path}
                srcSet={`${props.rec.image.path} 2x`}
                loading="lazy"
                alt=""
              />
            </AspectRatio>
          </CardOverflow>
          <Typography level="h2" sx={{ fontSize: "md", mt: 2, }}>
            {props.rec.title}
          </Typography>
          <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
            <Typography startDecorator={<TimerIcon />} textColor="neutral.700">
              {props.rec.time}
            </Typography>
          </Typography>
        </CardActionArea>
        <Divider inset="context" />
        <CardOverflow
          variant="soft"
          sx={{
            display: "flex",
            gap: 1.5,
            py: 1.5,
            px: "var(--Card-padding)",
            backgroundColor: "lightgrey",
          }}
        >
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            Energy
          </Typography>
          <Divider orientation="vertical" sx={{ backgroundColor: "white" }} />
          <Typography
            level="body3"
            sx={{ fontWeight: "md", color: "text.secondary" }}
          >
            {props.rec.energy}
          </Typography>
        </CardOverflow>
        <CardActions>
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={openCard}
            onClose={() => setOpenCard(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh", // Set the height of the parent Modal component to 100vh, to make it scrollable
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "none",
                overflow: "auto",
                height: "80%", //tells us what the height of the modal content
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 15,
                  zIndex: 1,
                }}
                endIcon={<EditOutlinedIcon />}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 115,
                  zIndex: 1,
                }}
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Typography
                component="h2"
                id="modal-title"
                level="h1"
                textColor="inherit"
                fontWeight="fontWeightBold"
                mb={1}
                mt={3}
                style={{ borderBottom: "1px solid grey", mt: 2}}
              >
                {props.rec.title}
              </Typography>
              <Typography id="modal-desc" textColor="text.primary">
                MealType: {props.rec.mealType}
              </Typography>
              {/* my stands for margin y this makes space between each seciton
            by wrapping a box around it */}
              <Box my={4}>
                <Typography
                  component="h2"
                  id="modal-title"
                  level="h3"
                  textColor="inherit"
                  fontWeight="fontWeightRegular"
                  mb={1}
                  style={{ borderBottom: "1px solid grey" }}
                >
                  Utensils
                </Typography>
                <Typography id="modal-desc" textColor="text.primary">
                  <ul>
                    {props.rec.utensils.map((utensil, index) => (
                      <li key={index}>{utensil}</li>
                    ))}
                  </ul>
                </Typography>
              </Box>
              <Box my={4}>
                <Typography
                  component="h2"
                  id="modal-title"
                  level="h3"
                  textColor="inherit"
                  fontWeight="fontWeightRegular"
                  mb={1}
                  style={{ borderBottom: "1px solid grey" }}
                >
                  Ingredients
                </Typography>
                <Typography id="modal-desc" textColor="text.primary">
                  {Object.entries(props.rec.ingredients).map(
                    ([title, ingredients]) => (
                      <div key={title}>
                        <Typography variant="h6" gutterBottom>
                          {title}
                        </Typography>
                        <ul>
                          {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </Typography>
              </Box>
              <Box my={4}>
                <Typography
                  component="h2"
                  id="modal-title"
                  level="h3"
                  textColor="inherit"
                  fontWeight="fontWeightRegular"
                  mb={2}
                  style={{ borderBottom: "1px solid grey" }}
                >
                  Steps
                </Typography>
                <Typography id="modal-desc" textColor="text.primary">
                  {props.rec.steps.map((step, index) => (
                    <div key={index} style={{ marginBottom: "8px" }}>
                      <span style={{ marginRight: "8px", fontWeight: "bold" }}>
                        {index + 1}.
                      </span>
                      {step}
                    </div>
                  ))}
                </Typography>
              </Box>
            </Sheet>
          </Modal>
          <Modal
            open={deleteModalOpen}
            onClose={handleDeleteCancel}
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                backgroundColor: "white",
                p: 2,
                borderRadius: 4,
                alignItems: "center",
              }}
            >
              <h2 id="delete-modal-title" style={{ textAlign: "center" }}>
                Are you sure you want to delete?
              </h2>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center", // Add justifyContent to center the buttons
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteConfirm}
                  sx={{ mr: 2 }}
                  size="large"
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleDeleteCancel}
                  size="large"
                >
                  No
                </Button>
              </Box>
            </Box>
          </Modal>
        </CardActions>
      </Card>
    </div>
  );
}

RecipeCard.propTypes = {
  rec: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    energy: PropTypes.string.isRequired,
    mealType: PropTypes.string.isRequired,
    utensils: PropTypes.arrayOf(PropTypes.string).isRequired,
    ingredients: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
      .isRequired,
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.shape({
      mime: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
    filters: PropTypes.arrayOf(PropTypes.string).isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
};

export default RecipeCard;
