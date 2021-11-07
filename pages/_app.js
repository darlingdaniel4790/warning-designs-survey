import { Grid } from "@material-ui/core";
import { ContextProvider } from "../store";
import "../styles/globals.css";
import classes from "../styles/globals.module.css";
import firebase from "firebase/app";
import "firebase/firestore";
import LinearDeterminate from "../components/LinearDeterminate";
const firebaseConfig = {
  apiKey: "AIzaSyDgEt4kAWQHeKt5rxFkJt9PDvSr1VRsEKE",
  authDomain: "warning-designs.firebaseapp.com",
  projectId: "warning-designs",
  storageBucket: "warning-designs.appspot.com",
  messagingSenderId: "601686529960",
  appId: "1:601686529960:web:fc3530bc38b8c51e1daf9d",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
export const firestoreDB = firebase.firestore();

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <LinearDeterminate />
      <Grid
        container
        // spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.main}
      >
        <Component {...pageProps} />
      </Grid>
    </ContextProvider>
  );
}

export default MyApp;
