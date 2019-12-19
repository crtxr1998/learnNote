var session_storage = window.sessionStorage;
let sorts = ["热歌榜", "新歌榜", "飙升榜", "抖音榜", "电音榜"];
creatSheet();
creatdiv();
closer();
const ap = new APlayer({
	container: document.getElementById('app'),
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

function creatSheet() {
	var width = document.body.clientWidth + 272;
	width = width + 'px';
	var style = '';
	style += '.musicScrollUp{-webkit-transform:translateX(' + width + ');transform:translateX(' + width +
		');transition:transform 1.5s ease-out}.musicScrollDown{-webkit-transform:translateX(0);transform:translateX(0);transition:transform 1.5s ease-out}'
	style +=
		'.unlock{position:absolute;right:0;width:24px;height:24px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wEJAjkZdQdUogAABbNJREFUSMeFlGuMnFUZx3/nnPcyM+9cdnZm9tbdLoVSuygB2mK7BqliYqIGtbTBGE1wSTQ2KmhMjZGktqIGTIyJiQRK0H6gHxqTStQYSKSC/SCKNK3RArutHex2u7OXue/c3ve8xw97mW4v+nw553x4/r9znv9zHgGwODEBgrVY3f5jPAVi+WS7Tk4qtVkqmZZSBkLKWSHEBSHE0mretj0HuTbEwsREV1tgA0kBFSEIzoz3gDGWUupL0lL7lVL9UimkkggptRDinBDiKYx5ffUi10IsALO8d4VhpxBIIWgL+JsMQq0Fe0IR/liE8piR/B5MCYPCMILgEeAIQjwE/IsbhLWyDgDbheADjsVAaDhpNPFFy2+kfPWIEZwKtT6glAququObwBvAq8BNAXJlHQUQgq9KycNSEk9O1zumvpTQod4caP26pdzA1z5+J8ByPUIjyEZGZowxZwzmzrsjO7Adj1ee/yJvnTh8HWAekEJwVMALOsQ6vW/rtttSm7/Va6UHs9HcvdFE7/iVHt+2YwlcGaOdcFINXXswrqO3JILojoud8/u162x6YMNeOrbh9G+e7JpsNEiLnAxNTyNhjdjKelon47fJZpAWQYCwFLo3UakNJ49diTcPJZQ3lC2GT8cvlz5q1RuOIISIS2so825pQ+LQNxLPHD9Y3GciobUCMNCIGUZ/cZQzLzx5eGhy8QmnXFH/6beo9dhEfMgtBHh2nPL7h152G/5gYuryXdUE1PpjGFvhVdvkZpvo4cFSYXP20R6RfCn78S8sd+jvfjJBNjdKYPR9ozP6t0GhkG4nwAsFV/ocWjEbKSXD+SZp44HfYb5fUtqYBCWRQoAUJEotNk5VWNq66e/50cin7HpzbtUDdnmfINlWn3YWqumZjOFSVoGBLdNtMhWf0BIURmN0lirU3YDihjgIEMaAAWGgno5Syjh4s8W7Ui21K2n3rJnM3vZjymmHt2rt03QhUJDvtzAKbLP8WfyIYvbWOPOjcYzsfqCrR0Aj5SJbbdvphJuSvtMFnDB/DUMpWiAQKzdqOpKpIZeyp5bnh4FaxqXlWdeLr7alNiAERtAKZNgF1NSLpuOId5VtE2uBWXl+LaJYcuWaoLIchLJurG4gVm2jo5Fm25Hnq6rdBZxtvkPV9l/tpLxyrgJKd6fe6qxStosbTxPx0gghr9XGbfgkyz6NbPJcJRKcXepUuoBS+TJn2u+8WclFTiSlR64Ysm7ErsncYC9AaUPfxRIkU0El5x25o5pZqBSmlgEPfudXKGVzj7vVn4u2nqqN9J4dKlv0lPV6+TAEA2GoMcasqYvQkMuXSbQtSpv6js/Em8cmxSUSmdHuCzAhH/7k9xhw+6cKGR5vjfa9t7EAqXKAWS2VlAhlIVc9WPEpm6/QWwypbBk+WcjI7/a2nCVlBNv2HESt6h975TTjI4ucnz/LrsHd701HKpMxFdudma4nfcvQ8azlgpkQ7bcxaKSBvnyVbNFQHRs+VRh0vhLTVt6xYzQaRY4cf60LAHjx5bfY/9mPMVV9m529H5rKxypvR63Yfb3T9R6tDK24hdE+xoQoA/0Xq/RWBNWxkT/NDbpfjml7ajB9OzML59j+0PfXNci6+OMzX6eqq4wPPMAlffkjA7PBs7F84X1z/ZLSsIcVCgYv1uhp21THNvyhMGB9zQvsfH/6di7M/IUdew9d7f+N4+Rzj7HYmmP70G4WKO0cKOhnvX/P3l1MCyJtTcJEqYwN/Xo2x+PxwL7iRdPMFy9w777D63RuCgB47flvMjl/mvu37KMil+4cmAufS03OjpuYa8pjA0dnsvpAomMt2ipCrV7ggw//4DqN/wkA+PMvv839j/6Uf574GQ1aW7J16+ehJaam060nkh2nqpC0WmV2fu6HN8z/vwCAU0cPcM8dn+H89BtURK1Pm6ARJ1ZXRuB3ltj1+R/dNPe/AhNfpmdYWO8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDEtMDlUMDI6NTc6MjUrMDg6MDD49ZHMAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAxLTA5VDAyOjU3OjI1KzA4OjAwiagpcAAAAEN0RVh0c29mdHdhcmUAL3Vzci9sb2NhbC9pbWFnZW1hZ2ljay9zaGFyZS9kb2MvSW1hZ2VNYWdpY2stNy8vaW5kZXguaHRtbL21eQoAAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADUxMo+NU4EAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTEyHHwD3AAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNTQ2OTczODQ1QZc6YwAAABJ0RVh0VGh1bWI6OlNpemUANTg0MjBC6ySY1wAAAGJ0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9uZXdzaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9maWxlcy8xMTMvMTEzNDM4OS5wbmdMcy+TAAAAAElFTkSuQmCC) no-repeat;z-index:100;cursor:pointer;display:inline-block;transition:1.5s ease-in}.locked{position:absolute;width:24px;height:24px;right:0;background:url(data:image/png;base64,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) no-repeat;z-index:100;cursor:pointer;display:inline-block;transition:1.5s ease-in}.playdiv:hover{opacity:1;transition:all 1s;-moz-transition:all 1s;-webkit-transition:all 1s}.playdiv{opacity:.4;transition:all 1s;-moz-transition:all 1s;-webkit-transition:all 1s}'
	style +=
		'@-webkit-keyframes rotate{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}@-moz-keyframes rotate{from{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(359deg)}}@-o-keyframes rotate{from{-o-transform:rotate(0deg)}to{-o-transform:rotate(359deg)}}@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(359deg)}}.rotate{-webkit-transition-property:-webkit-transform;-webkit-transition-duration:1s;-moz-transition-property:-moz-transform;-moz-transition-duration:1s;-webkit-animation:rotate 3s linear infinite;-moz-animation:rotate 3s linear infinite;-o-animation:rotate 3s linear infinite;animation:rotate 3s linear infinite}';
	this.styleEl = document.createElement('style')
	this.styleEl.type = 'text/css'
	this.styleEl.innerHTML = style;
	document.getElementsByTagName('head').item(0).appendChild(this.styleEl)
}

function closer(c) {
	if (arguments.length > 0) {
		c.classList.contains("unlock") ? (c.classList.remove("unlock"),
			c.classList.add("locked"), sessionStorage.setItem("close", false)) : (c.classList.remove("locked"),
			c.classList.add("unlock"), sessionStorage.setItem("close", true))
	} else {
		if (sessionStorage.getItem("close") === "false") {
			let closer = document.getElementById("aplayer").querySelector(".closer");
			closer.classList.remove("unlock");
			closer.classList.add("locked");
		}
	}
}



function creatdiv() {
	var app = '<div class="playdiv"><span class="closer unlock" onclick="closer(this);"></span><div id="app"></div></div>';
	document.getElementById('aplayer').innerHTML = app;
}

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

function setSessionItem(e) {
	sessionStorage.setItem("musics", JSON.stringify(e));
}

function getSessionItem() {
	return sessionStorage.getItem("musics");
}

function clearSessionItem() {
	sessionStorage.removeItem("musics");
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
			});
			ap.list.switch(ap.list.audios.length - 1);
			setSessionItem(ap.list.audios);
		},
		error: (status) => {},
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
			setSessionItem(ap.list.audios);
		},
		error: (status) => {},
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
	if (ap.list.audios.length < 10) {
		api_comments_hk();
	} else {
		ap.skipForward();
	}
};

function init_player_song(t) {
	let p = nowPoint();
	if (p.point !== -1) {
		if (t === "switch") {
			ap.list.switch(p.point);
		} else {
			seek(p.item.seek);
		}
	}
};


function nowPoint() {
	if (session_storage.getItem("current")) {
		let current = session_storage.getItem("current");
		current = JSON.parse(current);
		let point = ap.list.audios.findIndex((item) => {
			return item.url === current.url;
		});
		return {
			item: current,
			point: point
		};
	} else {
		return {
			point: -1
		};
	}
};

function playmusic() {
	if (getSessionItem()) {
		var musics = getSessionItem();
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
	var new_scroll_position = 0;
	var last_scroll_position;
	var div = document.getElementById("app");
	window.addEventListener('scroll', (e) => {
		last_scroll_position = window.scrollY;
		//console.info("last={}---new={}", parseInt(last_scroll_position), parseInt(new_scroll_position))
		if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
			// ↓ scroll
			div.classList.remove("musicScrollDown");
			div.classList.add("musicScrollUp");
			player.view.showInfo();
		} else if (new_scroll_position > last_scroll_position && last_scroll_position < 80) {
			// ↑ scroll
			if (sessionStorage.getItem("close") !== "false") {
				div.classList.remove("musicScrollUp");
				div.classList.add("musicScrollDown");
			}
		}
		new_scroll_position = last_scroll_position;
	});
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
