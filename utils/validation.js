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
      msg: "Ім'я, опис, бренд додано успішно",
      type: "success",
    },
  ];
  if (images.length < 1) {
    checks.push({
      msg: `Виберіть принаймі 1 зображення`,
      type: "error",
    });
  } else {
    checks.push({
      msg: `${images, length} зображень успішно вибрано`,
      type: "success",
    });
  }

  // -------- Розкоментувати якщо потрібно заборонити створення продукту без кольору!
  if (!product.color.color && product.color.image !== "#ffffff00") {
    checks.push({
      msg: "Введіть назву кольору основного продукту",
      type: "error",
    });
  } else {
    checks.push({
      msg: "Назву кольору продукту вибрано успішно",
      type: "success",
    });
  }
  if (!product.color.image) {
    checks.push({
      msg: "Виберіть основний колір продукту",
      type: "error",
    });
  } else {
    checks.push({
      msg: "Колір продукту вибрано успішно",
      type: "success",
    });
  }

  // for (var i = 0; i < sizes.length; i++) {
  //   if (sizes[i].qty == "" || sizes[i].price == "") {
  //     checks.push({
  //       msg: "Заповніть усю інформацію по розмірах",
  //       type: "error",
  //     });
  //     break;
  //   } else {
  //     checks.push({
  //       msg: "Розмір успішно вибрано",
  //       type: "success",
  //     });
  //   }
  // }
  let isSizeValid = true;
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].qty === "" || sizes[i].price === "") {
      isSizeValid = false;
      break;
    }
  }

  if (!isSizeValid) {
    checks.push({
      msg: "Заповніть усю інформацію по розмірах",
      type: "error",
    });
  } else {
    checks.push({
      msg: "Розмір успішно вибрано",
      type: "success",
    });
  }

  // for (var i = 0; i < details.length; i++) {
  //   if (details[i].fields.length>0 && details[i].fields[0].name=="" && details[i].fields[0].value=="") {
  //     checks.push({
  //       msg: "Заповніть деталі продукту",
  //       type: "error",
  //     });
  //     break;
  //   } else {
  //     checks.push({
  //       msg: "Деталі успішно вибрано",
  //       type: "success",
  //     });
  //   }
  // }
  let isDetailValid = true;
  for (let i = 0; i < details.length; i++) {
    if (
      details[i].fields.length > 0 &&
      (details[i].fields[0].name === "" || details[i].fields[0].value === "")
    ) {
      isDetailValid = false;
      break;
    }
  }
  if (!isDetailValid) {
    checks.push({
      msg: "Заповніть деталі продукту",
      type: "error",
    });
  } else {
    checks.push({
      msg: "Деталі успішно вибрано",
      type: "success",
    });
  }

  var s_test = checks.find((c) => c.type == "error");
  if (s_test) {
    return checks;
  } else {
    return "valid";
  }
};

export const validateEditProduct = (product, images) => {
  let sizes = product.sizes;
  let details = product.details;
  let subCategories = product.subCategories;
  const checks = [
    {
      msg: "Ім'я, опис, бренд додано успішно",
      type: "success",
    },
  ];


  // -------- Розкоментувати якщо потрібно заборонити створення продукту без кольору!
  if (!product.color.color && product.color.image !== "#ffffff00") {
    checks.push({
      msg: "Введіть назву кольору основного продукту",
      type: "error",
    });
  } else {
    checks.push({
      msg: "Назву кольору продукту вибрано успішно",
      type: "success",
    });
  }
  if (!product.color.image) {
    checks.push({
      msg: "Виберіть основний колір продукту",
      type: "error",
    });
  } else {
    checks.push({
      msg: "PКолір продукту вибрано успішно",
      type: "success",
    });
  }

  // for (var i = 0; i < sizes.length; i++) {
  //   if (sizes[i].qty == "" || sizes[i].price == "") {
  //     checks.push({
  //       msg: "Заповніть усю інформацію по розмірах",
  //       type: "error",
  //     });
  //     break;
  //   } else {
  //     checks.push({
  //       msg: "Розмір успішно вибрано",
  //       type: "success",
  //     });
  //   }
  // }
  let isSizeValid = true;
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].qty === "" || sizes[i].price === "") {
      isSizeValid = false;
      break;
    }
  }

  if (!isSizeValid) {
    checks.push({
      msg: "Заповніть усю інформацію по розмірах",
      type: "error",
    });
  } else {
    checks.push({
      msg: "Розмір успішно вибрано",
      type: "success",
    });
  }

  // for (var i = 0; i < details.length; i++) {
  //   if (details[i].fields.length>0 && details[i].fields[0].name=="" && details[i].fields[0].value=="") {
  //     checks.push({
  //       msg: "Заповніть деталі продукту",
  //       type: "error",
  //     });
  //     break;
  //   } else {
  //     checks.push({
  //       msg: "Деталі успішно вибрано",
  //       type: "success",
  //     });
  //   }
  // }
  let isDetailValid = true;
  for (let i = 0; i < details.length; i++) {
    if (
      details[i].fields.length > 0 &&
      (details[i].fields[0].name === "" || details[i].fields[0].value === "")
    ) {
      isDetailValid = false;
      break;
    }
  }
  if (!isDetailValid) {
    checks.push({
      msg: "Заповніть деталі продукту",
      type: "error",
    });
  } else {
    checks.push({
      msg: "Деталі успішно вибрано",
      type: "success",
    });
  }

  var s_test = checks.find((c) => c.type == "error");
  if (s_test) {
    return checks;
  } else {
    return "valid";
  }
};
