const SearchButton = document.querySelector("button")
const InputBox = document.querySelector("input")
const LeftContainer = document.querySelector("#left-container")
const RightContainer = document.querySelector("#right-container")

SearchButton.addEventListener("click", function () {
    const enteredValue = InputBox.value
    InputBox.value = ""

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${enteredValue}&key=4fc4d361-f5f5-40f5-95f0-c5d360f32e91`)
        .then(function (output) {
            return output.json()
        })
        .then(function (foodDetails) {
            foodDetails.data.recipes.map(function (i) {
                console.log(i.id)
                return LeftContainer.insertAdjacentHTML("afterbegin", `<div class="card" style="width: 18rem;">
  <a href="#${i.id}"><img src=${i.image_url} id="image" class="card-img-top" alt="..."></a>
  <div class="card-body">
    <h5 class="card-title">${i.title}</h5>
  </div>
</div>`)
            })
        })
        .catch(function (error) {
            alert(error)
        })
})


// #66369o2
function getParticularData(collectedHash){

    RightContainer.innerHTML = ""

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${collectedHash}?key=4fc4d361-f5f5-40f5-95f0-c5d360f32e91`)
    .then(function(output){
        return output.json()
    })
    .then(function(info){
        const foodObj = info.data.recipe
 
        return RightContainer.insertAdjacentHTML("afterbegin", `<div class="card" style="width: 25rem;">
        <img src=${foodObj.image_url} id="image" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${foodObj.title}</h5>
          Cooking Time:<h5 class="card-title">${foodObj.cooking_time}</h5>
          ${foodObj.ingredients.map(function(i){
            
            return `<div><span>${i.description}</span>-<span>${i.quantity}</span>-<span>${i.unit}</span></div>`
        
          })}
          <img id='plus' src='plus.png' />
          <span>0</span>
          <img id='minus' src='minus.png' />
        </div>
      </div>`)
       
    })
    .catch(function(error){
        console.log(error)
    })
}





// collect the hashID present in the url(browser)

window.addEventListener("hashchange", function()
{
    let fetchedHash = window.location.hash//#i37983
    let latestHash = fetchedHash.substring(1, fetchedHash.length)
    getParticularData(latestHash)
})