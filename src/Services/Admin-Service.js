import firebase, { firestore, storage, database } from "../backend/config";
import axios from "axios";
import { keyframes } from "@emotion/core";
import { data } from "jquery";
import { resolve } from "joi-browser";
const randomName = require("uuid/v4");

const UploadImage = ({ Files, name }) => {
  return new Promise((resolve, reject) => {
    let Task = [];
    let allImages = [];

    Files.forEach((item) => {
      if (typeof item === "string") {
        allImages.push(item);
      } else {
        Task.push(
          new Promise((resolve, reject) => {
            const fileName = randomName();
            let folderName = `Product-Images/${name}`;

            //-------------------Create the file metadata---------------------------------------------
            const metadata = {
              contentType: "image/png",
            };

            //-------------------Upload file and metadata to the object 'images/mountains.jpg'--------
            const storageRef = storage.ref(`${folderName}/` + fileName);
            const uploadTask = storageRef.put(item, metadata);

            //-------------------Listen for state changes, errors, and completion of the upload-------
            uploadTask.on(
              "state_changed",
              function (snapshot) {
                //-------------------Upload Progress------------------------------------------------------
                //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //     console.log('Upload is '   progress   '% done');
              },
              function (error) {
                reject(error);
              },
              function () {
                //-------------------Upload completed successfully-----------------------------------------
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                  allImages.push(url);
                  resolve(url);
                });
              }
            );
          })
        );
      }
    });

    Promise.all(Task).then(() => resolve(allImages));
  });
};

//---------------------------------  PRICES OPERATIONS  --------------------------------

// export const GetShipmentPrices = () => {
//     return new Promise((resolve, reject) => {

//         firestore.collection('Shipment-Prices').get()
//             .then(collection => {

//                 let temp = collection.docs[0].data();
//                 temp.id = collection.docs[0].id;

//                 resolve(temp)
//             })
//     })
// }

// export const CreateShipmentPrices = ({ data }) => {
//     return new Promise((resolve, reject) => {
//         firestore.collection('Shipment-Prices').add(data).then(doc => {
//             resolve(doc.id);
//         })
//     })
// }

// export const ModifyShipmentPrices = ({ id, data }) => {
//     return new Promise((resolve, reject) => {
//         firestore.collection('Shipment-Prices').doc(id).update(data)
//             .then(doc => resolve(true));
//     })
// }
//---------------------------------  Merch form OPERATIONS  -------------------------------

export const formupdate = ({ data }) => {
  return new Promise((resolve, reject) => {
    console.log(data, "dffgfc");
    data.createOn = new Date();
    firestore
      .collection("MerchOrder")
      .add(data)
      .then((doc) => {
        console.log(doc.id);
        firestore
          .collection(`MerchOrder`)
          .doc(doc.id)
          .update({ orderID: doc.id });
        resolve(doc.id);
      });
  });
};
//--------------------------------- Merchorder Operation------------------------------

export const Getallorder = () => {
  return new Promise((resolve, reject) => {
    let allOrders = [];
    var list = [];

    firestore
      .collection("MerchOrder")
      .orderBy("createOn", "desc")
      .get()
      .then((collection) => {
        for (let x = 0; x < collection.docs.length; x++) {
          let temp = collection.docs[x].data();
          allOrders.push(temp);
        }
        console.log(allOrders, "asdaf");
        resolve(allOrders);
        // resolve(allorder)
      });
  });
};
export const DeleteOneOrder = ({ orderID }) => {
  console.log(orderID);
  return firestore.collection("MerchOrder").doc(orderID).delete();
};

//---------------------------------  Course OPERATIONS  -------------------------------

export const CreateProduct = ({ data }) => {
  return new Promise((resolve, reject) => {
    UploadImage({ Files: data.images, name: data.short_name }).then(
      (ImgURLs) => {
        data.images = ImgURLs;
        data.createdOn = new Date();
        let key = data.long_name;
        key = key.replace(/\s+/g, "-");
        console.log(keyframes);
        firestore
          .collection("Courses")
          .doc(key)
          .set(data)
          .then((doc) => {
            resolve(key);
          });
      }
    );
  });
};

export const GetOneProduct = ({ id }) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("Courses")
      .doc(id)
      .get()
      .then((doc) => {
        let temp = doc.data();
        temp.id = doc.id;

        resolve(temp);
      });
  });
};

export const GetAllProducts = (category) => {
  return new Promise((resolve, reject) => {
    console.log(category);
    let allProducts = [];
    var list = [];

    firestore
      .collection("Courses")
      .orderBy("createdOn", "desc")
      .get()
      .then((collection) => {
        for (let x = 0; x < collection.docs.length; x++) {
          let temp = collection.docs[x].data();
          temp.id = collection.docs[x].id;
          allProducts.push(temp);
        }
        allProducts &&
          allProducts.forEach((item) => {
            if (item.category === category || category === "all") {
              list.push(item);
            }
          });
        resolve(list);
        // resolve(allProducts)
      });
  });
};

export const UpdateProduct = ({ id, data }) => {
  return new Promise((resolve, reject) => {
    UploadImage({ Files: data.images, name: data.short_name }).then(
      (ImgURLs) => {
        data.images = ImgURLs;

        firestore
          .collection("Courses")
          .doc(id)
          .update(data)
          .then((doc) => {
            resolve(1);
          });
      }
    );
  });
};

export const DeleteOneProduct = ({ id }) => {
  console.log(id);
  return firestore.collection("Courses").doc(id).delete();
};

//---------------------------------  ORDERS OPERATIONS  ------------------------------------

// export const GetOrders = ({ status }) => {
//     return new Promise((resolve, reject) => {

//         let allOrders = [];

//         firestore.collection('Orders').where('status', '==', status).orderBy('createdOn', 'desc').get()
//             .then(collection => {

//                 for (let x = 0; x < collection.docs.length; x++) {
//                     let temp = collection.docs[x].data();
//                     temp.id = collection.docs[x].id;
//                     allOrders.push(temp);
//                 }

//                 resolve(allOrders)
//             })
//     })
// }

// export const ModifyStatus = ({ id, status }) => {
//     return new Promise((resolve, reject) => {

//         firestore.collection('Orders').doc(id).update({ status })
//             .then(() => resolve(true))

//     })
// }

// export const CreateOrder = ({data}) => {
//     return new Promise((resolve, reject) => {

//         let count = 0;
//         firestore.collection('Orders').get().then(snap => {
//             let id = '';
//             count = snap.docs.length + 1;

//             if (count<10) id = `10000${count}`;
//             if (count>9 && count<100) id = `1000${count}`;
//             if (count>99 && count<1000) id = `100${count}`;
//             if (count>999 && count<10000) id = `10${count}`;
//             if (count>9999 && count<100000) id = `1${count}`;
//             if (count>99999 && count<1000000) id = `${count}`;

//             firestore.collection('Orders').doc(id).set(data).then(() =>{
//                 sendEmails(data,id)
//                 .then(res=>{
//                     resolve(id)
//                 })
//                 .catch(err=>resolve(false))
//             });

//         })

//     })
// }

// const sendEmails=(data,orderID)=>{
//     return new Promise((resolve,reject)=>{
//         axios.post('https://us-central1-bina-sohail.cloudfunctions.net/NewBookingMailForAdmin',{name:data.user.name,orderID})
//         .then(res=>{
//             var temp="<hr/>"
//             data.products.forEach((item,index)=>{
//                 temp+=`
//                 <b>Product Name :</b> ${item.name}<br/>
//                 <b>Quantity :</b> ${item.quantity}<br/>
//                 <b>Size :</b> ${item.size}<br/>
//                 <b>Price :</b> ${item.price*item.quantity}<br/><hr/>
//                 `
//             })
//             axios.post('https://us-central1-bina-sohail.cloudfunctions.net/BookingEmailForCustomer',{email:data.user.email,name:data.user.name,products:temp,totalPrice:data.totalPrice,gst:data.gst,orderID:orderID})
//             .then(res1=>{
//                 resolve(true)
//             })
//             .catch(err1=>resolve(false))
//         })
//         .catch(err=>resolve(false))
//     })
// }

//--------------------------------- Partners------------------------------------------
export const UploadPartnersLogo = ({ Files, name }) => {
  return new Promise((resolve, reject) => {
    let Task = [];
    let allImages = [];

    Files.forEach((item) => {
      if (typeof item === "string") {
        allImages.push(item);
      } else {
        Task.push(
          new Promise((resolve, reject) => {
            const fileName = randomName();
            let folderName = `Partners-Logo/${name}`;

            //-------------------Create the file metadata---------------------------------------------
            const metadata = {
              contentType: "image/png",
            };

            //-------------------Upload file and metadata to the object 'images/mountains.jpg'--------
            const storageRef = storage.ref(`${folderName}/` + fileName);
            const uploadTask = storageRef.put(item, metadata);

            //-------------------Listen for state changes, errors, and completion of the upload-------
            uploadTask.on(
              "state_changed",
              function (snapshot) {
                //-------------------Upload Progress------------------------------------------------------
                //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //     console.log('Upload is '   progress   '% done');
              },
              function (error) {
                reject(error);
              },
              function () {
                //-------------------Upload completed successfully-----------------------------------------
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                  allImages.push(url);
                  resolve(url);
                });
              }
            );
          })
        );
      }
    });

    Promise.all(Task).then(() => resolve(allImages));
  });
};

export const CreatePartnersLogo = ({ data }) => {
  return new Promise((resolve, reject) => {
    UploadPartnersLogo({ Files: data.images, name: data.companyName }).then(
      (ImgURLs) => {
        data.images = ImgURLs;
        data.createdOn = new Date();

        firestore
          .collection("Partners")
          .add(data)
          .then((doc) => {
            resolve(doc.id);
          });
      }
    );
  });
};
export const GetOnePartner = ({ id }) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("Partners")
      .doc(id)
      .get()
      .then((doc) => {
        let temp = doc.data();
        temp.id = doc.id;

        resolve(temp);
      });
  });
};

export const GetAllPartner = (category) => {
  return new Promise((resolve, reject) => {
    console.log(category);
    let allCommunity = [];
    var list = [];

    firestore
      .collection("Partners")
      .orderBy("createdOn", "asc")
      .get()
      .then((collection) => {
        for (let x = 0; x < collection.docs.length; x++) {
          let temp = collection.docs[x].data();
          temp.id = collection.docs[x].id;
          allCommunity.push(temp);
        }
        allCommunity &&
          allCommunity.forEach((item) => {
            if (item.category === category || category === "all") {
              list.push(item);
            }
          });
        resolve(list);
        // resolve(allProducts)
      });
  });
};

export const UpdatePartner = ({ id, data }) => {
  return new Promise((resolve, reject) => {
    UploadPartnersLogo({ Files: data.images, name: data.companyName }).then(
      (ImgURLs) => {
        data.images = ImgURLs;

        firestore
          .collection("Partners")
          .doc(id)
          .update(data)
          .then((doc) => {
            resolve(1);
          });
      }
    );
  });
};
export const DeleteOnePartners = ({ id }) => {
  console.log(id);
  return firestore.collection("Partners").doc(id).delete();
};

// ---------------------------------Community------------------------------------------

const UploadCommunityImage = ({ Files, name }) => {
  return new Promise((resolve, reject) => {
    let Task = [];
    let allImages = [];

    Files.forEach((item) => {
      if (typeof item === "string") {
        allImages.push(item);
      } else {
        Task.push(
          new Promise((resolve, reject) => {
            const fileName = randomName();
            let folderName = `Community-Image/${name}`;

            //-------------------Create the file metadata---------------------------------------------
            const metadata = {
              contentType: "image/png",
            };

            //-------------------Upload file and metadata to the object 'images/mountains.jpg'--------
            const storageRef = storage.ref(`${folderName}/` + fileName);
            const uploadTask = storageRef.put(item, metadata);

            //-------------------Listen for state changes, errors, and completion of the upload-------
            uploadTask.on(
              "state_changed",
              function (snapshot) {
                //-------------------Upload Progress------------------------------------------------------
                //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //     console.log('Upload is '   progress   '% done');
              },
              function (error) {
                reject(error);
              },
              function () {
                //-------------------Upload completed successfully-----------------------------------------
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                  allImages.push(url);
                  resolve(url);
                });
              }
            );
          })
        );
      }
    });

    Promise.all(Task).then(() => resolve(allImages));
  });
};

export const CreateCommunity = ({ data }) => {
  return new Promise((resolve, reject) => {
    UploadCommunityImage({ Files: data.images, name: data.memberName }).then(
      (ImgURLs) => {
        data.images = ImgURLs;
        data.createdOn = new Date();

        firestore
          .collection("Community")
          .add(data)
          .then((doc) => {
            resolve(doc.id);
          });
      }
    );
  });
};

export const GetOneCommunity = ({ id }) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("Community")
      .doc(id)
      .get()
      .then((doc) => {
        let temp = doc.data();
        temp.id = doc.id;

        resolve(temp);
      });
  });
};

export const GetAllCommunity = (category) => {
  return new Promise((resolve, reject) => {
    console.log(category);
    let allCommunity = [];
    var list = [];

    firestore
      .collection("Community")
      .orderBy("createdOn", "asc")
      .get()
      .then((collection) => {
        for (let x = 0; x < collection.docs.length; x++) {
          let temp = collection.docs[x].data();
          temp.id = collection.docs[x].id;
          allCommunity.push(temp);
        }
        allCommunity &&
          allCommunity.forEach((item) => {
            if (item.category === category || category === "all") {
              list.push(item);
            }
          });
        resolve(list);
        // resolve(allProducts)
      });
  });
};

export const UpdateCommunity = ({ id, data }) => {
  return new Promise((resolve, reject) => {
    UploadCommunityImage({ Files: data.images, name: data.memberName }).then(
      (ImgURLs) => {
        data.images = ImgURLs;

        firestore
          .collection("Community")
          .doc(id)
          .update(data)
          .then((doc) => {
            resolve(1);
          });
      }
    );
  });
};

export const DeleteOneCommunity = ({ id }) => {
  console.log(id);
  return firestore.collection("Community").doc(id).delete();
};
// --------------------------------- Location Operation -----------------------------------

export const CreateLocation = ({ data }) => {
  return new Promise((resolve, reject) => {
    data.createdOn = new Date();

    firestore
      .collection("Location")
      .add(data)
      .then((doc) => {
        resolve(doc.id);
      });
  });
};

export const GetOneLocation = ({ id }) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("Location")
      .doc(id)
      .get()
      .then((doc) => {
        let temp = doc.data();
        temp.id = doc.id;

        resolve(temp);
      });
  });
};

export const GetAllLocation = (category) => {
  return new Promise((resolve, reject) => {
    console.log(category);
    let allCommunity = [];
    var list = [];

    firestore
      .collection("Location")
      .orderBy("createdOn", "asc")
      .get()
      .then((collection) => {
        for (let x = 0; x < collection.docs.length; x++) {
          let temp = collection.docs[x].data();
          temp.id = collection.docs[x].id;
          allCommunity.push(temp);
        }
        allCommunity &&
          allCommunity.forEach((item) => {
            if (item.category === category || category === "all") {
              list.push(item);
            }
          });
        resolve(list);
        // resolve(allProducts)
      });
  });
};

export const DeleteOneLocation = ({ id }) => {
  console.log(id);
  return firestore.collection("Location").doc(id).delete();
};

//--------------------------------Faqs Mehthod-----------------------//
export const CreateFaq = ({ data }) => {
  return new Promise((resolve, reject) => {
    data.createdOn = new Date();

    firestore
      .collection("Faq")
      .add(data)
      .then((doc) => {
        resolve(doc.id);
      });
  });
};

export const GetOneFaq = ({ id }) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("Faq")
      .doc(id)
      .get()
      .then((doc) => {
        let temp = doc.data();
        temp.id = doc.id;

        resolve(temp);
      });
  });
};

export const GetAllFaq = (category) => {
  return new Promise((resolve, reject) => {
    console.log(category);
    let allCommunity = [];
    var list = [];

    firestore
      .collection("Faq")
      .orderBy("createdOn", "asc")
      .get()
      .then((collection) => {
        for (let x = 0; x < collection.docs.length; x++) {
          let temp = collection.docs[x].data();
          temp.id = collection.docs[x].id;
          allCommunity.push(temp);
        }
        allCommunity &&
          allCommunity.forEach((item) => {
            if (item.category === category || category === "all") {
              list.push(item);
            }
          });
        resolve(list);
        // resolve(allProducts)
      });
  });
};
export const UpdateFaq = ({ id, data }) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("Faq")
      .doc(id)
      .update(data)
      .then((doc) => {
        resolve(1);
      });
  });
};

export const DeleteOneFaq = ({ id }) => {
  console.log(id);
  return firestore.collection("Faq").doc(id).delete();
};
// -------------------------------Plans Operation----------------------

const UploadPlanImage = ({ Files, name }) => {
  return new Promise((resolve, reject) => {
    let Task = [];
    let allImages = [];

    Files.forEach((item) => {
      if (typeof item === "string") {
        allImages.push(item);
      } else {
        Task.push(
          new Promise((resolve, reject) => {
            const fileName = randomName();
            let folderName = `Plan-Images/${name}`;

            //-------------------Create the file metadata---------------------------------------------
            const metadata = {
              contentType: "image/png",
            };

            //-------------------Upload file and metadata to the object 'images/mountains.jpg'--------
            const storageRef = storage.ref(`${folderName}/` + fileName);
            const uploadTask = storageRef.put(item, metadata);

            //-------------------Listen for state changes, errors, and completion of the upload-------
            uploadTask.on(
              "state_changed",
              function (snapshot) {
                //-------------------Upload Progress------------------------------------------------------
                //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //     console.log('Upload is '   progress   '% done');
              },
              function (error) {
                reject(error);
              },
              function () {
                //-------------------Upload completed successfully-----------------------------------------
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                  allImages.push(url);
                  resolve(url);
                });
              }
            );
          })
        );
      }
    });

    Promise.all(Task).then(() => resolve(allImages));
  });
};

export const CreatePlan = ({ data }) => {
  return new Promise((resolve, reject) => {
    UploadPlanImage({ Files: data.images, name: data.locName }).then(
      (ImgURLs) => {
        data.images = ImgURLs;
        data.createdOn = new Date();

        firestore
          .collection("Plans")
          .add(data)
          .then((doc) => {
            resolve(doc.id);
          });
      }
    );
  });
};

export const GetOnePlan = ({ id }) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("Plans")
      .doc(id)
      .get()
      .then((doc) => {
        let temp = doc.data();
        temp.id = doc.id;

        resolve(temp);
      });
  });
};

export const GetAllPlan = (category) => {
  return new Promise((resolve, reject) => {
    console.log(category);
    let allCommunity = [];
    var list = [];

    firestore
      .collection("Plans")
      .orderBy("createdOn", "asc")
      .get()
      .then((collection) => {
        for (let x = 0; x < collection.docs.length; x++) {
          let temp = collection.docs[x].data();
          temp.id = collection.docs[x].id;
          allCommunity.push(temp);
        }
        allCommunity &&
          allCommunity.forEach((item) => {
            if (item.category === category || category === "all") {
              list.push(item);
            }
          });
        resolve(list);
        // resolve(allProducts)
      });
  });
};

export const UpdatePlan = ({ id, data }) => {
  return new Promise((resolve, reject) => {
    UploadPlanImage({ Files: data.images, name: data.locName }).then(
      (ImgURLs) => {
        data.images = ImgURLs;

        firestore
          .collection("Plans")
          .doc(id)
          .update(data)
          .then((doc) => {
            resolve(1);
          });
      }
    );
  });
};

export const DeleteOnePlan = ({ id }) => {
  console.log(id);
  return firestore.collection("Plans").doc(id).delete();
};

//---------------------------Blogs Operations-----------------------------------------------
const UploadblogImage = ({ Files, name }) => {
  return new Promise((resolve, reject) => {
    let Task = [];
    let allImages = [];

    Files.forEach((item) => {
      if (typeof item === "string") {
        allImages.push(item);
      } else {
        Task.push(
          new Promise((resolve, reject) => {
            const fileName = randomName();
            let folderName = `blog-Image/${name}`;

            //-------------------Create the file metadata---------------------------------------------
            const metadata = {
              contentType: "image/png",
            };

            //-------------------Upload file and metadata to the object 'images/mountains.jpg'--------
            const storageRef = storage.ref(`${folderName}/` + fileName);
            const uploadTask = storageRef.put(item, metadata);

            //-------------------Listen for state changes, errors, and completion of the upload-------
            uploadTask.on(
              "state_changed",
              function (snapshot) {
                //-------------------Upload Progress------------------------------------------------------
                //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //     console.log('Upload is '   progress   '% done');
              },
              function (error) {
                reject(error);
              },
              function () {
                //-------------------Upload completed successfully-----------------------------------------
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                  allImages.push(url);
                  resolve(url);
                });
              }
            );
          })
        );
      }
    });

    Promise.all(Task).then(() => resolve(allImages));
  });
};

export const CreateBlog = ({ data }) => {
  return new Promise((resolve, reject) => {
    UploadblogImage({ Files: data.images, name: data.heading }).then(
      (ImgURLs) => {
        data.images = ImgURLs;
        data.createdOn = new Date();
        let key = data.heading;
        key = key.replace(/\s+/g, "-");
        console.log(keyframes);
        firestore
          .collection("blog")
          .doc(key)
          .set(data)
          .then((doc) => {
            resolve(key);
          });
      }
    );
  });
};

export const GetOneBlog = ({ id }) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("blog")
      .doc(id)
      .get()
      .then((doc) => {
        let temp = doc.data();
        temp.id = doc.id;

        resolve(temp);
      });
  });
};

export const GetAllBlog = (category) => {
  return new Promise((resolve, reject) => {
    console.log(category);
    let allblog = [];
    var list = [];

    firestore
      .collection("blog")
      .orderBy("createdOn", "asc")
      .get()
      .then((collection) => {
        for (let x = 0; x < collection.docs.length; x++) {
          let temp = collection.docs[x].data();
          temp.id = collection.docs[x].id;
          allblog.push(temp);
        }
        allblog &&
          allblog.forEach((item) => {
            if (item.category === category || category === "all") {
              list.push(item);
            }
          });
        resolve(list);
        // resolve(allProducts)
      });
  });
};

export const UpdateBlog = ({ id, data }) => {
  return new Promise((resolve, reject) => {
    UploadblogImage({ Files: data.images, name: data.heading }).then(
      (ImgURLs) => {
        data.images = ImgURLs;

        firestore
          .collection("blog")
          .doc(id)
          .update(data)
          .then((doc) => {
            resolve(1);
          });
      }
    );
  });
};

export const DeleteOneBlog = ({ id }) => {
  console.log(id);
  return firestore.collection("blog").doc(id).delete();
};
