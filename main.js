// main vars
let theInputs = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};
// a faunction to get repose

function getRepos() {
  if (theInputs.value == "") {
    reposData.innerHTML = `<span> dont do that</span>`;
  } else {
    // TOTO: Show loader
    reposData.innerHTML = `<div class="lds-facebook"><div></div><div></div><div></div></div>`;
    fetch(`https://api.github.com/users/${theInputs.value}/repos`)
      .then((response) => response.json())

      .then((repositories) => {
        reposData.innerHTML = " ";

        // loop on repositories
        repositories.forEach((user) => {
          //creat main div
          let mainDiv = document.createElement("div");

          // creat repo name
          let repoName = document.createTextNode(user.name);

          // append the twxt to the div
          mainDiv.appendChild(repoName);

          //creat url  anchor
          let theUrl = document.createElement("a");
          // creat the url text 
          let theUrlText = document.createTextNode("the link u want")
          // apending the url text to linl 
          theUrl.appendChild(theUrlText)
          // ad the link on repo and on in an indivsual tap
          theUrl.href = `https://github.com/${theInputs.value}/${user.name}`

          theUrl.setAttribute("target","_blank")
          // append all of this to the main div 
          mainDiv.appendChild(theUrl)
          // creat stars count 
          let starsSpan = document.createElement("span")
          //creat the stars count to stars span
          let starsText = document.createTextNode(`stars ${user.stargazers_count}`)
          // appending stars text to stars span 
          starsSpan.appendChild(starsText)

          //append on main div
          mainDiv.appendChild(starsSpan)

          // add class to the main div
          mainDiv.className = "repo-box"


          //  append the main div  to container
          reposData.appendChild(mainDiv);
        });
      });
  }
}
