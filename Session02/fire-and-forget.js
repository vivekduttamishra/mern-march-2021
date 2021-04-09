
const updateUI=()=>{
    setTimeout(
      ()=> document.getElementById("heading").innerHTML="Heading Updated by Javascript" 
      ,5000
    )
};

updateUI();

document.getElementById("heading").innerHTML="Please wait..."