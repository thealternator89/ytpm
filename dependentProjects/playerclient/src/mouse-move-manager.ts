
const CURTAIN_ELEM_ID = 'invisible_curtain';
const MOUSE_HIDDEN_CLASS = 'mouse_hide';

const TIMEOUT_MS = 3 * 1000; // 3 sec

const curtain = document.getElementById(CURTAIN_ELEM_ID);
let timeoutId: NodeJS.Timeout;

export function setUpMouseMoveManager() {
    curtain.onmousemove = handleMouseMove;
}

function handleMouseMove() {
    curtain.classList.remove(MOUSE_HIDDEN_CLASS);
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        curtain.classList.add(MOUSE_HIDDEN_CLASS);
    }, TIMEOUT_MS);
}
