window.addEventListener('DOMContentLoaded', () => {
    
    const btn_responsive = document.querySelector('.btn_responsive')
    const nav_items = document.querySelector('.navItems')

    btn_responsive.addEventListener('click', () => btnResponsive(nav_items))

})

function btnResponsive(nav_items){
    nav_items.classList.toggle('ocultar')
}