document.addEventListener('DOMContentLoaded', function() {
    let btnMenu = document.getElementById('btnmenu');
    let menu = document.getElementById('menu');

    // Define el punto de corte (debe ser igual al usado en tu CSS: 1024px)
    function isMobileSize() {
        return window.innerWidth < 1024;
    }

    // 1. Toggle del menú principal (Hamburguesa)
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
                e.preventDefault(); // Detiene la navegación (solo en móvil)
                e.stopPropagation();

                const parentLi = this.parentElement;
                
                // Cierra otros submenús
                document.querySelectorAll('.has-submenu').forEach(item => {
                    if (item !== parentLi) {
                        item.classList.remove('open');
                    }
                });
                
                parentLi.classList.toggle('open');
            }
        };

        link.addEventListener('click', clickHandler);
    });

    // 3. Limpieza al redimensionar a escritorio
    window.addEventListener('resize', function() {
        if (!isMobileSize()) {
             // Limpia la clase 'open' y 'mostrar' para que el CSS tome control
             document.querySelectorAll('.has-submenu').forEach(item => {
                item.classList.remove('open');
            });
             menu.classList.remove('mostrar');
        }
    });
});