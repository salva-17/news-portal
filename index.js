const cards = document.querySelector('.cards');
const category= document.querySelector('.category');
const categorySpan = document.querySelectorAll('.category span');

const baseUrl='https://newsapi.org/v2';
const apiKey='XXXXXXXXXXXXXXXXXXXXXXXX';
const backupImg='https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

//const url= 'https://newsapi.org/v2/top-headlines?country=us&apiKey=XXXXXXXXXXXXXXXXXXXXXXXX';

async function dataRequest(url){
    try{
        const response= await fetch(baseUrl + url + '&apiKey=' +apiKey);
        const json= response.json();
        return json;
    }catch(error){
        console.log(error);
    }

}

function urlRequest(url){
    dataRequest(url).then(data => {
        data.articles.forEach(item => {
            cards.innerHTML += `<div class="card">
                                    <div class="image">
                                        <img src="${item.urlToImage ? item.urlToImage : backupImg }" alt="">
                                    </div>
                                    <div class="information">
                                        <div>
                                            <p class="title">${item.title}</p>
                                            <p class="description">${item.description}</p>
                                            <p class="time">
                                                <span>${item.publishedAt.replace('Z', ' ').split('T')[1]}</span>
                                                <span>${item.publishedAt.replace('Z', ' ').split('T')[0]}</span>
                                            </p>
                                        </div>
                                        <div class="other">
                                            <span class="source">${item.source.name}</span>
                                            <a class="url" target="_blank" href="${item.url}">Read Article <i class="bi bi-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>`
        });    
    })
}

category.addEventListener('click', event => {
    if(event.target.tagName==='SPAN'){
        cards.innerHTML='';
        urlRequest(event.target.dataset.id);
        categorySpan.forEach(item => item.classList.remove('active'));
        event.target.classList.add('active')
    }
    
})

urlRequest('/top-headlines?country=us&category=business');


