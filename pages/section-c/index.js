import { Card, Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Navigation from "../../components/Navigation";

const SectionC = () => {
  const router = useRouter();

  const nextHandler = () => {
    router.push("/end");
  };

  const backHandler = () => {
    router.back();
  };
  return (
    <>
      <Grid container>
        <Typography variant="h2">Section C</Typography>
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

export default SectionC;
