import React from "react";
import { Grid, Typography, Chip, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: "30px 0px",
  },
  sizesWrapper: {
    padding: "10px 0px",
    margin: "5px 10px 20px 0px",
    width: 400,
    borderRadius: 16,
    border: "1px solid #c4c4c4",
  },
  Chip: {
    width: "min-content",
    margin: "5px 10px 2px 0px",
  },
  variantWrapper: {
    padding: "10px 0px",
    margin: "5px 10px 5px 0px",
    width: 400,
    borderRadius: 16,
    border: "1px solid #c4c4c4",
  },
  heading: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
  selectedImages: {
    width: 170,
    height: 170,
    borderRadius: "4px",
    marginRight: 20,
  },
}));

const ProductDetails = ({ data, onEdit }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.wrapper} container direction="column">
      <h1 className={classes.heading}>Course Details:</h1>
      <br />

      <Typography className={classes.heading}>Icon Name</Typography>
      <Typography variant="body1">{data.icons}</Typography>
      <br />

      <Typography className={classes.heading}>Short Name</Typography>
      <Typography variant="body1">{data.short_name}</Typography>
      <br />

      <Typography className={classes.heading}>Long Name</Typography>
      <Typography variant="body1">{data.long_name}</Typography>
      <br />

      <Typography className={classes.heading}>Short Description</Typography>
      <Typography variant="body1">{data.short_description}</Typography>
      <br />

      <Typography className={classes.heading}>Long Description</Typography>
      <Typography variant="body1">{data.long_description}</Typography>
      <br />

      <Typography className={classes.heading}>Price</Typography>
      <Typography variant="body1">Rs. {data.price}</Typography>
      <br />

      <Typography className={classes.heading}>Who is for?</Typography>
      <Typography variant="body1">{data.forWho}</Typography>
      <br />

      <Typography className={classes.heading}>Course Duration</Typography>
      <Typography variant="body1">{data.duration}</Typography>
      <br />

      <Typography className={classes.heading}>Number of Students</Typography>
      <Typography variant="body1">{data.no_students}</Typography>
      <br />

      <Typography className={classes.heading}>Number of Sessions</Typography>
      <Typography variant="body1">{data.no_sessions}</Typography>
      <br />

      <Typography className={classes.heading}>
        Introduction's Video Link(Youtube)
      </Typography>
      <Typography variant="body1">{data.intro_link}</Typography>
      <br />

      <Typography className={classes.heading}>Course Start Date</Typography>
      <Typography variant="body1">{data.s_date}</Typography>
      <br />

      <Typography className={classes.heading}>Registration Deadline</Typography>
      <Typography variant="body1">{data.r_deadline}</Typography>
      <br />

      <h1 className={classes.heading}>Tutor's Details:</h1>
      <br />

      <Typography className={classes.heading}>Tutor Name</Typography>
      <Typography variant="body1">{data.tutorname}</Typography>
      <br />

      <Typography className={classes.heading}>Tutor Qualification</Typography>
      <Typography variant="body1">{data.t_qualification}</Typography>
      <br />

      <Typography className={classes.heading}>Description</Typography>
      <Typography variant="body1">{data.t_details}</Typography>
      <br />

      <Typography className={classes.heading}>LinkedIn Link</Typography>
      <Typography variant="body1">{data.t_linkedin}</Typography>
      <br />

      {data.productVariant && (
        <div>
          <Typography className={classes.heading}>Product Variants</Typography>
          <Grid container direction="column">
            {data.productVariant.map((item) => (
              <Grid
                className={classes.variantWrapper}
                container
                direction="row"
              >
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  style={{
                    margin: "20px 0px",
                    borderRight: "1px solid #c4c4c4",
                  }}
                  xs={3}
                >
                  <Typography className={classes.text}>{item.name}</Typography>
                </Grid>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  xs={9}
                >
                  {item.Options.map((subItem) => (
                    <Grid container direction="row">
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        xs={8}
                      >
                        <Typography className={classes.content}>
                          {subItem.content}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
          <br />
        </div>
      )}

      <Typography className={classes.heading}>Course Images</Typography>
      <Grid container direction="row">
        {data.images.map((item) => (
          <div>
            <img src={item} className={classes.selectedImages} />
          </div>
        ))}
      </Grid>
      <br />
      <br />

      <Button
        color="primary"
        style={{ padding: "10px 20px", width: 150 }}
        onClick={onEdit}
        variant="contained"
      >
        Edit Course
      </Button>
    </Grid>
  );
};

export default ProductDetails;
