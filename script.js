let inputName = document.getElementById('name');
let inputRegion = document.getElementById('region');
let inputRt = document.getElementById('rt');
let inputRw = document.getElementById('rw');
let inputCall = document.getElementById('call');
let inputImage = document.getElementById('image');
const buttonPost = document.getElementById('buttonPost');


// api
const endpoint = 'https://data-penduduk-service.adaptable.app/datpen';
// test
// const endpoint = 'http://localhost:5000/datpen';

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
    .then((result) =>
      result.json())
    .then((data) => {
      // console.log(hai)
      console.log(data);
      if (data.status === 'succes') {
        alert('data berhasil ditambahkan');
      }

      if (data.statusCode === 413) {
        alert('Data tidak dapat di simpan, ukuran gambar terlalu besar');
      }

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
  fetch(urlSearch, {
    method: 'GET',
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data.data)
      const datas = data.data.datpen;
      // console.log(datas);
      createElement(datas);
    })
    .catch((error) => console.error('Error', error))
  inputValue.value = '';
});

function clearTable() {
  const table = document.getElementById('table-result');
  // Hapus semua elemen anak (thead dan tbody)
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

function createElement(datas) {
  let number = 1;
  clearTable();
  const table = document.getElementById('table-result')
  // thead result
  const thead = document.createElement('thead');
  thead.classList.add('thead-result');
  // tbody result
  const tbody = document.createElement('tbody');
  table.append(thead, tbody);

  // tr result
  const trHead = document.createElement('tr');
  // th result
  const thNumber = document.createElement('th');
  const thName = document.createElement('th');
  const thRegion = document.createElement('th');
  const thRt = document.createElement('th');
  const thRw = document.createElement('th');
  const thCall = document.createElement('th');
  const thImage = document.createElement('th');

  // append
  trHead.append(thNumber, thName, thRegion, thRt, thRw, thCall, thImage);
  thead.append(trHead)

  thNumber.innerHTML = 'No'
  thName.innerHTML = 'Nama'
  thRegion.innerHTML = 'Alamat'
  thRt.innerHTML = 'RT'
  thRw.innerHTML = 'Rw'
  thCall.innerHTML = 'Nomor Handphone'
  thImage.innerHTML = 'Gambar'


  for (let data of datas) {
    // td result
    const tdNumber = document.createElement('td');
    const tdName = document.createElement('td');
    const tdRegion = document.createElement('td');
    const tdRt = document.createElement('td');
    const tdRw = document.createElement('td');
    const tdCall = document.createElement('td');
    const tdImage = document.createElement('td');
    const image = document.createElement('img')

    const trBody = document.createElement('tr');


    image.classList.add('image-result')

    tbody.append(trBody);
    trBody.append(tdNumber, tdName, tdRegion, tdRt, tdRw, tdCall, tdImage);
    tdImage.append(image);


    tdNumber.innerHTML = number++
    tdName.innerHTML = data.name
    tdRegion.innerHTML = data.region
    tdRt.innerHTML = data.rt
    tdRw.innerHTML = data.rw
    tdCall.innerHTML = data.call
    image.src = data.image_url
  }
}
