import dayjs from 'dayjs';
import { registerLightBox, setTextContent } from './utils';
import postApi from './api/postApi';


function renderPostDetail(post) {
    if(!post) return;

    setTextContent(document,'#postDetailTitle', post.title);
    setTextContent(document,'#postDetailDescription', post.description);
    setTextContent(document,'#postDetailAuthor', post.author);
    setTextContent(document,'#postDetailTimeSpan', dayjs(post.updatedAt).format('DD/MM/YYYY HH:mm'));

    const heroImage = document.getElementById('postHeroImage');
    if(heroImage) {
        heroImage.style.backgroundImage = `url("${post.imageUrl}")`;
        heroImage.addEventListener('error',()=>{
            heroImage.style.backgroundImage = url("https://via.placeholder.com/1368x400?text=thumbnail");
        })
    }

    const editPageLink = document.getElementById('goToEditPageLink');
    if(editPageLink){
        editPageLink.href = `/add-edit-post.html?id=${post.id}`
        editPageLink.innerHTML= '<i class="fas fa-edit"></i>Edit Post'
    }
}
;(async () =>{
    registerLightBox({
        modalId: 'lightbox', 
        imgSelector: 'img[data-id="lightboxImg"]',
        prevSelector: 'button[data-id="lightboxPrev"]',
        nextSelector: 'button[data-id="lightboxNext"]',
    });
    //get post id from url 
    //fetch post detail API
    // render post detail
    try {
        const searchParams = new URLSearchParams(window.location.search);
        const postId = searchParams.get('id');
        console.log(postId);
        if (!postId) {
            console.log('Post not found');
            return;
        }
        const post = await postApi.getById(postId);
        renderPostDetail(post);
    } catch (error) {
        console.log('failed to fetch post detail', error);
    }
})()