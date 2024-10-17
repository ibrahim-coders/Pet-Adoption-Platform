// Mobile Menu
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

let petPrice = [];

// Pet button Categories
const loadingSpinner = () => {
  const loading = document.getElementById('loading-container');
  const petAll = document.getElementById('pet-all');

  loading.classList.remove('hidden');
  petAll.classList.add('hidden');

  setTimeout(() => {
    loading.classList.add('hidden');
    petAll.classList.remove('hidden');
  }, 2000);
};

const btnContainerCategories = async id => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/categories`
    );
    const data = await res.json();

    petButtonCategories(data.categories);
  } catch (error) {
    console.error(error);
  }
};

const activeCategory = () => {
  const buttons = document.getElementsByClassName('Categories-btn');

  for (let btn of buttons) {
    btn.classList.remove('active');
  }
};

// pets dog and cat api
const petsLodaingCategories = async (category, id) => {
  try {
    // Show loading spinner
    document.getElementById('loading-container').style.display = 'block';
    const petssAll = document.getElementById('pet-all');
    petssAll.innerHTML = '';

    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${category}`
    );

    const data = await res.json();

    petPrice = data.data;
    setTimeout(() => {
      document.getElementById('loading-container').style.display = 'none';
      activeCategory();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add('active');

      petsAllCategories(data.data);
    }, 2000);
  } catch (error) {
    console.error(error);
    document.getElementById('loading-container').style.display = 'none';
  }
};

// Pet button Categories
const petButtonCategories = buttons => {
  // console.log(buttons);
  const btnContainer = document.getElementById('btn-container');

  buttons.forEach(btn => {
    const btnDivElement = document.createElement('div');
    btnDivElement.classList.add(
      'w-full',
      'flex',
      'justify-between',
      'text-center',
      'mx-auto'
    );
    btnDivElement.innerHTML = `

<button id="btn-${btn.id}" onclick="petsLodaingCategories('${btn.category}',${btn.id})" class="Categories-btn px-8 py-4 btn-outline  sm:w-1/2 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] mx-auto sm:mx-auto btn hover:bg-[#0E7A81] hover:text-white">
  <img class="w-6 h-6 pb-1" src="${btn.category_icon}" alt="" /> 
        <span>${btn.category}</span>
      </button>

    `;

    btnContainer.appendChild(btnDivElement);
  });
};

// petsAll partbCategories;

const petsAll = async () => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pets`
    );
    const data = await res.json();
    petPrice = data.pets;
    petsAllCategories(data.pets);
  } catch (error) {
    console.error(error);
  }
};

const petsAllCategories = pets => {
  // console.log(pets);
  const petssAll = document.getElementById('pet-all');
  petssAll.innerHTML = '';
  pets.length === 0
    ? (petssAll.classList.remove('grid'),
      (petssAll.innerHTML = `
  <div class="w-full mx-auto flex flex-col items-center text-center p-10  bg-gray-200 shadow-md rounded-md">

  <img src="Image/error.webp" alt="" class="w-32 h-32 md:w-40 md:h-40 flex justify-center items-center">

  <h2 class="text-xl md:text-3xl font-bold text-gray-800 py-4">No Information Available</h2>

  <p class="text-md md:text-xl font-medium text-gray-800">
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at
    its layout. The point of using Lorem Ipsum is that it has a.
  </p>

</div>
  `))
    : petssAll.classList.add('grid');

  pets.forEach(pet => {
    // console.log(pet);
    const petDivElement = document.createElement('div');
    petDivElement.classList.add(
      'card',
      'card-compact',
      'shadow-[rgba(0,0,0,0.24)_0px_3px_8px]',
      'rounded-lg',
      'p-4'
    );
    petDivElement.innerHTML = `
    
 <figure>
              <img src="${pet.image}" alt="pet"
                class="rounded-lg w-full" />
            </figure>
            <div class=" my-2">
              <h2 class="card-title text-2xl font-bold text-gray-800">${
                pet.pet_name
              }</h2>

              <!-- Breed -->

              <p class="text-sm text-gray-600 flex items-center gap-2">
                <i class='bx bx-customize text-xl'></i>
                <span class="font-semibold">Breed:</span> ${
                  pet.breed ? pet.breed : 'Not available'
                }
              </p>

              <!-- Birth -->

              <p class="text-sm text-gray-600 flex items-center gap-2">
                <i class='bx bxs-calendar-alt text-xl'></i>
                <span class="font-semibold">Birth Date:</span>
                
                ${pet.date_of_birth ? pet.date_of_birth : 'Not available'}
              </p>

              <!-- Gender -->

              <p class="text-sm text-gray-600 flex items-center gap-2">
                <i class='bx bx-body text-xl'></i>
                <span class="font-semibold">Gender:</span> ${pet.gender}
                
              </p>

              <!-- Price -->

              <p class="text-sm text-gray-600 flex items-center gap-2">
                <i class='bx bx-dollar-circle text-xl'></i>
                <span class="font-semibold">Price:</span>${
                  pet.price ? pet.price : 'Not available'
                }
              </p>
              <div class=" w-full border mt-4 border-gray-100">
                <!-- Content with a red border -->
              </div>

              <!-- Button liks -->
              <div class=" w-full flex justify-between items-center mt-4 gap-1 mx-auto">
                <button onclick="likeImage('${pet.image}')"
                  class="shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] btn btn-outline btn-success"><i
                    class='bx bx-like text-2xl'></i></button>

                <!--Adopt -->

                <button onclick="adopModal(this)" 
                  class="shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] btn btn-outline btn-success">Adopt</button>

                <!--Details button -->

                <button onclick="petsDetails('${pet.petId}')" 
                  class="shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] btn btn-outline btn-success">Details</button>
              </div>
            </div>

    `;
    petssAll.appendChild(petDivElement);
  });
};

// pets details

const petsDetails = async details => {
  // console.log(details);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${details}`;
  const res = await fetch(uri);
  const data = await res.json();
  showDetails(data);
};

const showDetails = detailsOpen => {
  // console.log(detailsOpen);
  const petsAllContent = document.getElementById('pets-allContent');
  petsAllContent.innerHTML = `
  
    <img class="w-full" src="${detailsOpen.petData.image}" alt="">
     <div class=" my-2">
              <h2 class="card-title text-2xl font-bold mt-4 text-gray-800">${
                detailsOpen.petData.pet_name
              }</h2>

        <div class="flex gap-8 w-full">
        
           <div>
           <!-- Breed -->
              <p class="text-sm text-gray-600 flex items-center gap-2">
                <i class='bx bx-customize text-xl'></i>
                <span class="font-semibold">Breed:</span> ${
                  detailsOpen.petData.breed
                    ? detailsOpen.petData.breed
                    : 'Not available'
                }
              </p>

              <!-- Gender -->
              <p class="text-sm text-gray-600 flex items-center gap-2">
                <i class='bx bx-body text-xl'></i>
                <span class="font-semibold">Gender:</span> ${
                  detailsOpen.petData.gender
                }
              </p>
              <p class="text-sm text-gray-600 flex items-center gap-2">
                <i class='bx bx-body text-xl'></i>
                <span class="font-semibold">vaccinated_status
:</span> ${detailsOpen.petData.vaccinated_status}
              </p>
</div>
            <div>
  <!-- Birth -->
              <p class="text-sm text-gray-600 flex items-center gap-2">
                <i class='bx bxs-calendar-alt text-xl'></i>
                <span class="font-semibold">Birth Date:</span>

                ${
                  detailsOpen.petData.date_of_birth
                    ? detailsOpen.petData.date_of_birth
                    : 'Not available'
                }
              </p>

              <!-- Price -->
              <p class="text-sm text-gray-600 flex items-center gap-2">
                <i class='bx bx-dollar-circle text-xl'></i>
                <span class="font-semibold">Price:</span>${
                  detailsOpen.petData.price
                    ? detailsOpen.petData.price
                    : 'Not available'
                }
              </p>
            </div>


      
        </div>

            </div>
<div class=" w-full border mt-4 border-gray-200">
                
              </div>
        <h5 class="text-xl font-medium text-gray-800 my-2">Details Information</h5>
  <p class="text-sm  text-gray-800 my-2">${detailsOpen.petData.pet_details}</p>
   <form method="dialog">

        <button class="btn btn-outline btn-success w-full mt-4">Close</button>
      </form>
  `;
  document.getElementById('petDetalis').showModal();
};

// like button
const likeImage = image => {
  const petsimage = document.getElementById('pets-img');
  const div = document.createElement('div');
  // div.classList.add('')
  div.innerHTML = `
 <div class="w-full">
  <img src="${image}" class=" w-full p-2 text-center mx-auto items-center" alt="">
 </div>

`;
  petsimage.appendChild(div);
};

petsAll();
btnContainerCategories();

// adpot button
function adopModal(btn) {
  const modal = document.getElementById('modal');
  const element = document.getElementById('demo');

  modal.classList.remove('hidden');
  modal.classList.add('show');

  btn.textContent = 'Processing...';
  btn.disabled = false;

  let counter = 4;
  const intervalId = setInterval(function () {
    counter--;
    element.textContent = counter;
  }, 1000);

  setTimeout(function () {
    modal.classList.add('hidden');
    modal.classList.remove('show');
    clearInterval(intervalId);
    btn.textContent = 'Adopted';
    btn.disabled = true;
  }, 3400);
}

// sort - price

document.getElementById('sort-btn').addEventListener('click', function () {
  const data = petPrice?.sort((a, b) => b.price - a.price);

  petsAllCategories(data);
});
