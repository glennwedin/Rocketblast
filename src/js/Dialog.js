var methods = {
	createDialog: function (settings, callback) {
		let div = document.createElement('div'),
			ok = document.createElement('button'),
			no = document.createElement('button');

		div.className = "dialog";
		div.innerHTML = '<h1>'+settings.title+'</h1><p>'+settings.text+'</p>';

		no.innerHTML = settings.action_no;
		ok.innerHTML = settings.action_yes;

		div.appendChild(no);
		div.appendChild(ok);

		ok.addEventListener('click', function () {
			div.parentNode.removeChild(div);
			callback();
		});

		document.body.appendChild(div);
	}
}

export function dialog (settings, callback) {
	//callback
	methods.createDialog(settings, callback);
}