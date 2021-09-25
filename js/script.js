const overview = document.querySelector(".overview"); //section with profile information
const username = "amyspencerproject";
const repoList = document.querySelector(".repo-list");

const gitProfile = async function () {
    const fetchProfile = await fetch (`https://api.github.com/users/${username}`);
    const profileData = await fetchProfile.json();
    displayProfile(profileData);
};
gitProfile();

const displayProfile = function(profileData) {
    const div = document.createElement("div");
    div.classList.add(".user-info")
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

const displayRepos = function(repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add(".repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoItem);
    }
};