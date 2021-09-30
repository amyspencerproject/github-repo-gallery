const overview = document.querySelector(".overview"); //section with profile information
const username = "amyspencerproject";
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


const gitProfile = async function () {
    const fetchProfile = await fetch (`https://api.github.com/users/${username}`);
    const profileData = await fetchProfile.json();
    displayProfile(profileData);
};
gitProfile();

const displayProfile = function(profileData) {
    const div = document.createElement("div");
    div.classList.add("user-info")
    div.innerHTML = `
        <figure>
        <img alt="user avatar" src=${profileData.avatar_url} />
        </figure>
        <div>
        <p><strong>Name:</strong> ${profileData.name}</p>
        <p><strong>Bio:</strong> ${profileData.bio}</p>
        <p><strong>Location:</strong> ${profileData.location}</p>
        <p><strong>Number of public repos:</strong> ${profileData.public_repos}</p>
        </div> 
    `;
    overview.append(div);
    gitRepos();
};

const gitRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
    const repoData = await fetchRepos.json();
    displayRepos(repoData);
};

const displayRepos = function(repos) { //displays all repos
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    } 
});

const getRepoInfo = async function (repoName) {
    const fetchRepoInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();
    console.log(repoInfo);

    //get languages url from repoInfo array
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for (data in languageData) {
        languages.push(data);
        // console.log(languages);
    }
    
    displayRepoInfo(repoInfo,languages);
};

const displayRepoInfo = function (repoInfo,languages) {
    backButton.classList.remove("hide");
    repoData.innerHTML = ""; //clear individual repo data
    repoData.classList.remove("hide");
    reposSection.classList.add("hide");
    const div = document.createElement("div");
    repoData.append(div);
    div.innerHTML= `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
};

backButton.addEventListener("click", function () {
    reposSection.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});


filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchTextLowerCase = searchText.toLowerCase();
    console.log(searchTextLowerCase);

    for (const repo of repos) {
        const repoLowerCase = repo.innerText.toLowerCase();
        if (repo.innerText.includes(searchTextLowerCase)) {
          repo.classList.remove("hide");
        } else {
          repo.classList.add("hide");
        }
      }
});

