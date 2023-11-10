const modeswitch = document.querySelector('.toggle-switch');
const span = document.querySelector('#switch');
const asset_id = sessionStorage.getItem('edit-id');
var asset = [];
modeswitch.addEventListener('click',()=>{
    span.classList.toggle("switch-off-edit");
});

document.querySelector('#delete-button').onclick = function () {
    Swal.fire({
        title: 'ARE YOU SURE?',
        color:'#D65A0F',
        icon: 'warning',
        background: '#FFE6C7',
        showCancelButton: true,
        confirmButtonColor: '#D65A0F',
        cancelButtonColor: '#454545',
        confirmButtonText: 'Yes'
        ,cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace('/views/admin/assetlist.html');
        }
      });
    // console.log('Test');
}
document.querySelector('#confirm').onclick = function () {
    Swal.fire({
        title: 'ARE YOU SURE?',
        color:'#D65A0F',
        icon: 'warning',
        background: '#FFE6C7',
        showCancelButton: true,
        confirmButtonColor: '#D65A0F',
        cancelButtonColor: '#454545',
        confirmButtonText: 'Yes'
        ,cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace('/views/admin/assetlist.html');
        }
      });
    // console.log('Test');
}

async function getdata() {
  const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
  }
  try {
      const response = await fetch(`/admin/edit/${asset_id}`,options);
      if (response.ok) {
          asset = await response.json();
          showData();
        }
        else {
          throw Error('Connection error');``
        }
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    }
    
    function showData() {
    console.log(asset);;
    var name = document.querySelector('#edit-name');
    var photo = document.querySelector('#edit-photo');
    var detail = document.querySelector('#edit-detail');

    name.innerHTML = asset[0].asset_name;
    photo.src = `/public/img/${asset[0].image}`; 
    detail.innerHTML = asset[0].detail;
}

getdata();