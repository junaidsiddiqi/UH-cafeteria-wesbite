/*JS Coding for Functional Newsletter Button*/

document.getElementById("subscribeForm").addEventListener("submit", function(event){
    event.preventDefault(); 
    document.getElementById("subscribeForm").style.display = "none"; 
    document.getElementById("confirmationMessage").style.display = "block";
});