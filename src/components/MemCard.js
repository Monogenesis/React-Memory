import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import backsideImage from "../img/backside.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
});

var currentlyRevealedCards = []; // Contains the cards that are revealed in the current gamestep
var cardsHandledCounter = 0; // Counter to only affect the relevant cards, if component gets updated

export default function MemCard(props) {
  const [currentImage, setCurrentImage] = useState(backsideImage);
  const [locked, setLocked] = useState(false);
  const classes = useStyles();

  function flipCard() {

    // Add this card to the reavlead card array
    currentlyRevealedCards.push(props);

    // Disable all interaction with the component
    setLocked(true);

    // Show card frontside
    setCurrentImage(props.status.image);

    // Refresh all MemCard components
    props.setRefresh(!props.refresh);
  }

  function flipBack() {

    // Show card backside
    setCurrentImage(backsideImage);

    // Unlock the interactions with the component
    setLocked(false);
  }

  // Clear the array when the game starts
  useEffect(() => {
    currentlyRevealedCards = [];
  }, []);

  // Check if this current component is part of the currently revealed cards
  useEffect(() => {

    // Only take action if two cards have been flipped
    if (currentlyRevealedCards.length === 2) {

      // Check if this component is one of the revealed cards
      if (
        props.status.id === currentlyRevealedCards[0].status.id ||
        props.status.id === currentlyRevealedCards[1].status.id
      )
        // Check if the images match
        if (
          currentlyRevealedCards[0].status.image ===
          currentlyRevealedCards[1].status.image
        ) {

          // Tell the game manager MemGame component that this cards pair has been found
          props.status.pairFound = true;

          // Lock the card for the rest of the game
          setLocked(true);

          cardsHandledCounter++;

        } else {  // The images are not matching

          // Delay the flip back action by one second
          setTimeout(() => {
            flipBack();
          }, 1000);

          cardsHandledCounter++;
        }
      if (cardsHandledCounter === 2) {

        // Clear the revealed cards and reset the counter so the next two cards can be flipped
        currentlyRevealedCards = [];

        cardsHandledCounter = 0;
      }
    }

  }, [props.refresh]);

  return (
    <div className="memCard">
      <Card className={classes.root}>
        <CardActionArea disabled={locked} onClick={() => flipCard()}>
          <CardMedia
            component="img"
            height="200"
            width="200"
            image={currentImage}
            title="React"
          />
        </CardActionArea>
      </Card>
    </div>
  );
}
