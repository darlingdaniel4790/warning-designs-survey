import { Card, Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useContext } from "react";
import Navigation from "../../components/Navigation";
import Context from "../../store";

const Summary = () => {
  const router = useRouter();
  const context = useContext(Context);

  console.log(context);

  const nextHandler = () => {
    router.push("/section-b");
  };

  const backHandler = () => {
    router.back();
  };
  return (
    <>
      <Grid container>
        <Typography variant="h2">Mid-Summary</Typography>
        <Card></Card>
      </Grid>
      <Navigation
        showBack={true}
        showNext={true}
        nextHandler={nextHandler}
        backHandler={backHandler}
      />
    </>
  );
};

export default Summary;
