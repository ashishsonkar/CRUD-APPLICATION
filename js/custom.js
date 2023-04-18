let body=document.getElementsByTagName("body")[0];
body.classList.add("bg-dark","text-white");
main.innerHTML=`
	<div class="container mt-5">
		<div class="text-center" id="headDiv"> 
			<h1 class="display-5 mb-5"><strong>CRUD Appication</strong></h1>
		</div>
		<div class="main row justify-content-center">
			<form class="row justify-content-center mb-4" autocomplete="off" id="studentForm">
				<div class="col-10 col-md-8 mb-3">
					<label for="firstname">First Name</label>
					<input type="text" class="form-control" id="firstName" placeholder="Enter First Name">
				</div>
				<div class="col-10 col-md-8 mb-3">
					<label for="lastname">Last Name</label>
					<input type="text" class="form-control" id="lastName" placeholder="Enter Last Name">
				</div>
				<div class="col-10 col-md-8 mb-3">
					<label for="rollNo">Roll No</label>
					<input type="text" class="form-control" id="rollNo" placeholder="Enter Roll No">
				</div>
				<div class="col-10 col-md-8 mb-3">
					<input type="submit" value="submit" class="btn btn-success add-btn">
				</div>
			</form>
			<div class="col-12 col-md-10">
				<table class="table table-dark table-striped">
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Roll No</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody id="student-list">
						<tr>
							<td>Ashish</td>
							<td>Sonkar</td>
							<td>01</td>
							<td>
								<a href="#" class="btn btn-warning btn-sm edit">Edit</a>
								<a href="#" class="btn btn-danger btn-sm delete">Delete</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
`;


var selectedRow=null;
/*for alerts*/
function showAlert(message,msgType){
	let div=document.createElement("div");
	div.className=`alert alert-${msgType}`;
	
	div.appendChild(document.createTextNode(message));
	const container=document.querySelector(".container");
	const main=document.querySelector(".main");
	
	container.insertBefore(div , main);

	setTimeout(()=>{document.querySelector(".alert").remove()},3000);
}
/*for clear all the fields*/
function clearFields(){
	document.querySelector("#firstName").value="";
	document.querySelector("#lastName").value="";
	document.querySelector("#rollNo").value="";
}
/*For deleting the data*/
let stuList=document.querySelector("#student-list");

stuList.addEventListener("click",()=>{
	let target=event.target;
	if(target.classList.contains("delete")){
		target.parentElement.parentElement.remove();
		showAlert("Student Data Deleted","danger");
	}
});
/*To add data*/
document.querySelector("#studentForm").addEventListener('submit',()=>{
	event.preventDefault();
	
	const fname=document.querySelector("#firstName").value;
	const lname=document.querySelector("#lastName").value;
	const roll=document.querySelector("#rollNo").value;
	
	if(fname == "" || lname == "" || roll == ""){
		showAlert("Please Fill All Fields","warning");
	}else{
		if(selectedRow == null){
			const list=document.querySelector("#student-list");
			const Trow=document.createElement("tr");
			
			Trow.innerHTML=`
				<td>${fname}</td>
				<td>${lname}</td>
				<td>${roll}</td>
				<td>
					<a href="#" class="btn btn-warning btn-sm edit">Edit</a>
					<a href="#" class="btn btn-danger btn-sm delete">Delete</a>
				</td>
			`;
			list.appendChild(Trow);
			selectedRow = null;
			showAlert("Student Added","success");
		}else{
			selectedRow.children[0].textContent=fname;
			selectedRow.children[1].textContent=lname;
			selectedRow.children[2].textContent=roll;
			selectedRow = null;
			showAlert("Student Info Edited","info");
		}
		clearFields();
	}
});
/*For edit data*/
document.querySelector("#student-list").addEventListener('click',()=>{
	target=event.target;
	if(target.classList.contains("edit")){
		selectedRow=target.parentElement.parentElement;
		document.querySelector("#firstName").value=selectedRow.children[0].textContent;
		document.querySelector("#lastName").value=selectedRow.children[1].textContent;
		document.querySelector("#rollNo").value=selectedRow.children[2].textContent;	
	}
});
