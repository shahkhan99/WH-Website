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
import { UpdateBlog } from "../../../../Services/Admin-Service";

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

const EditBlogs = ({ editData }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    editData
      ? {
          heading: editData.heading,
          images: editData.images,
          writtenBy: editData.writtenBy,
        }
      : {}
  );
  const [error, setError] = useState({});
  const [blog, setblog] = useState(
    editData && editData.blog ? editData.blog : []
  );
  const [blogData, setblogData] = useState(null);
  const [bestFor, setBestFor] = useState(
    editData && editData.bestFor ? editData.bestFor : []
  );
  const [bestForData, setBestForData] = useState(null);

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
    heading: Joi.string().required(),
    images: Joi.array().min(1).required(),
    writtenBy: Joi.string().required(),
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
  const handleTagAdd = (event) => {
    if (bestForData && bestForData !== "") {
      const temp = bestFor.slice();
      temp.push(bestForData);
      setBestFor(temp);
      setBestForData(null);
      document.getElementById("bestFor").value = "";
    }
  };

  const handleRemoveTag = (index) => {
    const temp = bestFor.slice();
    temp.splice(index, 1);
    setBestFor(temp);
  };
  const handleCareAdd = (event) => {
    if (blogData && blogData !== "") {
      const temp = blog.slice();
      temp.push(blogData);
      setblog(temp);
      setblogData(null);
      document.getElementById("blog").value = "";
    }
  };
  const handleEditAnswer = (index) => {
    blog[index] = document.getElementById(`editBlog${index}`).value;
    setblog(blog);
  };
  const handleRemoveCare = (index) => {
    const temp = blog.slice();
    temp.splice(index, 1);
    setblog(temp);
  };
  const handleSubmit = (event) => {
    console.log(data);
    setError(validate());
  };

  const AddNewCommunity = async () => {
    setLoading(true);

    const { heading, images, writtenBy } = data;
    const product = { heading, images, writtenBy };
    if (blog.length > 0) product.blog = blog;
    if (bestFor.length > 0) product.bestFor = bestFor;

    UpdateBlog({ id: editData.id, data: product }).then(() =>
      window.open("/@dm!n?NewBlog=true", "_self")
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
    if (data.heading && !error) AddNewCommunity();
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
          <Typography className={classes.heading}>Edit Blogs:</Typography>
          <br />

          <Label title="Heading" />
          <Input
            id="heading"
            label="Heading"
            value={data.heading}
            placeholder="Heading"
            handleChange={onChange}
          />

          {error && error.heading && <Error text={error.heading} />}

          <br />
          <br />
          <Label title="writtenBy" />
          <Input
            id="writtenBy"
            label="writtenby"
            value={data.writtenBy}
            placeholder="writtenBy"
            handleChange={onChange}
          />

          {error && error.writtenBy && <Error text={error.writtenBy} />}

          <br />
          <br />

          <Label title="Blog:" />
          <Grid container direction="row">
            <Input
              id="blog"
              label="Blog"
              handleChange={(e) => setblogData(e.target.value)}
            />
            <Button
              className={classes.addButton}
              onClick={handleCareAdd}
              variant="outlined"
              color="primary"
            >
              Add Para
            </Button>
          </Grid>
          {blog.length > 0 && (
            <Grid container direction="column">
              {blog.map((item, index) => {
                return (
                  <Grid container direction="row">
                    <Input
                      type="text"
                      id={`editBlog${index}`}
                      multiline
                      variant="outlined"
                      defaultValue={item}
                    />
                    <div className={classes.Input}>
                      <Button
                        className={classes.addButton}
                        onClick={() => handleEditAnswer(index)}
                        variant="outlined"
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        className={classes.addButton}
                        onClick={(e) => handleRemoveCare(index)}
                        variant="outlined"
                        color="primary"
                      >
                        Delete
                      </Button>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          )}

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
          <Label title="Tags" />
          <Grid container direction="row">
            <Input
              id="bestFor"
              label="Tags"
              handleChange={(e) => setBestForData(e.target.value)}
            />
            <Button
              className={classes.addButton}
              onClick={handleCareAdd}
              variant="outlined"
              color="primary"
            >
              Add
            </Button>
          </Grid>
          {bestFor.length > 0 && (
            <Grid container direction="row">
              {bestFor.map((item, index) => {
                return (
                  <Chip
                    className={classes.Chip}
                    avatar={<DoneIcon />}
                    label={item}
                    onDelete={(e) => handleRemoveCare(index)}
                    variant="outlined"
                  />
                );
              })}
            </Grid>
          )}
          <br />

          <Button color="primary" onClick={handleSubmit} variant="contained">
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditBlogs;
