const reviewCount=document.querySelector("#review-count");
let count=Number(localStorage.getItem("reviewCount"))||0;
count+=1;
localStorage.setItem("reviewCount",count);
reviewCount.textContent=count;

document.querySelector("#currentyear").textContent=new Date().getFullYear();
document.querySelector("#lastModified").textContent=`Last Modified: ${document.lastModified}`;
