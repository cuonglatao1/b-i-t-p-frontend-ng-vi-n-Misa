/**
 * Sidebar Module
 * Xu ly thu gon/mo rong sidebar
 */

const SidebarModule = {
    sidebar: null,
    toggleBtn: null,
    sidebarItems: null,
    isCollapsed: false,

    /**
     * Khoi tao sidebar
     */
    init() {
        this.sidebar = document.getElementById('sidebar');
        this.toggleBtn = document.getElementById('sidebarToggle');
        this.sidebarItems = document.querySelectorAll('.sidebar-item');

        // Load trang thai tu localStorage
        this.isCollapsed = Storage.getSidebarState();
        if (this.isCollapsed) {
            this.sidebar?.classList.add('collapsed');
        }

        this.bindEvents();
    },

    /**
     * Gan su kien
     */
    bindEvents() {
        this.toggleBtn?.addEventListener('click', () => {
            this.toggle();
        });

        // Xu ly click cho cac sidebar items
        this.sidebarItems?.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveItem(item);
            });
        });
    },

    /**
     * Set active item
     */
    setActiveItem(clickedItem) {
        // Remove active class from all items
        this.sidebarItems?.forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked item
        clickedItem.classList.add('active');
    },

    /**
     * Thu gon/mo rong sidebar
     */
    toggle() {
        this.isCollapsed = !this.isCollapsed;

        if (this.isCollapsed) {
            this.sidebar?.classList.add('collapsed');
        } else {
            this.sidebar?.classList.remove('collapsed');
        }

        // Luu trang thai
        Storage.saveSidebarState(this.isCollapsed);
    }
};
