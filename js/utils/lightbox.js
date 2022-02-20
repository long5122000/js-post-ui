function showModal(modalElement){
    if(!window.bootstrap) return;
    const modal = new bootstrap.Modal(modalElement)
    if(modal) modal.show();
}


export function registerLightBox({
    modalId ,
    imgSelector,
    prevSelector,
    nextSelector,
}) {
    const modalElement = document.getElementById(modalId);
    if(!modalElement) return;

    if(Boolean(modalElement.dataset.registered)) return;
    const imageElement = modalElement.querySelector(imgSelector);
    const prevButton = modalElement.querySelector(prevSelector);
    const nextButton = modalElement.querySelector(nextSelector);

    if(!imageElement || !prevButton || !nextButton) return;

    let imgList = [];
    let currentIndex = 0;

    function showImageAtIndex(index) {
        imageElement.src = imgList[index].src;
    }
    //handle click for all images -> event delegation
    // img click -> find all imgs with the same album / gallery
    // determine index of selected img
    // handle prev/ next click 


    document.addEventListener('click',(e)=>{
        const {target} = e;
        if (target.tagName !== 'IMG' || !target.dataset.album) return ;

         imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`)
         currentIndex = [...imgList].findIndex((x)=>x ===target)
        console.log({target,currentIndex, imgList});

        showImageAtIndex(currentIndex);
        showModal(modalElement);
    })

    prevButton.addEventListener('click',()=>{
        currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
        showImageAtIndex(currentIndex);
    })
    nextButton.addEventListener('click',()=>{
        currentIndex = (currentIndex + 1) % imgList.length;
        showImageAtIndex(currentIndex);
    })
    modalElement.dataset.registered = true;
}