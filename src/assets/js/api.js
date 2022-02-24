// console.log("api");
async function init() {
  const data = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=1da81bb3780f42a6a0ceb11f31a38886&query=pasta`
  );
  console.log(data.json());
}

init();
