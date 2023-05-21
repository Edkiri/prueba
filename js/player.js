const acceptButton = document.getElementById("accept-button");
const inputUsername = document.getElementById("username");

acceptButton.addEventListener("click", () => {
  const username = inputUsername.value.trim();
  if(username) {
    sessionStorage.setItem("username", username);
    window.location = "./settings.html";
  }
})