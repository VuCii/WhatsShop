// Modern Navigation
document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Dynamic Product Filtering
    const filterProducts = (category) => {
        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.style.display = 'block';
                product.style.animation = 'fadeIn 0.5s ease';
            } else {
                product.style.display = 'none';
            }
        });
    };

    // Cart Functionality
    const cart = {
        items: [],
        total: 0,
        
        addItem(product) {
            this.items.push(product);
            this.updateTotal();
            this.updateCartUI();
        },
        
        updateTotal() {
            this.total = this.items.reduce((sum, item) => sum + item.price, 0);
        },
        
        updateCartUI() {
            // Update cart display
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = this.items.length;
            
            // Update total display
            const cartTotal = document.querySelector('.cart-total');
            cartTotal.textContent = `$${this.total.toFixed(2)}`;
        }
    };

    // Modern Search with Debounce
    const searchProducts = debounce((searchTerm) => {
        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            const matches = title.includes(searchTerm.toLowerCase());
            product.style.display = matches ? 'block' : 'none';
            if (matches) {
                product.style.animation = 'fadeIn 0.5s ease';
            }
        });
    }, 300);

    // Intersection Observer for lazy loading and animations
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.animation = 'fadeIn 0.5s ease forwards';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.product, .section-title').forEach(el => {
            observer.observe(el);
            el.style.opacity = '0';
        });
    };

    // Cart Toggle
    const toggleCart = () => {
        const cart = document.querySelector('.cart-section');
        cart.classList.toggle('active');
    };

    // Debounce Helper
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Dark/Light Mode Toggle
    const toggleTheme = () => {
        document.body.classList.toggle('light-mode');
        const isDark = !document.body.classList.contains('light-mode');
        localStorage.setItem('darkMode', isDark);
    };

    // Initialize theme
    const initializeTheme = () => {
        const prefersDark = localStorage.getItem('darkMode') !== 'false';
        if (!prefersDark) {
            document.body.classList.add('light-mode');
        }
    };

    // Call initialization functions
    observeElements();
    initializeTheme();
});
