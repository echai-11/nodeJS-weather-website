console.log('Client side javascript is loaded');



const weatherForm = document.querySelector('form');
const $button = document.querySelector('button');
const search = document.getElementById('search-input');
const message1 = document.getElementById('error');
const addressM = document.getElementById('address');
const weatherM = document.getElementById('weather');
weatherForm.addEventListener('submit',(event)=>{
	event.preventDefault();
	$button.textContent = "searching";
	$button.setAttribute('disable',true);
	message1.textContent = '';
	addressM.textContent = '';
	weatherM.textContent = '';
	const location = search.value;
	fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
		response.json().then((data)=>{
			$button.textContent = "search";
			$button.setAttribute('disable',false);
			search.value = '';
			if (data.error){
				message1.textContent = data.error;
			} else{
				addressM.textContent = data.location;
				weatherM.textContent = data.forecast;
			}
		})
	})

})

