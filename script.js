document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    const filterTabs = document.querySelectorAll('.tab');

    // State management
    let tasks = [];
    let currentFilter = 'all';

    // Initialize
    loadTasks();
    renderTasks();

    // Event Listeners
    addBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', handleTaskAction);

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update UI for tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter logic
            currentFilter = tab.getAttribute('data-filter');
            renderTasks();
        });
    });

    // Functions

    function addTask() {
        const text = taskInput.value.trim();
        const dateVal = dateInput.value;

        if (text === '') {
            shakeInput();
            return;
        }

        const newTask = {
            id: Date.now(),
            text: text,
            date: dateVal ? new Date(dateVal).toLocaleString() : 'No Deadline',
            rawDate: dateVal, // useful if we ever want to sort
            completed: false
        };

        tasks.unshift(newTask); // Add to top
        taskInput.value = '';
        // Optional: clear date or keep it? Let's keep it for rapid entry or clear it.
        // dateInput.value = ''; 
        taskInput.focus();

        saveTasks();
        renderTasks();
    }

    function handleTaskAction(e) {
        const target = e.target;
        const taskItem = target.closest('.task-item');

        if (!taskItem) return;

        const id = parseInt(taskItem.getAttribute('data-id'));

        // Toggle Complete (clicking body or checkbox)
        if (target.closest('.task-content')) {
            toggleTask(id);
        }

        // Delete Task
        if (target.closest('.delete-btn')) {
            const row = target.closest('.task-item');
            row.style.transform = 'translateX(10px) scale(0.95)';
            row.style.opacity = '0';
            setTimeout(() => {
                deleteTask(id);
            }, 300); // Wait for animation
        }
    }

    function toggleTask(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        saveTasks();
        renderTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';

        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(t => t.completed);
        }

        if (filteredTasks.length === 0) {
            emptyState.classList.add('visible');
        } else {
            emptyState.classList.remove('visible');

            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.setAttribute('data-id', task.id);

                // Format relative time or clean date string
                let dateDisplay = task.date;
                if (task.rawDate) {
                    const d = new Date(task.rawDate);
                    // Simple formatting: "Jan 28, 10:30 PM"
                    dateDisplay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
                        ', ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                }

                li.innerHTML = `
                    <div class="task-content">
                        <div class="checkbox-visual">
                            <i class="fa-solid fa-check"></i>
                        </div>
                        <div class="task-details">
                            <span class="task-text">${escapeHtml(task.text)}</span>
                            ${dateDisplay && dateDisplay !== 'No Deadline' ? `
                            <div class="task-meta">
                                <i class="fa-regular fa-clock"></i>
                                <span>${dateDisplay}</span>
                            </div>` : ''}
                        </div>
                    </div>
                    <button class="delete-btn" aria-label="Delete task">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                `;

                taskList.appendChild(li);

                // Add staggered animation delay
                // setTimeout(() => li.style.opacity = '1', 10);
            });
        }
    }

    function saveTasks() {
        localStorage.setItem('premiumTasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const stored = localStorage.getItem('premiumTasks');
        if (stored) {
            tasks = JSON.parse(stored);
        }
    }

    function shakeInput() {
        taskInput.style.borderColor = '#ff0f7b'; // Updated to danger color
        taskInput.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 300,
            iterations: 1
        });

        setTimeout(() => {
            taskInput.style.borderColor = 'rgba(100, 220, 255, 0.2)'; // Back to glass border
        }, 1000);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
