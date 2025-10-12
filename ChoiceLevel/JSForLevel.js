  const grid = document.getElementById('levelCreate');

    for (let i = 1; i <= 30; i++) {
      const button = document.createElement('div');
      button.classList.add('btn');
      button.textContent = i; // номер рівня

      // подія натискання
      if (i === 1 ) {
        button.addEventListener('click', () => {
        window.location.href = '/home/wlad/Project/Toxick_IT/Project/script.html';
        // сюди згодом можна буде вставити перехід на саму гру
      });
    }

      grid.appendChild(button);
    }