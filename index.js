function searchRepositories() {
  const searchTerms = document.getElementById('searchTerms').value;
  displayResults(searchTerms);
}

function displayResults(searchTerms) {
  const url = 'https://api.github.com/search/repositories' + '?q=' + searchTerms;
   $.get(url, function(response) {
     const items = response["items"];
     let responseList = "<ul>"
     for (let item of items) {
       responseList +=
       "<li>" +
          item["name"] + "<br>" +
          "<a href='#' data-repository='" + item["name"] + "' data-owner='" + item["owner"]["login"] + "' onclick='showCommits(this)'>Show Commits</a>" +
        "</li>";
     }
     $("#results").html(responseList);
   })
}

function displayError(){
  document.getElementById('errors').innerHTML = "I'm sorry, there's been an error. Please try again."
}

function showCommits(el) {
  const repoName = el.dataset.repository;
  const owner = el.dataset.owner;
  const query =  'https://api.github.com/repos/' + owner + '/'+ repoName + '/commits';
  $.get(query, function(response) {
    console.log(response)
    const commitsList = `<ul>${response.map(commit => '<li><h2>' + commit["author"]["login"] + '</h2>' + commit["commit"]["author"]["name"] + ' - ' + commit["commit"]["message"] + '<br>' + commit["sha"] + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList
  })
}

$(document).ready(function (){

});
