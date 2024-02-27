const landPhone = async(searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones);
}

const displayPhones  = phones =>{
      // 1. where have to set it .  
     const phoneContainer = document.getElementById("phone-container")
     //clear phone container cards before adding new cards
      phoneContainer.textContent = '';

     //display only first 9 phones
     phones = phones.slice(0,9)   
    
     phones.forEach(phones => {
        
        // 2. create a div
       const phoneCard = document.createElement('div');
       phoneCard.classList = "card abg-base-100 shadow-xl";
        // 3. set inner html   
       phoneCard.innerHTML =`
       <figure class="px-10 pt-10">
       <img src="${phones.image}" alt="Shoes" class="rounded-xl" />
       </figure>
       <div class="card-body items-center text-center">
       <h2 class="card-title">${phones.brand}</h2>
       <h1 class="card-title">${phones.phone_name}</h1>
       <p>If a dog chews shoes whose shoes does he choose?</p>
       <div class="card-actions">
         <button class="btn btn-primary">Buy Now</button>
       </div>
       </div>
       `  ;
        //4. append child
        phoneContainer.appendChild(phoneCard) 
    });
}


const handleSearch = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value
    console.log(searchText)
    landPhone(searchText)
}


// landPhone();