// State management using JavaScript variables
let currentPage = 'home';
let dropdownOpen = false;

// Show specific page
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  
  // Show selected page
  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = pageId;
  }
  
  // Update active nav link
  updateActiveNav(pageId);
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Close mobile sidebar if open
  closeSidebar();
}

// Update active navigation link
function updateActiveNav(pageId) {
  const navLinks = document.querySelectorAll('.sidebar-menu a');
  navLinks.forEach(link => link.classList.remove('active'));
  
  // Find and activate the correct link
  navLinks.forEach(link => {
    const href = link.getAttribute('onclick');
    if (href && href.includes(pageId)) {
      link.classList.add('active');
    }
  });
}

// Toggle solutions dropdown
function toggleDropdown() {
  const dropdown = document.querySelector('.dropdown');
  dropdownOpen = !dropdownOpen;
  
  if (dropdownOpen) {
    dropdown.classList.add('open');
  } else {
    dropdown.classList.remove('open');
  }
  
  return false;
}

// Toggle mobile sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// Close mobile sidebar
function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('active');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.querySelector('.mobile-toggle');
  
  if (window.innerWidth <= 768) {
    if (!sidebar.contains(event.target) && !toggle.contains(event.target)) {
      closeSidebar();
    }
  }
});

// Initialize Revenue Chart
function initRevenueChart() {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2025', '2026', '2027', '2028', '2029'],
      datasets: [{
        label: 'Revenue ($M)',
        data: [75, 150, 270, 390, 470],
        backgroundColor: '#DB0011',
        borderColor: '#B8000E',
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 60
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#1A1A1A',
          padding: 12,
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 14
          },
          callbacks: {
            label: function(context) {
              return 'Revenue: $' + context.parsed.y + 'M';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
          },
          ticks: {
            font: {
              size: 12,
              weight: '500'
            },
            callback: function(value) {
              return '$' + value + 'M';
            },
            padding: 10
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            font: {
              size: 12,
              weight: '600'
            },
            padding: 10
          }
        }
      }
    }
  });
}

// Initialize when page loads
window.addEventListener('load', function() {
  // Show home page by default
  showPage('home');
  
  // Initialize chart
  initRevenueChart();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
  showPage('home');
});