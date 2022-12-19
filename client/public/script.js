const potluck_preset = "potluck_default";
const potluck_cloud = "dq8w2lty6";

// Select the button to add ingredients
const ingredientsBtn = document.querySelector("#addIngredientsBtn");
const cloud = {
  thumb:
    "https://res.cloudinary.com/dq8w2lty6/image/upload/c_limit,h_60,w_90/v1671470369/",
  x250: "https://res.cloudinary.com/dq8w2lty6/image/upload/c_scale,h_250,w_250/v1671470369/",
};

if (document.getElementById("create-recipe") && ingredientsBtn) {
  // Select the table that we are adding to
  const table = document.querySelector("table");
  // Select the first ingredient table row with inputs
  const ingredientRow = document.querySelectorAll("tr")[1];

  ingredientsBtn.addEventListener("click", () => {
    let newIngredient = ingredientRow.cloneNode(true);
    let inputs = newIngredient.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
    table.appendChild(newIngredient);
  });

  function deleteRow(r) {
    let element = r.parentNode.parentNode.rowIndex;
    if (element > 1) {
      document.getElementById("ingredientsList").deleteRow(element);
    }
  }
}

if (document.getElementById("upload_widget")) {
  var imageElement = document.getElementById("image_source");
  let newImage = cloudinary.createUploadWidget(
    {
      cloudName: potluck_cloud,
      uploadPreset: potluck_preset,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result);
        const img = `${result.info.public_id}.${result.info.format}`;
        console.log("Image part is: ", img);
        try {
          document.getElementById("image_pic").src = `${cloud.x250}${img}`;
          document.getElementById("image_source").value = img;
          console.log("Image element: ", imageElement.value);
        } catch (err) {
          console.log("Had an error: ", err);
        }
      }
    }
  );

  document.getElementById("upload_widget").addEventListener(
    "click",
    function () {
      newImage.open();
    },
    false
  );
}
