export const validateEmail = (email) => {
  const regextSt =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regextSt.test(String(email).toLowerCase());
};

export const validateCreateProduct = (product, images) => {
  let sizes = product.sizes;
  let details = product.details;
  let subCategories = product.subCategories;
  const checks = [
    {
      msg: "Name, description, Brand added successfully",
      type: "success",
    },
  ];
  if (images.length < 1) {
    checks.push({
      msg: `Choose at least 1 image`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `${images,length} images chosen successfully`,
      type: "success",
    });
  }

  // -------- Розкоментувати якщо потрібно заборонити створення продукту без кольору!
  if (!product.color.color && product.color.image!=="#ffffff00") {
    checks.push({
      msg: "Type a main product color name",
      type: "error",
    });
  } else {
    checks.push({
      msg: "Product color name has been written successfully",
      type: "success",
    });
  }
  if (!product.color.image) {
    checks.push({
      msg: "Choose a main product color",
      type: "error",
    });
  } else {
    checks.push({
      msg: "Product color has been chosen successfully",
      type: "success",
    });
  }

  for (var i = 0; i < sizes.length; i++) {
    if (sizes[i].qty == "" || sizes[i].price == "") {
      checks.push({
        msg: "Please fill all information on sizes",
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: "Sizes chosen successfully",
        type: "success",
      });
    }
  }
  for (var i = 0; i < details.length; i++) {
    if (details[i].fields.length>0 && details[i].fields[0].name=="" && details[i].fields[0].value=="") {
      checks.push({
        msg: "Please fill all information on details",
        type: "error",
      });
      break;
    } else {
      checks.push({
        msg: "Details chosen successfully",
        type: "success",
      });
    }
  }
  var s_test = checks.find((c) => c.type == "error");
  if (s_test) {
    return checks;
  } else {
    return "valid";
  }
};
