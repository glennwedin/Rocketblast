var methods = {
    createDialog: function(settings, callback) {
        let div = document.createElement('div'),
            ok = document.createElement('button'),
            no = null;

        div.className = 'dialog';
        div.innerHTML =
            '<h1>' + settings.title + '</h1><p>' + settings.text + '</p>';

        ok.innerHTML = settings.action_yes;

        div.appendChild(ok);

        if (settings.action_no) {
            no = document.createElement('button');
            no.innerHTML = settings.action_no;
            div.appendChild(no);
        }

        ok.addEventListener('click', function() {
            div.parentNode.removeChild(div);
            callback();
        });

        document.body.appendChild(div);
    }
};

export function dialog(settings, callback) {
    //callback
    methods.createDialog(settings, callback);
}
