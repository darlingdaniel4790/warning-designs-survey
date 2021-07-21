import { Grid, Typography } from "@material-ui/core";

const End = () => {
  return (
    <Grid container style={{ height: "80vh" }} alignItems="center">
      <Typography align="center" variant="h4">
        Thank you for taking part in this survey. Click <a href="">here</a> to
        return to Prolific.
      </Typography>
    </Grid>
  );
};

export default End;
