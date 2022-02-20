export function renderPagination(elementId,pagination){
    const ulPagination =document.getElementById(elementId);
    if(!ulPagination || !pagination) return;
    const {_page,_limit,_totalRows} = pagination;
    const totalPages = Math.ceil(_totalRows/_limit);
    ulPagination.dataset.page = _page;
    ulPagination.dataset.totalPages = totalPages;

    if(_page <=1) ulPagination.firstElementChild?.classList.add('disabled')
    else ulPagination.firstElementChild?.classList.remove('disabled')

    if(_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled')
    else ulPagination.lastElementChild?.classList.remove('disabled')
}

export function initPagination({elementId, defaultParams,onChange}){
    // bind click event for prev.next link
    const ulPagination = document.getElementById(elementId);
    if(!ulPagination) return;

    // add click event for prev link
    const prevLink = ulPagination.firstElementChild?.firstElementChild;
    if(prevLink){
        prevLink.addEventListener('click', (e)=>{
            e.preventDefault();
            const page = Number.parseInt(ulPagination.dataset.page) ||1
            if(page >=2) onChange?.( page - 1);
        })
    }

    // add click event for next link
    const nextLink = ulPagination.lastElementChild?.lastElementChild
    if(nextLink){
        nextLink.addEventListener('click', (e)=>{
            e.preventDefault();
            const page = Number.parseInt(ulPagination.dataset.page) || 1;
            const totalPages = ulPagination.dataset.totalPages;
            if(page < totalPages) onChange?.( page + 1);
        })
    }
}