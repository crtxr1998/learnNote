var session_storage = window.sessionStorage;
let sorts = ["热歌榜","新歌榜","飙升榜","抖音榜","电音榜"];
const ap = new APlayer({
	container: document.getElementById('aplayer'),
	listFolded: false,
	lrcType: 1,
	listMaxHeight: 30,
	mutex: true,
	audio: []
});

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
		xhr.open(obj.method, obj.url, obj.async);
		xhr.send(null);
	} else if (obj.method === 'post' || obj.method === 'put') {
		xhr.open(obj.method, obj.url, obj.async);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(JSON.stringify(obj.data));
	}
};

function color16() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
	return color;
};

function seek(time) {
	ap.seek(time);
}

function api_uomg_com() {
	var index = Math.round(Math.random() * sorts.length);
	Ajax({
		method: 'get',
		url: 'https://api.uomg.com/api/rand.music?sort=' + sorts[index] + '&format=json',
		success: (res) => {
			var musics = JSON.parse(res);
			musics = musics.data;
			ap.list.add({
				"name": musics.name,
				"artist": musics.artistsname,
				"url": musics.url,
				"cover": musics.picurl,
				"theme": color16(),
				"lrc": getLyrics(musics.url.substring(musics.url.indexOf("=") + 1, musics.url.lastIndexOf(".")))
			})
		},
		error: (status) => {
		},
		async: false,
		data: null
	});
};

function api_comments_hk() {
	Ajax({
		method: 'get',
		url: 'https://api.comments.hk',
		success: function(res) {
			let musics = JSON.parse(res);
			ap.list.add({
				"name": musics.title,
				"artist": musics.author,
				"url": musics.mp3_url,
				"cover": musics.images,
				"theme": color16(),
				"lrc": getLyrics(musics.song_id)
			});
			ap.list.switch(ap.list.audios.length - 1);
			session_storage.setItem("musics", JSON.stringify(ap.list.audios));
		},
		error: (status) => {
		},
		async: true,
		data: null
	});
};

function getLyrics(id) {
	var lyric = "";
	Ajax({
		method: 'get',
		url: 'https://api.imjad.cn/cloudmusic/?type=lyric&id=' + id,
		success: (res) => {
			var lyrics = JSON.parse(res);
			lyric = lyrics.lrc.lyric;
		},
		error: () => {},
		async: false,
		data: null
	});
	return lyric;
};

function load_music() {
	if (ap.list.audios.length <= 10) {
		api_comments_hk();
	} else {
		ap.skipForward();
	}
};

function init_player_song(t) {
	if (session_storage.getItem("current")) {
		var current = session_storage.getItem("current");
		current = JSON.parse(current);
		var index = ap.list.audios.findIndex((item, index, array) => {
			return item.url === current.url;
		});
		if (index !== -1) {
			if (t === "switch") {
				ap.list.switch(index);
			} else {
				seek(current.seek);
			}
		}
	}
};

function playmusic() {
	if (session_storage.getItem("musics")) {
		var musics = session_storage.getItem("musics");
		musics = JSON.parse(musics);
		ap.list.add(musics);
		init_player_song("switch");
	} else {
		load_music();
	}
};
window.onload = () => {
	playmusic();
	ap.on('ended', () => {
		load_music();
	});
	ap.on('play', () => {
		init_player_song("seek");
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
	document.getElementById('rotate').classList.add("rotate");
};
