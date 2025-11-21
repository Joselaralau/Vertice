document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript cargado correctamente');
    
    let btnMenu = document.getElementById('btnmenu');
    let menu = document.getElementById('menu');

    if (btnMenu) {
        btnMenu.addEventListener('click', function() {
            console.log('Botón menú clickeado');
            menu.classList.toggle('mostrar');
        });
    }

    const submenuLinks = document.querySelectorAll('.has-submenu > a');
    console.log('Enlaces de submenú encontrados:', submenuLinks.length);
    
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Clic en submenú:', this.textContent);

            e.preventDefault();
            e.stopPropagation();

            const parentLi = this.parentElement;
            const isOpen = parentLi.classList.contains('open');

            document.querySelectorAll('.has-submenu').forEach(item => {
                if (item !== parentLi) {
                    item.classList.remove('open');
                }
            });

            if (!isOpen) {
                parentLi.classList.add('open');
                console.log('Submenú abierto');
            } else {
                parentLi.classList.remove('open');
                console.log('Submenú cerrado');
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-submenu') && !e.target.closest('#btnmenu')) {
            document.querySelectorAll('.has-submenu').forEach(item => {
                item.classList.remove('open');
            });
            console.log('Submenús cerrados (clic fuera)');
        }
    });

    window.addEventListener('resize', function() {
        document.querySelectorAll('.has-submenu').forEach(item => {
            item.classList.remove('open');
        });
    });
});