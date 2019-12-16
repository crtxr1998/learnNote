var session_storage = window.sessionStorage;
function createXHR() {
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	return xhr;
}

function Ajax(obj) {
	var xhr = new createXHR();
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			obj.success(xhr.responseText);
		} else {
			obj.error(xhr.status);
		}
	}
	if (obj.method === 'get') {
		xhr.open(obj.method, obj.url, true);
		xhr.send(null);
	} else if (obj.method === 'post' || obj.method === 'put') {
		xhr.open(obj.method, obj.url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(JSON.stringify(obj.data));
	}
};
const ap = new APlayer({
	container: document.getElementById('aplayer'),
	listFolded: false,
	listMaxHeight: 30,
	mutex: true,
	theme: color16(),
	audio: []
});

function color16() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
	return color;
};

function seek_song(time) {
	ap.seek(time);
}

function load_music() {
	if (ap.list.audios.length <= 10) {
			Ajax({
				method: 'get',
				url: 'https://api.comments.hk',
				success: function(res) {
					let musics = JSON.parse(res);
					let item = {};
					item.name = musics.title;
					item.artist = musics.author;
					item.url = musics.mp3_url;
					item.cover = musics.images;
					ap.list.add(item);
					ap.list.switch(ap.list.audios.length - 1);
					session_storage.setItem("musics", JSON.stringify(ap.list.audios));
				},
				data: null
			});
		}else{
			ap.skipForward();
		}
};

function playmusic() {
	if (session_storage.getItem("musics")) {
		var musics = session_storage.getItem("musics");
		musics = JSON.parse(musics);
		ap.list.add(musics);
		if (session_storage.getItem("current")) {
			var current = session_storage.getItem("current");
			current = JSON.parse(current);
			var index = ap.list.audios.findIndex((item, index, array) => {
				return item.url === current.url;
			});
			if (index !== -1) {
				ap.list.switch(index);
			}
		}
	} else {
		load_music();
	}
}
window.onload = () => {
	playmusic();
	ap.on('ended', () => {
		load_music();
	});
	ap.on('play', () => {
		if (session_storage.getItem("current")) {
			var current = session_storage.getItem("current");
			current = JSON.parse(current);
			var index = ap.list.audios.findIndex((item, index, array) => {
				return item.url === current.url;
			});
			if (index !== -1) {
				seek_song(current.seek);
			}
		}
	});
	var count = 0;
	setInterval(() => {
		if (count > 2) {
			let current = {};
			current.url = ap.audio.currentSrc;
			current.seek = ap.audio.currentTime;
			session_storage.setItem("current", JSON.stringify(current));
		}
		count++;
	}, 1000);
	setTimeout(() => {
		ap.play();
	}, 1500);
	document.onkeydown = (event) => {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		//ctrl+right 
		if (e.ctrlKey && e.keyCode == 39) {
			ap.skipForward();
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		} 
		//ctrl+left
		if (e.ctrlKey && e.keyCode == 37) {
			ap.skipBack();
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		}
		//alt+right
		if (e.altKey && e.keyCode == 39) {
			ap.seek(ap.audio.currentTime + 6);
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		}
		//alt+left 
		if (e.altKey && e.keyCode == 37) {
			ap.seek(ap.audio.currentTime - 6);
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		}
		//space
		if (e.keyCode == 32) {
			ap.toggle();
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		}
		//volume++
		if (e.altKey && e.keyCode == 38) {
			let volume = ap.audio.volume + 0.1;
			ap.volume(volume, true);
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		}
		//volume--
		if (e.altKey && e.keyCode == 40) {
			let volume = ap.audio.volume - 0.1;
			ap.volume(volume, true);
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		}
	};
	//rotate animotion
	document.getElementById('rotate').style.backgroundColor = color16();
	document.getElementById('rotate').setAttribute("class", "rotate");
};
