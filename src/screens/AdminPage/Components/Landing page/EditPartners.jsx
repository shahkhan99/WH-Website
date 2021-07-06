import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Chip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import Label from "../../Common/Label";
import Input from "../../Common/Input";
import Error from "../../Common/Error";
import ImageEditor from "../../Common/ImageEditor";
import MiniInput from "../../Common/MiniInput";
import Loader from "../../Common/TableLoader";
import Joi from "joi-browser";
import closeIcon from "../../assets/Icons/imgClose.png";
import { UploadPartnersLogo } from "../../../../Services/Admin-Service";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
  wrapper: {
    padding: "30px 0px",
  },
  addButton: {
    margin: "5px 0px 0px 10px",
    height: "55px",
  },
  Chip: {
    margin: "5px 10px 5px 0px",
  },
  variantWrapper: {
    paddingTop: 10,
    margin: "5px 10px 5px 0px",
    width: 400,
    borderRadius: 16,
    border: "1px solid #c4c4c4",
  },
  sizesWrapper: {
    padding: "10px 0px",
    margin: "5px 10px 20px 0px",
    width: 400,
    borderRadius: 16,
    border: "1px solid #c4c4c4",
  },
  text: {
    fontSize: 15,
  },
  content: {
    fontSize: 15,
    padding: "7px 0px",
  },
  selectedImages: {
    width: 170,
    height: 170,
    borderRadius: "4px",
    marginRight: 20,
  },
  closeIcon: {
    cursor: "pointer",
    width: 20,
    position: "absolute",
    margin: "5px 0px 0px 145px",
  },
}));

const EditPartners = ({ editData }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    editData
      ? { companyName: editData.companyName, images: editData.images }
      : {}
  );
  const [error, setError] = useState({});

  let Editor = useRef(null);

  const setEditorRef = (canvas) => {
    Editor = canvas;
  };

  const getImage = () => {
    return new Promise((resolve, reject) => {
      const canvas = Editor.getImageScaledToCanvas().toDataURL();
      fetch(canvas)
        .then((res) => res.blob())
        .then((blob) => resolve(blob));
    });
  };

  const schema = {
    memberName: Joi.string().required(),
    companyName: Joi.string().required(),
    images: Joi.array().min(1).required(),
  };

  const validate = () => {
    const result = Joi.validate(data, schema, { abortEarly: false });

    if (!result.error) return null;

    const newError = {};
    result.error.details.map((err) => {
      return (newError[err.path[0]] = err.message);
    });

    return newError;
  };

  const onChange = (event) => {
    const { id, value } = event.target;
    let temp = { ...data };
    temp[id] = value;
    setData(temp);
  };

  const handleSubmit = (event) => {
    console.log(data);
    setError(validate());
  };

  const AddNewPartner = async () => {
    setLoading(true);

    const { companyName, images } = data;
    const product = { companyName, images };

    UploadPartnersLogo({ id: editData.id, data: product }).then(() =>
      window.open("/@dm!n?NewPartners=true", "_self")
    );
  };

  const AddImageToProduct = async () => {
    const temp = { ...data };
    if (temp.images) {
      temp.images.push(await getImage());
    } else {
      temp.images = [await getImage()];
    }
    setData(temp);
  };

  const onClickRemoveImage = (index) => {
    const temp = { ...data };
    temp.images.splice(index, 1);
    setData(temp);
  };

  useEffect(() => {
    if (data.companyName && !error) AddNewPartner();
  }, [error]);

  const classes = useStyles();
  return (
    <div>
      {loading ? (
        <div className={classes.wrapper}>
          <Typography className={classes.heading}>Edit Course:</Typography>
          <br />
          <Typography
            variant="body1"
            style={{ textAlign: "center", margin: "40px 0px 40px 10px" }}
          >
            Please Wait ..
          </Typography>
          <Loader />
        </div>
      ) : (
        <div className={classes.wrapper}>
          <Typography className={classes.heading}>Edit Community:</Typography>
          <br />

          <Label title="Company Name" />
          <Input
            id="companyName"
            label="Company Name"
            value={data.companyName}
            placeholder="Company Name"
            handleChange={onChange}
          />
          {error && error.companyName && <Error text={error.companyName} />}
          <br />
          <br />

          <Label title="Image" />
          <ImageEditor
            AddImageToProduct={AddImageToProduct}
            setEditorRef={setEditorRef}
          />
          <br />
          {data.images && data.images.length > 0 && (
            <Grid container direction="row">
              {data.images.map((item, index) => (
                <div>
                  <img
                    src={closeIcon}
                    onClick={(e) => onClickRemoveImage(index)}
                    className={classes.closeIcon}
                  />
                  <img
                    src={
                      typeof item === "string"
                        ? item
                        : window.URL.createObjectURL(item)
                    }
                    className={classes.selectedImages}
                  />
                </div>
              ))}
            </Grid>
          )}
          {error && error.images && <Error text={error.images} />}
          <br />
          <br />

          <Button color="primary" onClick={handleSubmit} variant="contained">
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditPartners;
