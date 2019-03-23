var param;
var paramvalue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramvalue=parseInt(param[1]);

}
var request;
var idb= window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;

var open=idb.open("StoreData",1);
console.log("IndexedDB is created");
open.onupgradeneeded=function(event){
var request=event.target.result;
request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
  console.log("Object store is not created",+error);
}
open.onsuccess=function(event){
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");
  var storeDB=transaction.objectStore("Formdata");
 var info=storeDB.get(paramvalue);
 info.onsuccess=function(data){
   console.log(data.target.result);
   display(data.target.result);
 }

}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data){
  var img=document.createElement("img");
  img.src="images/money.svg";
  left.append(img);
  var h3=document.createElement("h3");
  h3.textContent=data.name;
  left.append(h3);
  var h3=document.createElement("h3");
  h3.textContent=data.role;
  left.append(h3);
  var h2=document.createElement("h2");
  h2.textContent=data.email;
  left.append(h2);
  var h3=document.createElement("h3");
  h3.textContent=data.mobile;
  left.append(h3);
  var head=document.createElement("h2");
  head.textContent="career obj";
  right.append(head);
  var pc=document.createElement("h2");
  pc.textContent=data.career;
  right.append(pc);
  var head1=document.createElement("h2");
  head1.textContent="education";
  right.append(head1);
  var hr=document.createElement("hr");
  right.append(hr);
  var table=document.createElement('table');
  let row='';
  row+="<tr>"+"<th>"+"college"+"</th>"+
  "<th>"+"degree"+"</th>"+
  "<th>"+"branch"+"</th>"+
  "<th>"+"marks"+"</th>"+
  "</tr>";

    for(i in data.education){
    row +="<tr>"+"<td>"+data.education[i].college+"</td>"+
    "<td>"+data.education[i].degree+"</td>"+
    "<td>"+data.education[i].branch+"</td>"+
    "<td>"+data.education[i].marks+"</td>"+
    "</tr>";
table.innerHTML=row;
right.appendChild(table);

}
}
