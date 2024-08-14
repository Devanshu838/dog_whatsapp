const main_url =`https://dogapi.dog/api/v2`;
console.log(main_url);

const breed__button = document.getElementById("breed");
breed__button.addEventListener("click",cardPage);

const group__button = document.getElementById("group");
group__button.addEventListener("click",groupPage);

const fact__button = document.getElementById("fact");
fact__button.addEventListener("click",factData);

const container=document.getElementById("container");

async function fetchData(data_lekar_aja){
    const new_url =await fetch(data_lekar_aja);
    const convertJson =await new_url.json();
    return convertJson;
}
const factContainer=document.createElement("div");
factContainer.classList.add("factContainer");

async function factData(){
    const fact_url=`${main_url}/facts`;
    const {data}=await fetchData(fact_url);
    container.innerHTML = "";
    console.log("fact data is",data);
    container.appendChild(factContainer);
    for(let fact of data){
        const para = document.createElement("p");
        para.classList.add("para");
        para.innerHTML = fact.attributes.body;
        factContainer.appendChild(para);
    }
    
}

async function cardPage(){
    container.innerHTML="";
    const card_parent=document.createElement("div");
    card_parent.classList.add("card_parent");
    container.append(card_parent);
    const callurl=`${main_url}/breeds`;
    const callfetch=await fetchData(callurl);
    console.log(callfetch);
    const catchMapingData=[];
    callfetch.data.map((passdata)=>{
         catchMapingData.push(cardMaker(passdata));
    })
    for (let i=0; i<catchMapingData.length; i++) {
        (function(i){
            setTimeout(function(){
                card_parent.appendChild(catchMapingData[i]);
            },i*100);
        })(i);
    }
}

function cardMaker(passdata){
    const card =document.createElement("div");
    card.classList.add("card");
    card.innerHTML=`
    <h3 class="card-head">${passdata.attributes.name}</h3>
    <p class="card-body">${passdata.attributes.description.substring(0,60)}</p>
    <h3 class="card-bottom"><i onClick =whatsappPage()>Learn More <i class="fa-solid fa-arrow-right"></i> <i/></h3>               
    `;
    return card;
}


const whatsappContainer=document.createElement("div");
whatsappContainer.classList.add("whatsappContainer");

const left_screen=document.createElement("div");
left_screen.classList.add("left_screen");

const right_screen=document.createElement("div");
right_screen.classList.add("right_screen");

async function whatsappPage(){
    container.innerHTML="";
    container.appendChild(whatsappContainer);
    
    whatsappContainer.appendChild(left_screen);
    
    const call_main_url=`${main_url}/breeds`;
    const filterWithFetch= await fetchData(call_main_url);
    const data_catcher=[];
    filterWithFetch.data.map((pass)=>{
        data_catcher.push(left_screen_data(pass));
    })
    for (let i=0; i<data_catcher.length; i++) {
        (function(i){
            setTimeout(function(){
                left_screen.appendChild(data_catcher[i]);
            },i*100);
        })(i);
    }
    
}
function left_screen_data(pass){
    const dog_data=document.createElement("div");
    dog_data.classList.add("dog_data");
    dog_data.innerHTML=`
    ${pass.attributes.name};
    <i class="icon" onClick= main_screen_data("${pass.id}")><i class="fa-solid fa-arrow-right"></i></i>
    `;
    return dog_data;
}
async function main_screen_data(id){
    // console.log("id is ", id);
    const new_url = `${main_url}/breeds/${id}`;
    const {data} = await fetchData(new_url); 
    console.log("data uis ", data);
    whatsappContainer.appendChild(right_screen);
    
    const main_screen_data=document.createElement("div");
    main_screen_data.classList.add("main_data");
    right_screen.innerHTML=``;
    main_screen_data.innerHTML=`
    <h1>${data.attributes.name}</h1>
    <p>${data.attributes.description}</p>
    <p>Hypoallergenic: ${data.attributes.hypoallergenic}</p>
    <div class="life_parent">
    <p>Maximum life: ${data.attributes.life.max}</p>
    <p>Minimum life: ${data.attributes.life.min}</p>
    </div>
    <div class="weight_parent">
    <div class="weight_child">
    <p>Male weight max: ${data.attributes.male_weight.max}</p>
    <p>Male weight min: ${data.attributes.male_weight.min}</p>
    </div>
    <div class="weight_child">
    <p>Female weight max: ${data.attributes.female_weight.max}</p>
    <p>Female weight min: ${data.attributes.female_weight.min}</p>
    </div>
    </div>
    `;
    right_screen.appendChild(main_screen_data);   
}

const groupContainer=document.createElement("div"); 
async function groupPage(){
    container.innerHTML="";
    groupContainer.classList.add("groupContainer");
    container.appendChild(groupContainer);

    const group_url=`${main_url}/groups`;
    const fetch=await fetchData(`${group_url}`);
    console.log("group data is",fetch);
    const catchData=[];
    fetch.data.map((pass)=>{
        catchData.push(group_data(pass));
    })
    for (let i=0; i<catchData.length; i++) {
        (function(i){
            setTimeout(function(){
                groupContainer.appendChild(catchData[i]);
            },i*100);
        })(i);
    }
}

function group_data(pass){
    groupContainer.innerHTML="";
    const group_card=document.createElement("div");
    group_card.classList.add("group_card");
    group_card.innerHTML=`
    <h1>${pass.attributes.name}</h1> 
    <p><button class="group_data_button" onClick=group_left_data()>Show Dogs</button>
    
    `;
    return group_card;
}
const group_whatsapp_container=document.createElement("div");
group_whatsapp_container.classList.add("group_whatsapp_container");

const group_left_screen=document.createElement("div");
group_left_screen.classList.add("group_left_screen");

const group_right_screen=document.createElement("div");
group_right_screen.classList.add("group_right_screen");

async function group_left_data(){
    groupContainer.innerHTML="";
    groupContainer.appendChild(group_whatsapp_container);
    
    group_whatsapp_container.appendChild(group_left_screen);

    const url=`${main_url}/groups`;
    const fetching=await fetchData(url);
    // console.log("url is",fetching);
    const catching=[];
    fetching.data.map((pass)=>{
        catching.push(group_chat_data(pass));
    })
    for (let i=0; i<catching.length; i++) {
        (function(i){
            setTimeout(function(){
                group_left_screen.appendChild(catching[i]);
            },i*100);
        })(i);
    }
} 
function group_chat_data(pass){
    const group_chat=document.createElement("div");
    group_chat.classList.add("group_chat");
    group_chat.innerHTML=`
    <p>${pass.attributes.name}
    <i class="iconss" onClick =showBreedsWithId("${pass.id}")> <i class="fa-solid fa-arrow-right"></i>
     </i>
    </p>
    `;
    return group_chat;
}

async function showBreedsWithId(pass){
        group_right_screen.innerHTML = "";
        group_whatsapp_container.appendChild(group_right_screen);
        const new_main_url=`${main_url}/groups/${pass}`;
        const do_fetch =await fetchData(new_main_url);
        const breed_dog_id_array = do_fetch.data.relationships.breeds.data;
        
        for(let dog of breed_dog_id_array){
            const dog_data = await getDogID(dog.id);
            showDogsWithId(dog_data)
        }
        async function getDogID(id){
            const dog_data = await fetchData(`${main_url}/breeds/${id}`);
            return dog_data.data;
        }
        
        
        
        
        
    }
    function showDogsWithId(item){
    const group_dog=document.createElement("div");
    group_dog.classList.add("group_dog");
    group_right_screen.appendChild(group_dog);
    group_dog.innerHTML=`${item.attributes.name}`;
}
