let inputName = document.getElementById('name');
let inputRegion = document.getElementById('region');
let inputRt = document.getElementById('rt');
let inputRw = document.getElementById('rw');
let inputCall = document.getElementById('call');
let inputImage = document.getElementById('image');
const buttonPost = document.getElementById('buttonPost');

// api
const endpoint = 'http://localhost:5000/datpen';

// upload data
buttonPost.addEventListener('click', (e) => {
  e.preventDefault();

  // checking input value
  if (inputName.value === '' || inputRegion.value === '' || inputRt.value === '' || inputRw.value === '' || inputImage.files.length === 0) {
    alert('Harap isi Nama, Alamat, RT, RW dan Gambar');
    return;
  }

  // format "Content-Type: multipart/form-data"
  let formData = new FormData();
  formData.append('name', inputName.value);
  formData.append('region', inputRegion.value);
  formData.append('rt', inputRt.value);
  formData.append('rw', inputRw.value);
  formData.append('call', inputCall.value);
  // geted file image
  formData.append('image', inputImage.files[0]);

  fetch(endpoint, {
    method: 'POST',
    body: formData,
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data)
      inputName.value = '';
      inputRegion.value = '';
      inputRt.value = '';
      inputRw.value = '';
      inputCall.value = '';
      inputImage.value = '';
    }
    )
    .catch((error) => console.error('Error', error))
});

const buttonSearch = document.getElementById('button-search');

buttonSearch.addEventListener('click', () => {
  let inputValue = document.getElementById('input-search');
  const urlSearch = `${endpoint}?name=${inputValue.value}`
  console.log(inputValue.value)
  console.log(urlSearch)
  fetch(urlSearch, {
    method: 'GET',
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data.data.datpen)
      const datas = data.data.datpen;
      // console.log(datas);
      createElement(datas);
    })
    .catch((error) => console.error('Error', error))
});

function createElement(datas) {
  for (let data of datas) {
    const table = document.getElementById('table-result')
    // thead result
    const thead = document.createElement('thead');
    thead.classList.add('thead-result');
    // tbody result
    const tbody = document.createElement('tbody');
    // tr result
    const trHead = document.createElement('tr');
    const trBody = document.createElement('tr');
    // th result
    const thName = document.createElement('th');
    const thRegion = document.createElement('th');
    const thRt = document.createElement('th');
    const thRw = document.createElement('th');
    const thCall = document.createElement('th');
    const thImage = document.createElement('th');
    // td result
    const td = document.createElement('td');
    
    // append
    trHead.append(thName, thRegion, thRt, thRw, thCall, thImage);
    thead.append(trHead)
  
    trBody.append(td);
    tbody.append(trBody);
  
    table.append(thead, tbody);

    console.log(data.name)
    th.innerHTML = 'Nama'
    th.innerHTML = 'Alamat'
    td.innerHTML = data.name
    td.innerHTML = data.region
  }
}
