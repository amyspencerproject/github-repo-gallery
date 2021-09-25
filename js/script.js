const overview = document.querySelector(".overview"); //section with profile information
const username = "amyspencerproject";

const gitProfile = async function () {
    const gitUsername = await fetch (`https://api.github.com/users/${username}`);
    const response = await gitUsername.json();
    displayProfile(response);
};

gitProfile();

const displayProfile = function(response) {
    const div = document.createElement("div");
    div.classList.add(".user-info")
    div.innerHTML = `
        <figure>
        <img alt="user avatar" src=${response.avatar_url} />
        </figure>
        <div>
        <p><strong>Name:</strong> ${response.name}</p>
        <p><strong>Bio:</strong> ${response.bio}</p>
        <p><strong>Location:</strong> ${response.location}</p>
        <p><strong>Number of public repos:</strong> ${response.public_repos}</p>
        </div> 
    `;

    overview.append(div);
};
