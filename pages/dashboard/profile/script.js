// Script
function editEmail(){
    document.getElementById("changeEmailmodal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function editPnum(){
    document.getElementById("changePnumModal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function enterOTP(){
    document.getElementById("enterOTPmodal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closeModal(){
    document.getElementById("changeEmailmodal").style.display = "none";
    document.getElementById("changePnumModal").style.display = "none";
    document.getElementById("enterOTPmodal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

//clicking outside the modal to exit
// document.getElementById("overlay").addEventListener("click", cancelButton);