import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import TimerIcon from "@mui/icons-material/Timer";
import IconButton from "@mui/joy/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function GradientCover() {
  return (
    <Card sx={{ minHeight: "210px", width: 280 }}>
      <CardCover>
        <img
          src="https://lilluna.com/wp-content/uploads/2022/07/snickerdoodles-final3-resize-14.jpg"
          srcSet="https://lilluna.com/wp-content/uploads/2022/07/snickerdoodles-final3-resize-14.jpg 2x"
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="solid"
          size="md"
          color="info"
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
          Snickerdoodles
        </Typography>
        <Typography startDecorator={<TimerIcon />} textColor="neutral.300">
          20 mins
        </Typography>
      </CardContent>
    </Card>
  );
}
