import { Button, Grid, Typography } from "@material-ui/core";
import classes from "./Navigation.module.css";
const Navigation = (props) => {
  const backHandler = () => {
    props.backHandler();
  };
  const nextHandler = () => {
    props.nextHandler();
  };
  return (
    <>
      <Grid
        container
        justifyContent={props.showBack ? "space-between" : "flex-end"}
        className={classes.main}
        alignContent="flex-end"
      >
        {props.showBack && (
          <Button variant="outlined" onClick={backHandler}>
            <Typography variant="h4">Back</Typography>
          </Button>
        )}
        {props.showNext && (
          <Button variant="outlined" color="primary" onClick={nextHandler}>
            <Typography variant="h4">Next</Typography>
          </Button>
        )}
      </Grid>
    </>
  );
};

export default Navigation;
