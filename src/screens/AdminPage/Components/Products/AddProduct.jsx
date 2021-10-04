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
import { CreateProduct } from "../../../../Services/Admin-Service";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [productVariant, setProductVariant] = useState([]);
  const [productVariantData, setProductVariantData] = useState(null);
  const [productVariantOptionData, setProductVariantOptionData] = useState([]);

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
    icons: Joi.string().required(),
    short_name: Joi.string().required(),
    long_name: Joi.string().required(),
    short_description: Joi.string().required(),
    long_description: Joi.string().required(),
    price: Joi.number().required(),
    images: Joi.array().min(1).required(),
    no_students: Joi.number().required(),
    no_sessions: Joi.number().required(),
    duration: Joi.number().required(),
    intro_link: Joi.string().required(),
    forWho: Joi.string().required(),
    s_date: Joi.string().required(),
    r_deadline: Joi.string().required(),
    tutorname: Joi.string().required(),
    t_qualification: Joi.string().required(),
    t_details: Joi.string().required(),
    t_linkedin: Joi.string().required(),
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

  const handleVariantAdd = (event) => {
    const value = productVariantData;
    if (value && value !== "") {
      const temp = productVariant.slice();
      temp.push({ name: value, Options: [] });
      setProductVariant(temp);
      document.getElementById("productVariant").value = "";
    }
  };

  const handleVariantOptionChange = (event, index) => {
    const { id, value } = event.target;
    if (index <= 9) {
      const idFixed = id.slice(0, -1);
      const Temp = productVariantOptionData.slice();
      const data = { ...(Temp[index] || {}) };
      data[idFixed] = value;
      Temp[index] = data;
      setProductVariantOptionData(Temp);
    } else if (index > 9) {
      const idFixed = id.slice(0, -2);
      const Temp = productVariantOptionData.slice();
      const data = { ...(Temp[index] || {}) };
      data[idFixed] = value;
      Temp[index] = data;
      setProductVariantOptionData(Temp);
    }
  };

  const handleAddVariantOption = (index) => {
    const temp = productVariant.slice();
    const OptArray = temp[index].Options;
    OptArray.push(productVariantOptionData[index]);
    temp[index].Options = OptArray;
    setProductVariant(temp);
    document.getElementById(`content${index}`).value = "";
  };

  const onRemoveVariantOption = (index, subIndex) => {
    let temp = productVariant.slice();
    let OptArray = temp[index].Options.slice();
    OptArray.splice(subIndex, 1);
    temp[index].Options = OptArray;
    setProductVariant(temp);
  };

  const handleSubmit = (event) => {
    setError(validate());
  };

  const AddNewProduct = async () => {
    setLoading(true);

    const {
      icons,
      short_name,
      long_name,
      short_description,
      long_description,
      price,
      forWho,
      no_students,
      no_sessions,
      duration,
      s_date,
      r_deadline,
      intro_link,
      tutorname,
      t_qualification,
      t_details,
      t_linkedin,
      images,
    } = data;
    const product = {
      icons,
      short_name,
      long_name,
      short_description,
      long_description,
      price,
      forWho,
      no_students,
      no_sessions,
      duration,
      s_date,
      r_deadline,
      intro_link,
      tutorname,
      t_qualification,
      t_details,
      t_linkedin,
      images,
    };

    const tempVariant = [];
    if (productVariant.length > 0) {
      for (let x = 0; x < productVariant.length; x++) {
        if (productVariant[x].Options.length > 0)
          tempVariant.push(productVariant[x]);
      }
      if (tempVariant.length > 0) product.productVariant = tempVariant;
    }

    CreateProduct({ data: product }).then(() =>
      window.open("/@dm!n?NewProduct=true", "_self")
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
    if (data.short_name && data.price && !error) AddNewProduct();
  }, [error]);

  const classes = useStyles();
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.wrapper}>
          <h1>Course Details:</h1>
          <br />

          <Label title="Icon Name" />
          <Input
            id="icons"
            label="ex: (fab fa-wordpress, faMicrophoneAlt etc.)"
            placeholder="ex: (faWordpress, faMicrophoneAlt etc.)"
            handleChange={onChange}
          />

          {error && error.icons && <Error text={error.icons} />}
          <a href="https://fontawesome.com/icons/" target="_blank">
            Find Your Icons here..
          </a>
          <br />
          <br />

          <Label title="Short Name" />
          <Input
            id="short_name"
            label="Short Name"
            placeholder="Short Name"
            handleChange={onChange}
          />
          {error && error.short_name && <Error text={error.short_name} />}
          <br />
          <br />
          <Label title="Long Name" />
          <Input
            id="long_name"
            label="Long Name"
            placeholder="Long Name"
            handleChange={onChange}
          />
          {error && error.long_name && <Error text={error.long_name} />}
          <br />
          <br />

          <Label title="Short Description" />
          <Input
            id="short_description"
            label="Short Description"
            multiline
            placeholder="Short Description"
            handleChange={onChange}
          />
          {error && error.short_description && (
            <Error text={error.short_description} />
          )}
          <br />
          <br />

          <Label title="Long Description" />
          <Input
            id="long_description"
            label="Long Description"
            multiline
            placeholder="Long Description"
            handleChange={onChange}
          />
          {error && error.long_description && (
            <Error text={error.long_description} />
          )}
          <br />
          <br />

          <Label title="Price" />
          <Input
            id="price"
            label="Course Price"
            placeholder="Course Price"
            handleChange={onChange}
          />
          {error && error.price && <Error text={error.price} />}
          <br />
          <br />

          <Label title="Who is for?" />
          <Input
            id="forWho"
            label="Who is for?"
            multiline
            placeholder="Who is for?"
            handleChange={onChange}
          />
          {error && error.forWho && <Error text={error.forWho} />}
          <br />
          <br />

          <Label title="Course Intro Link" />
          <Input
            id="intro_link"
            label="Intro Link"
            placeholder="Youtube Link"
            handleChange={onChange}
          />
          {error && error.intro_link && <Error text={error.intro_link} />}
          <br />
          <br />

          <Label title="Numbers of sessions" />
          <Input
            id="no_sessions"
            label="Number of Sessions"
            placeholder=""
            handleChange={onChange}
          />
          {error && error.no_sessions && <Error text={error.no_sessions} />}
          <br />
          <br />

          <Label title="Numbers of Students Enroll" />
          <Input
            id="no_students"
            label="Number of Students"
            placeholder=""
            handleChange={onChange}
          />
          {error && error.no_students && <Error text={error.no_students} />}
          <br />
          <br />

          <Label title="Course Duration" />
          <Input
            id="duration"
            label="Course Duration"
            placeholder="Number of weeks"
            handleChange={onChange}
          />
          {error && error.duration && <Error text={error.duration} />}
          <br />
          <br />

          <Label title="Start Date" />
          <Input
            id="s_date"
            label=""
            type="date"
            placeholder="Start Date"
            handleChange={onChange}
          />
          {error && error.s_date && <Error text={error.s_date} />}
          <br />
          <br />

          <Label title="Registration Deadline" />
          <Input
            id="r_deadline"
            label=""
            type="date"
            placeholder="Registration Date"
            handleChange={onChange}
          />
          {error && error.r_deadline && <Error text={error.r_deadline} />}
          <br />
          <br />

          <Label title="Course Outline" />
          <Grid container direction="row">
            <Input
              id="productVariant"
              label="(eg: Introduction to wordpress)"
              handleChange={(e) => setProductVariantData(e.target.value)}
            />
            <Button
              className={classes.addButton}
              onClick={handleVariantAdd}
              variant="outlined"
              color="primary"
            >
              Add
            </Button>
          </Grid>
          {productVariant.length > 0 && (
            <Grid container direction="row">
              {productVariant.map((item, index) => (
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
                    <Typography className={classes.text}>
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    xs={9}
                  >
                    <Grid container direction="row">
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        xs={8}
                      >
                        <MiniInput
                          id={`content${index}`}
                          placeholder="Point"
                          handleChange={(e) =>
                            handleVariantOptionChange(e, index)
                          }
                        />
                      </Grid>
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        xs={4}
                      >
                        <Button
                          onClick={(e) => handleAddVariantOption(index)}
                          color="primary"
                          variant="outlined"
                        >
                          Add
                        </Button>
                      </Grid>
                    </Grid>
                    {item.Options.map((subItem, subIndex) => (
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
                        <Grid
                          container
                          direction="column"
                          justify="center"
                          alignItems="center"
                          xs={4}
                        >
                          <Typography
                            onClick={(e) =>
                              onRemoveVariantOption(index, subIndex)
                            }
                            className={classes.content}
                            style={{ cursor: "pointer" }}
                          >
                            x
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
          <br />

          {/* Teacher Form */}
          <h1>Tutor Details:</h1>
          <Label title="Tutor Name" />
          <Input
            id="tutorname"
            label="Tutor name"
            placeholder="Tutor name"
            handleChange={onChange}
          />
          {error && error.tutorname && <Error text={error.tutorname} />}
          <br />
          <br />

          <Label title="Tutor Qualification" />
          <Input
            id="t_qualification"
            label="Tutor Qualification"
            placeholder="Tutor Qualification"
            handleChange={onChange}
          />
          {error && error.t_qualification && (
            <Error text={error.t_qualification} />
          )}
          <br />
          <br />

          <Label title="Tutor Details" />
          <Input
            id="t_details"
            label="Tutor details"
            multiline
            placeholder="Tutor details"
            handleChange={onChange}
          />
          {error && error.t_details && <Error text={error.t_details} />}
          <br />
          <br />

          <Label title="Tutor's Linked" />
          <Input
            id="t_linkedin"
            label="Profile Link"
            placeholder="Profile Link"
            handleChange={onChange}
          />
          {error && error.t_linkedin && <Error text={error.t_linkedin} />}
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
            Add Course
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
