import { Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Navigation from "../../components/Navigation";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Context from "../../store";

export const stepsLength = 12;
export const step3Questions = [
  {
    key: "1",
    question: "I understood the message clearly.",
  },
  {
    key: "2",
    question: "I am not interested in such popup messages.",
  },
];

const SectionB = (props) => {
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);
  const context = useContext(Context);
  context.setCurrentSection(3);
  useEffect(() => {
    // redirect if no access
    if (!context.access.sectionB) {
      router.replace("/summary");
      return;
    }
    setShowPage(true);
  }, []);

  const nextHandler = () => {
    context.setAccess((prev) => {
      return {
        ...prev,
        sectionB1: true,
      };
    });
    router.push("/section-b/part-1");
  };

  return (
    <>
      <Head>
        <title>Section B</title>
      </Head>
      {showPage && (
        <>
          <Summary />
          <Grid item lg={9} style={{ width: "100%" }}>
            <Typography variant="h2" gutterBottom={true}>
              Section B
            </Typography>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Typography variant="h4">
                  Please read carefully paying attention to details. 
                  <br />
                  <br />
                  As a daily routine, once Mr. David arrives at the office, he looks through his calendar and emails checking for tasks, appointments, and deadlines slated for the day. <br/>
                 
                  On this particular morning, while looking through his Email, he gets this mail purportedly from his bank asking him to click on a link to update his account. 
                  <br />
                  Once the account registration is started, an email is sent asking you to click on a link within the email to complete your registration. 
                  <br />
 
                  <br />
                                    <br />
                  <br />
                  Please click the NEXT TAB TO PROCEED
                  <br />
                  
                  <br />
                  <br />
                </Typography>
              </Grid>{" "}
              <br />
            </Grid>
            <div style={{ padding: "3rem" }}></div>
          </Grid>
          <Navigation
            showBack={false}
            showNext={true}
            nextHandler={nextHandler}
          />
        </>
      )}
    </>
  );
};

export default SectionB;

import authorityImage1 from "../../assets/authority/Age_authority.png";
import authorityImage2 from "../../assets/authority/Alexa_authority.png";
import authorityImage3 from "../../assets/authority/Archive_authority.png";
import authorityImage4 from "../../assets/authority/Domain_authority.png";
import authorityImage5 from "../../assets/authority/HTTPs_authority.png";
import authorityImage6 from "../../assets/authority/Server_authority.png";
import authorityImage7 from "../../assets/authority/URL_authority.png";

import commitmentImage1 from "../../assets/commitment/Age_commitment.png";
import commitmentImage2 from "../../assets/commitment/Alexa_commitment.png";
import commitmentImage3 from "../../assets/commitment/Archive_commitment.png";
import commitmentImage4 from "../../assets/commitment/Domain_commitment.png";
import commitmentImage5 from "../../assets/commitment/HTTPs_commitment.png";
import commitmentImage6 from "../../assets/commitment/Server_commitment.png";
import commitmentImage7 from "../../assets/commitment/URL_commitment.png";

import consensusImage1 from "../../assets/consensus/Age_consensus.png";
import consensusImage2 from "../../assets/consensus/Alexa_consensus.png";
import consensusImage3 from "../../assets/consensus/Archive_consensus.png";
import consensusImage4 from "../../assets/consensus/Domain_consensus.png";
import consensusImage5 from "../../assets/consensus/HTTPs_consensus.png";
import consensusImage6 from "../../assets/consensus/Server_consensus.png";
import consensusImage7 from "../../assets/consensus/URL_consensus.png";

import likingImage1 from "../../assets/liking/Age_liking.png";
import likingImage2 from "../../assets/liking/Alexa_liking.png";
import likingImage3 from "../../assets/liking/Archive_liking.png";
import likingImage4 from "../../assets/liking/Domain_liking.png";
import likingImage5 from "../../assets/liking/HTTPs_liking.png";
import likingImage6 from "../../assets/liking/Server_liking.png";
import likingImage7 from "../../assets/liking/URL_liking.png";

import reciprocityImage1 from "../../assets/reciprocity/Age_reciprocity.png";
import reciprocityImage2 from "../../assets/reciprocity/Alexa_reciprocity.png";
import reciprocityImage3 from "../../assets/reciprocity/Archive_reciprocity.png";
import reciprocityImage4 from "../../assets/reciprocity/Domain_reciprocity.png";
import reciprocityImage5 from "../../assets/reciprocity/HTTPs_reciprocity.png";
import reciprocityImage6 from "../../assets/reciprocity/Server_reciprocity.png";
import reciprocityImage7 from "../../assets/reciprocity/URL_reciprocity.png";

import scarcityImage1 from "../../assets/scarcity/Age_scarcity.png";
import scarcityImage2 from "../../assets/scarcity/Alexa_scarcity.png";
import scarcityImage3 from "../../assets/scarcity/Archive_scarcity.png";
import scarcityImage4 from "../../assets/scarcity/Domain_scarcity.png";
import scarcityImage5 from "../../assets/scarcity/HTTPs_scarcity.png";
import scarcityImage6 from "../../assets/scarcity/Server_scarcity.png";
import scarcityImage7 from "../../assets/scarcity/URL_scarcity.png";
const randomNumber = Math.floor(Math.random() * 6);
const Summary = () => {
  let selection = randomNumber;

  const context = useContext(Context);
  context.setCurrentSection(2);

  const [, setResponses] = useState();

  // 1,2,3 - reciprocity
  const reciprocity = [1, 2, 3];

  // 4,5,6 - scarcity
  const scarcity = [4, 5, 6];

  // 7,8,9 - authority
  const authority = [7, 8, 9];

  // 10,11,12 - commitment
  const commitment = [10, 11, 12];

  // 13,14,15 - consensus
  const consensus = [13, 14, 15];

  // 16,17,18 - liking
  const liking = [16, 17, 18];

  let summary = {
    reciprocity: [],
    scarcity: [],
    authority: [],
    commitment: [],
    consensus: [],
    liking: [],
  };

  useEffect(() => {
    switch (selection) {
      case 0:
        context.setResponses((prev) => {
          return {
            ...prev,
            SelectedPhotos: "Age",
          };
        });
        selection = [
          //age
          reciprocityImage1,
          scarcityImage1,
          authorityImage1,
          commitmentImage1,
          consensusImage1,
          likingImage1,
        ];
        break;
      case 1:
        context.setResponses((prev) => {
          return {
            ...prev,
            SelectedPhotos: "Alexa",
          };
        });
        selection = [
          //alexa
          reciprocityImage2,
          scarcityImage2,
          authorityImage2,
          commitmentImage2,
          consensusImage2,
          likingImage2,
        ];
        break;
      case 2:
        context.setResponses((prev) => {
          return {
            ...prev,
            SelectedPhotos: "Archive",
          };
        });
        selection = [
          //archive
          reciprocityImage3,
          scarcityImage3,
          authorityImage3,
          commitmentImage3,
          consensusImage3,
          likingImage3,
        ];
        break;
      case 3:
        context.setResponses((prev) => {
          return {
            ...prev,
            SelectedPhotos: "Domain",
          };
        });
        selection = [
          //domain
          reciprocityImage4,
          scarcityImage4,
          authorityImage4,
          commitmentImage4,
          consensusImage4,
          likingImage4,
        ];
        break;
      case 4:
        context.setResponses((prev) => {
          return {
            ...prev,
            SelectedPhotos: "HTTPs",
          };
        });
        selection = [
          //https
          reciprocityImage5,
          scarcityImage5,
          authorityImage5,
          commitmentImage5,
          consensusImage5,
          likingImage5,
        ];
        break;
      case 5:
        context.setResponses((prev) => {
          return {
            ...prev,
            SelectedPhotos: "Server",
          };
        });
        selection = [
          //server
          reciprocityImage6,
          scarcityImage6,
          authorityImage6,
          commitmentImage6,
          consensusImage6,
          likingImage6,
        ];
        break;
      case 6:
        context.setResponses((prev) => {
          return {
            ...prev,
            SelectedPhotos: "URL",
          };
        });
        selection = [
          //url
          reciprocityImage7,
          scarcityImage7,
          authorityImage7,
          commitmentImage7,
          consensusImage7,
          likingImage7,
        ];
        break;

      default:
        break;
    }

    context.responses.sectionA.map((item) => {
      if (reciprocity.includes(parseInt(item.key))) {
        summary.reciprocity.push(item.value);
      } else if (scarcity.includes(parseInt(item.key))) {
        summary.scarcity.push(item.value);
      } else if (authority.includes(parseInt(item.key))) {
        summary.authority.push(item.value);
      } else if (commitment.includes(parseInt(item.key))) {
        summary.commitment.push(item.value);
      } else if (consensus.includes(parseInt(item.key))) {
        summary.consensus.push(item.value);
      } else if (liking.includes(parseInt(item.key))) {
        summary.liking.push(item.value);
      }
    });

    let temp = [];

    temp.push(
      summary.reciprocity.reduce((acc, item) => {
        return acc + (parseInt(item) * 100) / 5;
      }, 0)
    );
    temp.push(
      summary.scarcity.reduce((acc, item) => {
        return acc + (parseInt(item) * 100) / 5;
      }, 0)
    );
    temp.push(
      summary.authority.reduce((acc, item) => {
        return acc + (parseInt(item) * 100) / 5;
      }, 0)
    );
    temp.push(
      summary.commitment.reduce((acc, item) => {
        return acc + (parseInt(item) * 100) / 5;
      }, 0)
    );
    temp.push(
      summary.consensus.reduce((acc, item) => {
        return acc + (parseInt(item) * 100) / 5;
      }, 0)
    );
    temp.push(
      summary.liking.reduce((acc, item) => {
        return acc + (parseInt(item) * 100) / 5;
      }, 0)
    );

    var indexOfMaxValue = temp.reduce(
      (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
      0
    );
    var indexOfMinValue = temp.reduce(
      (iMax, x, i, arr) => (x < arr[iMax] ? i : iMax),
      0
    );
    temp = temp.map((element, index) => {
      if (index === indexOfMaxValue) {
        return (element = [element, "limegreen"]);
      } else if (index === indexOfMinValue) {
        return (element = [element, "red"]);
      } else {
        return (element = [element, ""]);
      }
    });

    setResponses({
      reciprocity: temp[0],
      scarcity: temp[1],
      authority: temp[2],
      commitment: temp[3],
      consensus: temp[4],
      liking: temp[5],
    });
    context.setResponses((prev) => {
      prev.summary = {
        reciprocity: (temp[0][0] / 3).toFixed(1),
        scarcity: (temp[1][0] / 3).toFixed(1),
        authority: (temp[2][0] / 3).toFixed(1),
        commitment: (temp[3][0] / 3).toFixed(1),
        consensus: (temp[4][0] / 3).toFixed(1),
        liking: (temp[5][0] / 3).toFixed(1),
      };
      return prev;
    });
    switch (indexOfMaxValue) {
      case 0:
        context.setResponses((prev) => {
          prev.sectionB[0].principle = "reciprocity";
          prev.sectionB[0].image = selection[0];
          return prev;
        });
        break;
      case 1:
        context.setResponses((prev) => {
          prev.sectionB[0].principle = "commitment";
          prev.sectionB[0].image = selection[1];
          return prev;
        });

        break;
      case 2:
        context.setResponses((prev) => {
          prev.sectionB[0].principle = "authority";
          prev.sectionB[0].image = selection[2];
          return prev;
        });

        break;
      case 3:
        context.setResponses((prev) => {
          prev.sectionB[0].principle = "commitment";
          prev.sectionB[0].image = selection[3];
          return prev;
        });

        break;
      case 4:
        context.setResponses((prev) => {
          prev.sectionB[0].principle = "consensus";
          prev.sectionB[0].image = selection[4];
          return prev;
        });

        break;
      case 5:
        context.setResponses((prev) => {
          prev.sectionB[0].principle = "liking";
          prev.sectionB[0].image = selection[5];
          return prev;
        });

        break;

      default:
        break;
    }

    switch (indexOfMinValue) {
      case 0:
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "reciprocity";
          prev.sectionB[1].image = selection[0];
          return prev;
        });
        break;
      case 1:
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "scarcity";
          prev.sectionB[1].image = selection[1];
          return prev;
        });

        break;
      case 2:
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "authority";
          prev.sectionB[1].image = selection[2];
          return prev;
        });

        break;
      case 3:
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "commitment";
          prev.sectionB[1].image = selection[3];
          return prev;
        });

        break;
      case 4:
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "consensus";
          prev.sectionB[1].image = selection[4];
          return prev;
        });

        break;
      case 5:
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "liking";
          prev.sectionB[1].image = selection[5];
          return prev;
        });

        break;

      default:
        break;
    }
    return () => {};
  }, []);

  return (
    <>
      <p></p>
    </>
  );
};
