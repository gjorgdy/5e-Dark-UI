Hooks.once('init', async function () {

});

Hooks.once('ready', async function () {

});

// change the tabs to be labels like the character sheets
Hooks.on('renderItemSheet5e', async function (application, html, data) {
    const tabs = html.find('.sheet-navigation');
    const parent = html.find('.window-content');
    tabs.insertAfter(parent);

    html.find('.item[data-tab="description"]').html('<i class="fas fa-book"></i>');
    html.find('.item[data-tab="details"]').html('<i class="fas fa-circle-info"></i>');
    html.find('.item[data-tab="advancement"]').html('<i class="fas fa-star-half-stroke"></i>');
    html.find('.item[data-tab="effects"]').html('<i class="fas fa-bolt"></i>');
    html.find('[data-tab="usage"]').remove();

    html.find('.item-list').each(function (div) {
        var info = $('<div class="item-info"> </div>')
        div.prepend(info);

        var name = div.find('.item-name');
        var summary = div.find('.item-summary');
        info.append(name);
        info.append(summary);

        var display = $('<div class="item-display"> </div>')
        div.prepend(display);

        var image = div.find('.item-image');
        display.append(image);

        div.find('.flexrow').delete();
    });

})

Hooks.on('renderSceneControls', function (application, html, data) {

})