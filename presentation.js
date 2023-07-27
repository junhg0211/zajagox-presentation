let screens;
let currentScreen = 0;
let unhide = false;
let hud;
let hudTimeout;
let ctrl = false;

window.addEventListener('load', () => {
    screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
    screens[currentScreen].style.display = '';

    hud = document.querySelector('.hud');
    updateHUD();
});

function updateHUD() {
    hud.innerHTML = `${screens.length}장의 ${currentScreen + 1}번째`;
    getHUD();
}

function getHUD() {
    hud.classList.remove('faded');

    if (hudTimeout)
        clearTimeout(hudTimeout);

    hudTimeout = setTimeout(() => {
        hud.classList.add('faded');
    }, 2000);
}

function next() {
    updateHUD();

    if (currentScreen < screens.length - 1) {
        screens[currentScreen].style.display = 'none';
        screens[++currentScreen].style.display = '';
    }
}

function previous() {
    updateHUD();

    if (currentScreen > 0) {
        screens[currentScreen].style.display = 'none';
        screens[--currentScreen].style.display = '';
    }
}

document.addEventListener('mousewheel', (event) => {
    if (control)
        return;

    if (event.deltaY > 0) {
        next();
    } else {
        previous();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter' || event.key === 'PageDown' || event.key === 'ArrowDown') {
        next();
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp' || event.key === 'ArrowUp' || event.key === 'Backspace') {
        previous();
    } else if (event.key === 'Shift') {
        document.querySelectorAll('.blur').forEach(element => {
            element.classList.add('unhide');
        });

        document.querySelectorAll('.spoiler').forEach(element => {
            element.classList.add('unhide');
        });
    } else if (event.key === 'Control') {
        control = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
        document.querySelectorAll('.unhide').forEach(element => {
            element.classList.remove('unhide');
        });
    } else if (event.key === 'Control') {
        control = false;
    }
});