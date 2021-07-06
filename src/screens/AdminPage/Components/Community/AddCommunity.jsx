import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Chip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import Label from "../../Common/Label";
import Input from "../../Common/Input";
import Error from "../../Common/Error";
import ImageEditor from "../../Common/ImageEditor";
import MiniInput from "../../Common/MiniInput";
import Loader from "../../../Common/Loader";
import DropDown from "../../Common/DropDown";
import Joi from "joi-browser";
import closeIcon from "../../assets/Icons/imgClose.png";
import { CreateCommunity } from "../../../../Services/Admin-Service";

const useStyles = makeStyles((theme) => ({
  Heading: {
    textTransform: "uppercase",
    fontSize: "17px",
    fontWeight: 700,
  },
  wrapper: {
    padding: "20px 40px",
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
  formControl: {
    width: "38%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const AddCommunity = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
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
    let temp = data;
    temp[id] = value;
    setData(temp);
    console.log(data);
  };

  const handleSubmit = (event) => {
    setError(validate());
  };

  const AddNewCommunity = async () => {
    setLoading(true);

    const { memberName, companyName, images } = data;
    const product = { memberName, companyName, images };
    CreateCommunity({ data: product }).then(() =>
      window.open("/@dm!n?NewCommunity=true", "_self")
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
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    let temp = data;
    temp["category"] = event.target.value;
    setData(temp);
    console.log(data);
  };

  useEffect(() => {
    if (data.memberName && data.companyName && !error) AddNewCommunity();
  }, [error]);

  const classes = useStyles();
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.wrapper}>
          <h1>Community Informations:</h1>
          <br />

          <Label title="Member Name" />
          <Input
            id="memberName"
            label="Member Name"
            placeholder="Member Name"
            handleChange={onChange}
          />

          {error && error.memberName && <Error text={error.memberName} />}
          <br />
          <br />

          <Label title="Company Name" />
          <Input
            id="companyName"
            label="Company Name"
            placeholder="Company Name"
            handleChange={onChange}
          />
          {error && error.companyName && <Error text={error.companyName} />}
          <br />
          <br />
          <Label title="Image" />
          <p>
            Select three images(1st for header, 2nd for Course Details and 3rd
            one is tutor image)
          </p>
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
                    src={window.URL.createObjectURL(item)}
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
            Add Community
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddCommunity;
