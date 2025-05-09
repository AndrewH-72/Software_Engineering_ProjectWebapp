document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      const htmlElement = document.documentElement;
      
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="bi bi-sun"></i>';
      }
      
      // Toggle theme
      darkModeToggle.addEventListener('click', function() {
        if (htmlElement.getAttribute('data-bs-theme') === 'dark') {
          htmlElement.setAttribute('data-bs-theme', 'light');
          localStorage.setItem('theme', 'light');
          darkModeToggle.innerHTML = '<i class="bi bi-moon"></i>';
        } else {
          htmlElement.setAttribute('data-bs-theme', 'dark');
          localStorage.setItem('theme', 'dark');
          darkModeToggle.innerHTML = '<i class="bi bi-sun"></i>';
        }
      });
    }
    
    // Task completion animation
    const taskCompletionCheckboxes = document.querySelectorAll('.task-completion-checkbox');
    taskCompletionCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          const taskCard = this.closest('.task-card');
          if (taskCard) {
            taskCard.classList.add('task-complete-animation');
            setTimeout(() => {
              taskCard.classList.remove('task-complete-animation');
            }, 500);
          }
        }
      });
    });
    
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    // Initialize Rich Text Editor if present
    const editorElement = document.getElementById('editor');
    if (editorElement && typeof Quill !== 'undefined') {
      const quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Enter task description...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['link'],
            ['clean']
          ]
        }
      });
      
      // If editing, populate the editor with existing content
      const descriptionInput = document.getElementById('description-input');
      if (descriptionInput && descriptionInput.value) {
        quill.root.innerHTML = descriptionInput.value;
      }
      
      // Update hidden input before form submission
      const taskForm = document.querySelector('form');
      if (taskForm) {
        taskForm.addEventListener('submit', function() {
          descriptionInput.value = quill.root.innerHTML;
        });
      }
    }
  });