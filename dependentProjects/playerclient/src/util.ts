export function show(elem: JQuery<HTMLElement>) {
    elem.removeClass('hidden');
}

export function hide(elem: JQuery<HTMLElement>) {
    elem.addClass('hidden');
}
