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

function RecipeCard(props) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  //used to handle modal being opened
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };
  //console.log(props);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // Add a check to make sure that the `rec` prop is not undefined
  if (!props.rec) {
    return null;
  }

  return (
    <Card
      variant="outlined"
      sx={{ width: 200, borderColor: "hsl(294deg 9% 91%)" }}
    >
      <CardActionArea onClick={handleOpen} sx={{ width: 200 }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img
              src={props.rec.image.path}
              srcSet={`${props.rec.image.path} 2x`}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            color="primary"
            sx={{
              position: "absolute",
              zIndex: 2,
              borderRadius: "50%",
              right: "1rem",
              bottom: 0,
              transform: "translateY(50%)",
              backgroundColor: "hsl(294deg 45% 52%)",
            }}
            onClick={handleClick}
          >
            <Favorite sx={{ color: isFavorite ? "yellow" : "white" }} />
          </IconButton>
        </CardOverflow>
        <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
          {props.rec.title}
        </Typography>
        <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
          <Typography startDecorator={<TimerIcon />} textColor="neutral.700">
            {props.rec.time}
          </Typography>
        </Typography>
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
      </CardActionArea>
      <CardActions>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
}

RecipeCard.propTypes = {
  rec: PropTypes.shape({
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    energy: PropTypes.string.isRequired,
    mealType: PropTypes.string.isRequired,
    utensils: PropTypes.arrayOf(PropTypes.string).isRequired,
    ingredients: PropTypes.shape({
      Snickerdoodles: PropTypes.arrayOf(PropTypes.string).isRequired,
      "Cinnamon Sugar Coating:": PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.shape({
      mime: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
    filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default RecipeCard;
