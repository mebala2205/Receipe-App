const form=document.querySelector("form");
form.addEventListener("submit",(e)=>{
   e.preventDefault();
//    console.log(e.target.querySelector("input").value);
   const serachitem=e.target.querySelector("input").value;
  fetchReceipeApi(serachitem);
})

async function fetchReceipeApi(serachitem)
{
  const app_id="18cfd8b5";
  const app_key="138a7267b9d00e0b6206a5ad85246785";
  const to="99";
  const url=`https://api.edamam.com/search?q=${serachitem}&app_id=${app_id}&app_key=${app_key}&to=${to}`;
  const urlresp = await fetch(url);
  const dataset = await urlresp.json();
//   console.log(dataset.hits);
  receipetemplate(dataset.hits)

}

function receipetemplate(result)
{
   showInHtml="" 
 
   result.forEach(data => {
      showInHtml+=`
      <div class="col-lg-4 col-sm-12" >
          <div class="card inner" >
            <img src="${data.recipe.image}" class="img-fluid"  alt="${data.recipe.label}">
            <div class="card-body">
              <h5 class="card-title" style="font-weight:bolder" >${data.recipe.label}</h5>
              <h5 class="card-title" >${data.recipe.calories.toFixed(2)}:Calories</h5>
              <h5 class="card-title" >Health-Tips:${data.recipe.healthLabels[0]}</h5>
              <div  style=" text-align:center">
              <a href="${data.recipe.url}" class="btn btn-primary me-2">View Receipe</a>
              </div>
            </div>
          </div>
        </div> 
     `
   });

   document.querySelector(".row").innerHTML = showInHtml;
}

// Default Home Page func
fetchReceipeApi("fish");