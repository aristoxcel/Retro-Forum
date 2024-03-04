const discussHandler= document.getElementById('discuss-handler');
const titleAdd= document.getElementById('title-add');
const latestForum= document.getElementById('latest-forum');


const fetchData =()=>{
    setTimeout(async()=>{
        const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
        const data = await res.json();
        const {posts}=data;
        loader.classList.add("hidden");
        getDiscussCard(posts);
    },2000);
    loader.classList.remove("hidden")
}

// fetch data through search
const fetchSearchData = (value)=>{
    setTimeout(async()=>{
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`)
        const data = await res.json();
       
        const {posts}=data;
        loader.classList.add("hidden");
        getDiscussCard(posts);
    },2000);
    discussHandler.innerHTML="";
    loader.classList.remove("hidden")
}

// fetch data pass through function
const getDiscussCard=(posts)=>{
    if (posts.length===0){
        alert('Your Search item do not found, Please give correct input as- coding, comedy or music');
        document.getElementById('search-input').value="";
    }
    posts.forEach(post=>{
        console.log(post.isActive);
        let active =post.isActive;
      
        const discussApiDiv = document.createElement('div');
        discussApiDiv.className =`bg-[#F3F3F5] rounded-3xl`;
        discussApiDiv.innerHTML=`
        <div class="grid grid-cols-6 gap-4 p-7">

            <div class="col-span-1 pt-4">
                <div class="flex flex-row-reverse">
                    <div>
                        <span class="relative flex h-3 w-3">
                        <span class='${active?"animate-ping absolute inline-flex h-full w-full rounded-full bg-green-700  opacity-75 ":"animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700  opacity-75 "}'></span>
                        <span class='${active?"relative inline-flex rounded-full bg-green-700 h-3 w-3":"relative inline-flex rounded-full bg-red-700 h-3 w-3"}'></span>
                        </span>
                    </div>
                    <img class="rounded-2xl" src="${post.image}" />
                </div>
            </div>

            <div class="col-span-5 ">
                <div class="flex gap-5 font-inter text-sm font-medium text-gray-700">
                    <p>#<span>${post.category}</span></p>
                    <p>Author: <span>${post.author.name}</span></p>
                </div>
                <h1 class="font-mulish font-bold text-xl my-4">${post.title}</h1>
                <p class="font-inter text-gray-400">${post.description}</p>
                <div class="divider divide-dotted"></div> 
                <div class="flex justify-between">
                    <div class="flex gap-5 font-inter">
                        <div class="flex  items-center"><img src="images/msg.png" alt=""><h1>${post.comment_count}</h1></div>
                        <div class="flex  items-center"><img src="images/eye.png" alt=""><h1>${post.view_count}</h1></div>
                        <div class="flex  items-center"><img src="images/watch.png" alt=""><h1>${post.posted_time} min</h1></div>
                    </div>
                    <div><button onclick='selectedForum("${post.title.replace(/'/s,'')}","${post.view_count}")'><img src="images/email.png" alt=""></button></div>
                </div>
            </div>
        </div>
        `
        
        discussHandler.appendChild(discussApiDiv);   
    });
    
}


// when clients read the forum that is coming from fetchData, if clients click on email button this selectedForum will be created
let count= 0;
const selectedForum=(id1, id2)=>{
    const selectedDiv = document.createElement('div');
    selectedDiv.className=`flex justify-between bg-white rounded-2xl p-4 mb-3`;
    selectedDiv.innerHTML=`
    <h1 class="font-mulish font-semibold text-lg">${id1}</h1>
    <div class="flex  items-center gap-1">
        <img src="images/eye.png" alt="">
        <h1 class="font-inter text-gray-500">${id2}</h1>
    </div>
    `
    titleAdd.appendChild(selectedDiv);
    count++;
    document.getElementById('count-show').innerText= count;
}

fetchData()


// if clients want to search on search bar to find specific category
const searchData=()=>{
    let value=document.getElementById('search-input').value;
    value = value.trim();
    if (!value){
        alert("You could not write anything in the Search Box")
    }
    else{
        fetchSearchData(value);
    }
    
}

/* -------------------- */
/* Latest Forum Section */
/* -------------------- */

const latestData =async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json();
  
    data.forEach(item=>{
        // console.log(item.title);
        const latestApiDiv = document.createElement('div');
        latestApiDiv.className=`border border-gray-300 rounded-3xl space-y-5 p-5`;
        latestApiDiv.innerHTML=`
        <img src="${item.cover_image}" alt="" class="rounded-2xl">
        <div class="flex gap-2">
            <img src="images/bag.png" alt="">
            <p>${item?.author?.posted_date===undefined ? 'No Published Date' : item?.author?.posted_date}</p>
        </div>
        <h2 class="font-mulish text-lg font-bold">${item.title}</h2>
        <p class="font-mulish text-gray-400">${item.description}</p>
        <div class="flex justify-left items-center gap-5">
            <img width="20%" src="${item.profile_image}" alt="" class="rounded-full">
            <div >
                <h2>${item.author.name}</h2>
                <p class="text-gray-400 py-2">${item?.author?.designation===undefined ? 'Unknown' : item?.author?.designation}</p>
            </div>
        </div>
        `
        latestForum.appendChild(latestApiDiv);
    });
}

latestData();