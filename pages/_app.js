import { Grid } from "@material-ui/core";
import { ContextProvider } from "../store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Component {...pageProps} />
      </Grid>
    </ContextProvider>
  );
}

export default MyApp;
