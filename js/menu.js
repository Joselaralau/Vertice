document.addEventListener('DOMContentLoaded', function() {
    let btnMenu = document.getElementById('btnmenu');
    let menu = document.getElementById('menu');

    // Función para saber si estamos en un tamaño de pantalla "móvil" (menor a 1024px)
    function isMobileSize() {
        return window.innerWidth < 1024;
    }

    // 1. Toggle del menú principal en móvil
    if (btnMenu) {
        btnMenu.addEventListener('click', function() {
            menu.classList.toggle('mostrar');
        });
    }

    // 2. Lógica del Submenú: Clic en móvil, Hover en desktop
    const submenuLinks = document.querySelectorAll('.has-submenu > a');
    
    submenuLinks.forEach(link => {
        
        const clickHandler = function(e) {
            // ⭐ CLAVE: Solo ejecuta la lógica de clic si es tamaño móvil
            if (isMobileSize()) {
                e.preventDefault(); // Evita ir al enlace
                e.stopPropagation();

                const parentLi = this.parentElement;
                const isOpen = parentLi.classList.contains('open');

                // Cierra otros submenús abiertos por clic
                if (menu.classList.contains('mostrar')) {
                    document.querySelectorAll('.has-submenu').forEach(item => {
                        if (item !== parentLi) {
                            item.classList.remove('open');
                        }
                    });
                }
                
                // Abre/cierra el submenú actual
                if (!isOpen) {
                    parentLi.classList.add('open');
                } else {
                    parentLi.classList.remove('open');
                }
            }
            // Si NO es tamaño móvil (desktop), el evento NO se previene
            // y el submenú funciona con el CSS :hover
        };

        link.addEventListener('click', clickHandler);
    });

    // 3. Cerrar submenús al redimensionar la ventana
    window.addEventListener('resize', function() {
        if (!isMobileSize()) {
             // Si pasamos a desktop, limpiamos la clase 'open' de móvil
             document.querySelectorAll('.has-submenu').forEach(item => {
                item.classList.remove('open');
            });
        }
    });
});