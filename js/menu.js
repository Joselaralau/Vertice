document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript cargado correctamente');
    
    let btnMenu = document.getElementById('btnmenu');
    let menu = document.getElementById('menu');

    // DEBUG: Verificar elementos
    console.log('btnMenu:', btnMenu);
    console.log('menu:', menu);

    // Toggle del menú principal en móvil
    if (btnMenu) {
        btnMenu.addEventListener('click', function(e) {
            console.log('Botón menú clickeado - Estado actual:', menu.classList.contains('mostrar'));
            e.preventDefault();
            e.stopPropagation();
            
            // Alternar la clase 'mostrar'
            if (menu.classList.contains('mostrar')) {
                menu.classList.remove('mostrar');
                console.log('Menú cerrado');
            } else {
                menu.classList.add('mostrar');
                console.log('Menú abierto');
            }
        });
    }

    // Manejo de submenús para TODOS los dispositivos
    const submenuLinks = document.querySelectorAll('.has-submenu > a');
    console.log('Enlaces de submenú encontrados:', submenuLinks.length);
    
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Clic en submenú:', this.textContent);
            console.log('Ancho ventana:', window.innerWidth);
            
            // Si es móvil, prevenir navegación y manejar submenú
            if (window.innerWidth < 1024) {
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
                    console.log('Submenú abierto en móvil');
                } else {
                    parentLi.classList.remove('open');
                    console.log('Submenú cerrado en móvil');
                }
            } else {
                // En desktop, permitir el comportamiento normal del enlace
                console.log('Navegando a:', this.href);
                // No prevenir el comportamiento por defecto en desktop
            }
        });
    });

    // Cerrar menús al hacer clic fuera
    document.addEventListener('click', function(e) {
        // Si el clic NO fue en el menú ni en el botón hamburguesa
        if (!e.target.closest('.menu') && !e.target.closest('#btnmenu')) {
            // Cerrar menú principal en móvil
            if (menu.classList.contains('mostrar')) {
                menu.classList.remove('mostrar');
                console.log('Menú principal cerrado (clic fuera)');
            }
            
            // Cerrar submenús
            document.querySelectorAll('.has-submenu').forEach(item => {
                item.classList.remove('open');
            });
            console.log('Submenús cerrados (clic fuera)');
        }
    });

    // Cerrar menús al redimensionar la ventana
    window.addEventListener('resize', function() {
        console.log('Redimensionando - Ancho:', window.innerWidth);
        
        // Si cambiamos a desktop, cerrar menú móvil
        if (window.innerWidth >= 1024) {
            if (menu.classList.contains('mostrar')) {
                menu.classList.remove('mostrar');
                console.log('Menú móvil cerrado al cambiar a desktop');
            }
        }
        
        // Cerrar submenús al redimensionar
        document.querySelectorAll('.has-submenu').forEach(item => {
            item.classList.remove('open');
        });
    });

    // Manejo especial para desktop - hover y clic
    if (window.innerWidth >= 1024) {
        // Hover para submenús en desktop
        const desktopMenuItems = document.querySelectorAll('.has-submenu');
        
        desktopMenuItems.forEach(item => {
            // Hover para abrir
            item.addEventListener('mouseenter', function() {
                this.classList.add('open');
            });
            
            // Hover para cerrar
            item.addEventListener('mouseleave', function() {
                this.classList.remove('open');
            });
            
            // Clic también funciona en desktop
            const link = item.querySelector('a');
            link.addEventListener('click', function(e) {
                // En desktop, el clic también puede abrir/cerrar
                e.preventDefault();
                e.stopPropagation();
                
                const isOpen = item.classList.contains('open');
                
                // Cerrar otros submenús
                desktopMenuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                    }
                });
                
                // Alternar el actual
                if (!isOpen) {
                    item.classList.add('open');
                } else {
                    item.classList.remove('open');
                }
            });
        });
    }
});