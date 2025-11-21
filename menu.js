document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript cargado correctamente');
    
    let btnMenu = document.getElementById('btnmenu');
    let menu = document.getElementById('menu');

    // Toggle del menú principal en móvil
    if (btnMenu) {
        btnMenu.addEventListener('click', function() {
            console.log('Botón menú clickeado');
            menu.classList.toggle('mostrar');
        });
    }

    // Submenú para TODOS los dispositivos
    const submenuLinks = document.querySelectorAll('.has-submenu > a');
    console.log('Enlaces de submenú encontrados:', submenuLinks.length);
    
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Clic en submenú:', this.textContent);
            
            // Prevenir el comportamiento por defecto
            e.preventDefault();
            e.stopPropagation();

            const parentLi = this.parentElement;
            const isOpen = parentLi.classList.contains('open');

            // Cerrar otros submenús
            document.querySelectorAll('.has-submenu').forEach(item => {
                if (item !== parentLi) {
                    item.classList.remove('open');
                }
            });

            // Abrir/cerrar el submenú actual
            if (!isOpen) {
                parentLi.classList.add('open');
                console.log('Submenú abierto');
            } else {
                parentLi.classList.remove('open');
                console.log('Submenú cerrado');
            }
        });
    });

    // Cerrar submenús al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-submenu') && !e.target.closest('#btnmenu')) {
            document.querySelectorAll('.has-submenu').forEach(item => {
                item.classList.remove('open');
            });
            console.log('Submenús cerrados (clic fuera)');
        }
    });

    // Cerrar submenús al redimensionar la ventana
    window.addEventListener('resize', function() {
        document.querySelectorAll('.has-submenu').forEach(item => {
            item.classList.remove('open');
        });
    });
});