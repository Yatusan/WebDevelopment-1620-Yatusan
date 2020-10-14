var featureSubmitBtn = document.getElementById("featureSubmitBtn");
var featureFrm = document.getElementById("featureFrm");
var featureLoadingDiv = document.getElementById("featureLoadingDiv");

featureSubmitBtn.addEventListener("click", async function() {
  // Make the loader div visible
  featureLoadingDiv.classList.remove("human-removed");
  // Hide the form from the user
  featureFrm.classList.add("human-removed");
  await onfeaturesubmit();
  featureFrm.reset();
  featureLoadingDiv.classList.add("human-removed");
  featureFrm.classList.remove("human-removed");
  await onfeatureload();
});

async function onfeatureload() {
  var response = await fetch("http://localhost:5000/features");
  var result = await response.json();

  var featureList = document.getElementById("feature-list");
  featureList.innerHTML = "";

  for (var i = 0; i < result.length; i++) {
    var lielement = document.createElement("li");
    lielement.className = "list-group-item";
    lielement.innerHTML =
      result[i].body +
     
      result[i].author +
      ", " +
      result[i].age +
      ", " +
      "<span class='badge badge-success'>" +
      result[i].time +
      "</span>";
    featureList.appendChild(lielement);
  }
}

onfeatureload();

async function onfeaturesubmit() {
  await fetch("http://localhost:5000/features", {
    method: "post",
    body: JSON.stringify({
      name: document.getElementById("username").value,
      age: document.getElementById("userage").value,
      feature: document.getElementById("userfeature").value
    }),
    headers: {
      "content-type": "application/json"
    }
  });
}
