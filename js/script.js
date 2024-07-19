let doglist = document.getElementById('doglist');
let image = document.getElementById('image');

const getDogList = () => {
    fetch('https://dog.ceo/api/breeds/list/all').then((rec => {

        return rec.json();

    })).then((data => {
        let count = 0;
        
        console.log(data.message);
        const list = data.message;

        for (const key in list) {

            if(list[key].length == 0){
                doglist.innerHTML += `<li><div onclick="return imagelist('${key}')" style="background-color: white; border: 1px solid gray; box-shadow: 0px 2px 10px gray;" class="p-3 mt-3">${key}</div></li>`
            }
            else{
                count++;
                
                let breedlist = `<ol>`
            
                let uniqueId = `${count}`

                list[key].forEach(ele => {
                    breedlist += `<li>${ele}</li>`
                });

                breedlist += `</ol>`;

                doglist.innerHTML += `<div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed mt-3" type="button" data-bs-toggle="collapse" data-bs-target="#${uniqueId}" aria-expanded="false" aria-controls="${uniqueId}" onclick = "return imagelist('${key}')" style="background-color: white; border: 1px solid gray; box-shadow: 0px 2px 10px gray;">
                            ${key}
                        </button>
                    </h2>
                    <div id="${uniqueId}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            ${breedlist}
                        </div>
                    </div>
                </div>`
            }
        }

    })).catch((err) => {

        console.log("err : ", err);
    })
}

getDogList();

const imagelist = (breed) => {

    fetch(`https://dog.ceo/api/breed/${breed}/images`).then((rec) => {

        return rec.json();

    }).then((data) => {
    
        console.log(data);

        let imges = data.message;

        image.innerHTML = "";

        imges.forEach((ele) => {

            image.innerHTML += `<div class ="w-4"><div><img src="${ele}"></div></div>`
        });

    }).catch((err) => {
        
        console.log("errrr : ", err);
    });
}