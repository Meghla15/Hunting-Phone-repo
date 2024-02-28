const landPhone = async(searchText="iphone", isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
   //  console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones  = (phones, isShowAll) =>{
      // 1. where have to set it .  
     const phoneContainer = document.getElementById("phone-container")
     //clear phone container cards before adding new cards
      phoneContainer.textContent = '';

     // display show all button if there are more than 12 phones
     const showAllContainer = document.getElementById('show-all-container')
     if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
     }
     else {
        showAllContainer.classList.add('hidden');
      }
    
      console.log("is show all", isShowAll)
      // display only first 12 phones if not show all.
      if (!isShowAll) {
         phones = phones.slice(0,12)
      }
      
    
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
         <button onclick="handleShowDetail('${phones.slug}')" id="" class="btn btn-primary">Show Details</button>
       </div>
       </div>
       `  ;
        //4. append child
        phoneContainer.appendChild(phoneCard);
    });

   //  hide loading spinner
   toggleLoadingSpinner(false);
}


const handleShowDetail = async (id) =>{
   console.log("clicked show details", id) 
   // load single phone data

   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
   const data = await res.json();
   const phone = data.data
   showPhoneDetails(phone)
}

const showPhoneDetails =(phones) =>{
   console.log(phones)
   const phoneName = document.getElementById('show-detail-phone-name');
   phoneName.innerText = phones.name
   const showDetailContainer = document.getElementById("show-detail-container")
   showDetailContainer.innerHTML = `
      <img src ="${phones.image} " alt =""/>
      <p class="text-xl font-medium text-center mt-2">Storage: ${phones.mainFeatures.storage}</p>
      <p class="text-xl font-medium text-center" >Display:${phones.mainFeatures.displaySize
      } </p>
      <p class="text-xl font-medium text-center">Chipset:${phones.mainFeatures.chipSet
      } </p>

   `
   
   
   // show the modal
   show_details_modal.showModal()
   
}


const handleSearch = (isShowAll) =>{
   toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    landPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
   const loadingSpinner = document.getElementById('loading-spinner');
   if (isLoading) {
      loadingSpinner.classList.remove('hidden')
   }
   else{
      loadingSpinner.classList.add('hidden')
   }
  
}

// handle show all
const handleShowAll = (isShowAll) =>{
   handleSearch(true)
}


landPhone();