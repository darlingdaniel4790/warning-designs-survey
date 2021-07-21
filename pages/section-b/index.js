import { Card, Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Navigation from "../../components/Navigation";

const SectionB = () => {
  const router = useRouter();

  const nextHandler = () => {
    router.push("/section-c");
  };

  const backHandler = () => {
    router.back();
  };
  return (
    <>
      <Grid container>
        <Typography variant="h2">Section B</Typography>
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

export default SectionB;
