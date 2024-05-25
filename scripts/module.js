import {filter} from "./lib/hueRotate.js";

const originalColor = '#7c2c2f';
const primaryColor = '#5e288c';
const secondaryColor = '#b5afbd';

Hooks.once('init', async function () {
    CONFIG.debug.hooks = true;
    // overwrite dnd5e values
    $(':root')
        .css('--dnd5e-color-gold', 'var(--luxury-ui-secondary)')
        .css('--dnd5e-color-hd-1', 'var(--luxury-ui-primary)')
        .css('--dnd5e-color-hd-2', 'var(--luxury-ui-primary-shade)')
        .css('--dnd5e-color-hd-3', 'var(--luxury-ui-primary)')
        .css('--luxury-ui-primary', primaryColor)
        .css('--luxury-ui-primary-shade', '#57188c')
        .css('--luxury-ui-secondary', secondaryColor)
        .css('--luxury-ui-filter', filter(primaryColor, originalColor))
});

Hooks.once('ready', async function () {

});

Hooks.on('renderPause', async function (application, html, data) {
    const pause =  $('#pause');
    const middleUI = $('#ui-middle')
    middleUI.append(pause);
});

Hooks.on('renderHotbar', async function (application, html, data) {
    // get lock button
    const lock = $('.page-control[data-action="lock"]');
    // get left box
    const left = $('#hotbar-directory-controls');
    // place lock in left box
    left.append(lock);
    // add left to action bar
    const actionBar = $('#action-bar');
    actionBar.prepend(left);
    // remove right box
    $('#hotbar-lock').remove();

    // replace bar toggle
    $('#bar-toggle').remove();
    const barHandle = $('<div id="bar-space"> <a id="bar-handle" aria-label="Hide Macro Hotbar" role="button">\n' +
    '                           <i class="fas fa-caret-down"></i>\n' +
    '                         </a></div>');
    const hotbar = $('#hotbar');
    hotbar.append(barHandle);

    barHandle.on('click', function () {
        if (hotbar.hasClass('down')) {
            hotbar.removeClass('down');
        } else {
            hotbar.addClass('down');
        }
    })
});


// change the tabs to be labels like the character sheets
Hooks.on('renderItemSheet5e', async function (application, html, data) {
    const tabs = html.find('.sheet-navigation');
    const content = html.find('.window-content');
    tabs.insertAfter(content);

    html.find('.item[data-tab="description"]').html('<i class="fas fa-book"></i>');
    html.find('.item[data-tab="details"]').html('<i class="fas fa-circle-info"></i>');
    html.find('.item[data-tab="advancement"]').html('<i class="fas fa-star-half-stroke"></i>');
    html.find('.item[data-tab="effects"]').html('<i class="fas fa-bolt"></i>');

    // make dae buttons NOT GREEN
    $('.dae-config-itemsheet').removeAttr('style');

    removeText('a.header-button.control');
    removeText('.window-title');
    removeText('.document-id-link');

    // create observer instance
    const observer = new MutationObserver(function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute('data-tab') === 'midiqol') {
                        $(node).html('<i class="fas fa-notes-medical"></i>');
                        // Optionally, you can disconnect the observer if you only need it once
                        observer.disconnect();
                    }
                }
            }
        }
    });
    observer.observe(tabs[0], { childList: true, subtree: true });

})

Hooks.on('renderSceneControls', function (application, html, data) {
    console.log('got goofy buttons')
    console.log(html);

    let maps = $('' +
        '<li id="nav-toggle" class="scene-control" data-control="maps" data-canvas-layer="tokens" aria-label="Token Controls" role="tab" aria-controls="tools-panel-maps" data-tooltip="SCENES.ToggleNav">\n' +
        '            <i class="fas fa-map-location"></i>\n' +
        '        </li>');
    html.find('.main-controls').append(maps);
    maps.on('click', async function (event) {
        console.log(game.scenes);
        // render ui
        let buttons = {};
        // add action
        for (let scene of game.scenes) {
            buttons[scene.id] = {
                label: scene.name,
                callback: function () {
                    scene.activate();
                },
                icon: '<i class="fas fa-times"></i>'
            };
        }
        // create dialog
        new Dialog({
            title: "Navigate",
            content: '',
            buttons: buttons
        }).render(true);
    });
})

function removeText(filter) {
    const elements = $(filter);
    // Remove text content from elements
    elements.contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE; // Filter text nodes
    }).remove();
}