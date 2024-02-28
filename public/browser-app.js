const url = '/api/v1/goods'
const fileFormDOM = document.querySelector('.file-form')

const nameInputDOM = document.querySelector('#name')
const priceInputDOM = document.querySelector('#price')
const imageInputDOM = document.querySelector('#image')

const containerDOM = document.querySelector('.container')
let imageValue;

// imageInputDOM.addEventListener('change',(e)=>{
//  const file = e.target.files[0];
//  console.log(file);
// })







imageInputDOM.addEventListener('change',async (e)=>{
 const imageFile = e.target.files[0];
 const formData = new FormData();
 formData.append('image',imageFile)
 try {
  const {data:{image:{src}}} = await axios.post(`${url}/uploads`,formData,{
   headers:{
    'Content-Type':'multipart/form-data'
   }
  })
  console.log(src)
  imageValue = src
 } catch (error) {
   imageValue = null
  console.log(error);
 }
})


fileFormDOM.addEventListener('submit',async (e)=>{
e.preventDefault()
const nameValue = nameInputDOM.value;
const priceValue = priceInputDOM.value;
try {
 
 const product = {name:nameValue,price:priceValue,image:imageValue}
 
  await axios.post(url,product);
  fetchgoods()
} catch (error) {
 console.log(error);
}
})



async function fetchgoods () {
 try {
  const {data} = await axios.get(url);
  console.log(data)
  
  
  const goodsDOM = data.map((product)=>{
return `<article class="product">
<img src="${product.image}" alt="${product.name}" class="img"/>
<footer>
<p>${product.name}</p>
<span>$${product.price}</span>
</footer>
</article>`
  }).join('')
  containerDOM.innerHTML = goodsDOM
 } catch (error) {
  console.log(error);
 }
 
}

fetchgoods()