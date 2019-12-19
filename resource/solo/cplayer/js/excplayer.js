var sorts = ["热歌榜", "新歌榜", "抖音榜", "电音榜"]
creatSheet();
creatdiv();

function closer(c) {
	c.classList.contains("unlock") ? (c.classList.remove("unlock"),
		c.classList.add("locked"), sessionStorage.setItem("close", false)) : (c.classList.remove("locked"),
		c.classList.add("unlock"), sessionStorage.setItem("close", true))
}

function userPcAgent() {
	return navigator.platform.indexOf("Win") == 0;
}

function creatSheet() {
	var width = document.body.clientWidth + 272;
	width = width + 'px';
	var style = '';
	style += '.musicScrollUp{-webkit-transform:translateX(' + width + ');transform:translateX(' + width +
		');transition:transform 1.5s ease-out}.musicScrollDown{-webkit-transform:translateX(0);transform:translateX(0);transition:transform 1.5s ease-out}'
	style +=
		'.unlock{position:absolute;right:0;width:24px;height:24px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wEJAjkZdQdUogAABbNJREFUSMeFlGuMnFUZx3/nnPcyM+9cdnZm9tbdLoVSuygB2mK7BqliYqIGtbTBGE1wSTQ2KmhMjZGktqIGTIyJiQRK0H6gHxqTStQYSKSC/SCKNK3RArutHex2u7OXue/c3ve8xw97mW4v+nw553x4/r9znv9zHgGwODEBgrVY3f5jPAVi+WS7Tk4qtVkqmZZSBkLKWSHEBSHE0mretj0HuTbEwsREV1tgA0kBFSEIzoz3gDGWUupL0lL7lVL9UimkkggptRDinBDiKYx5ffUi10IsALO8d4VhpxBIIWgL+JsMQq0Fe0IR/liE8piR/B5MCYPCMILgEeAIQjwE/IsbhLWyDgDbheADjsVAaDhpNPFFy2+kfPWIEZwKtT6glAququObwBvAq8BNAXJlHQUQgq9KycNSEk9O1zumvpTQod4caP26pdzA1z5+J8ByPUIjyEZGZowxZwzmzrsjO7Adj1ee/yJvnTh8HWAekEJwVMALOsQ6vW/rtttSm7/Va6UHs9HcvdFE7/iVHt+2YwlcGaOdcFINXXswrqO3JILojoud8/u162x6YMNeOrbh9G+e7JpsNEiLnAxNTyNhjdjKelon47fJZpAWQYCwFLo3UakNJ49diTcPJZQ3lC2GT8cvlz5q1RuOIISIS2so825pQ+LQNxLPHD9Y3GciobUCMNCIGUZ/cZQzLzx5eGhy8QmnXFH/6beo9dhEfMgtBHh2nPL7h152G/5gYuryXdUE1PpjGFvhVdvkZpvo4cFSYXP20R6RfCn78S8sd+jvfjJBNjdKYPR9ozP6t0GhkG4nwAsFV/ocWjEbKSXD+SZp44HfYb5fUtqYBCWRQoAUJEotNk5VWNq66e/50cin7HpzbtUDdnmfINlWn3YWqumZjOFSVoGBLdNtMhWf0BIURmN0lirU3YDihjgIEMaAAWGgno5Syjh4s8W7Ui21K2n3rJnM3vZjymmHt2rt03QhUJDvtzAKbLP8WfyIYvbWOPOjcYzsfqCrR0Aj5SJbbdvphJuSvtMFnDB/DUMpWiAQKzdqOpKpIZeyp5bnh4FaxqXlWdeLr7alNiAERtAKZNgF1NSLpuOId5VtE2uBWXl+LaJYcuWaoLIchLJurG4gVm2jo5Fm25Hnq6rdBZxtvkPV9l/tpLxyrgJKd6fe6qxStosbTxPx0gghr9XGbfgkyz6NbPJcJRKcXepUuoBS+TJn2u+8WclFTiSlR64Ysm7ErsncYC9AaUPfxRIkU0El5x25o5pZqBSmlgEPfudXKGVzj7vVn4u2nqqN9J4dKlv0lPV6+TAEA2GoMcasqYvQkMuXSbQtSpv6js/Em8cmxSUSmdHuCzAhH/7k9xhw+6cKGR5vjfa9t7EAqXKAWS2VlAhlIVc9WPEpm6/QWwypbBk+WcjI7/a2nCVlBNv2HESt6h975TTjI4ucnz/LrsHd701HKpMxFdudma4nfcvQ8azlgpkQ7bcxaKSBvnyVbNFQHRs+VRh0vhLTVt6xYzQaRY4cf60LAHjx5bfY/9mPMVV9m529H5rKxypvR63Yfb3T9R6tDK24hdE+xoQoA/0Xq/RWBNWxkT/NDbpfjml7ajB9OzML59j+0PfXNci6+OMzX6eqq4wPPMAlffkjA7PBs7F84X1z/ZLSsIcVCgYv1uhp21THNvyhMGB9zQvsfH/6di7M/IUdew9d7f+N4+Rzj7HYmmP70G4WKO0cKOhnvX/P3l1MCyJtTcJEqYwN/Xo2x+PxwL7iRdPMFy9w777D63RuCgB47flvMjl/mvu37KMil+4cmAufS03OjpuYa8pjA0dnsvpAomMt2ipCrV7ggw//4DqN/wkA+PMvv839j/6Uf574GQ1aW7J16+ehJaam060nkh2nqpC0WmV2fu6HN8z/vwCAU0cPcM8dn+H89BtURK1Pm6ARJ1ZXRuB3ltj1+R/dNPe/AhNfpmdYWO8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDEtMDlUMDI6NTc6MjUrMDg6MDD49ZHMAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAxLTA5VDAyOjU3OjI1KzA4OjAwiagpcAAAAEN0RVh0c29mdHdhcmUAL3Vzci9sb2NhbC9pbWFnZW1hZ2ljay9zaGFyZS9kb2MvSW1hZ2VNYWdpY2stNy8vaW5kZXguaHRtbL21eQoAAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADUxMo+NU4EAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTEyHHwD3AAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNTQ2OTczODQ1QZc6YwAAABJ0RVh0VGh1bWI6OlNpemUANTg0MjBC6ySY1wAAAGJ0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9uZXdzaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9maWxlcy8xMTMvMTEzNDM4OS5wbmdMcy+TAAAAAElFTkSuQmCC) no-repeat;z-index:100;cursor:pointer;display:inline-block;transition:1.5s ease-in}.locked{position:absolute;width:24px;height:24px;right:0;background:url(data:image/png;base64,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) no-repeat;z-index:100;cursor:pointer;display:inline-block;transition:1.5s ease-in}.playdiv:hover{opacity:1;transition:all 1s;-moz-transition:all 1s;-webkit-transition:all 1s}.playdiv{opacity:.4;transition:all 1s;-moz-transition:all 1s;-webkit-transition:all 1s}';
	this.styleEl = document.createElement('style')
	this.styleEl.type = 'text/css'
	this.styleEl.innerHTML = style;
	document.getElementsByTagName('head').item(0).appendChild(this.styleEl)
}

function creatdiv() {
	var app = '<div class="playdiv"><span class="unlock" onclick="closer(this);"></span><div id="app"></div></div>';
	document.getElementById('cplayer').innerHTML = app;
}

function createXHR() {
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	return xhr;
}

function Ajax(obj) {
	var xhr = new createXHR();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				obj.success(xhr.responseText);
			} else {
				obj.error(xhr.status);
			}
		}
	}
	if (obj.method === 'get') {
		xhr.open(obj.method, obj.url, obj.aync);
		xhr.send(null);
	}
};

function musicInfo(arg) {
	let list = [];
	let item = {};
	let index = Math.floor(Math.random() * sorts.length);
	if (userPcAgent() && sessionStorage.getItem("musics")) {
		
		list.push({name: "好想爱这个世界啊",
artist: "华晨宇",
src: "http://music.163.com/song/media/outer/url?id=1407358755.mp3",
poster: "http://p2.music.126.net/3-y4J1CayZI0k2NkNkTmDw==/109951164525748216.jpg",
lyric: "[00:00.000] 作曲 : 华晨宇↵[00:00.391] 作词 : 裴育↵[00:01.173]编曲：郑楠↵[00:06.032]制作人：郑楠↵[00:10.316]↵[00:12.338]抱着沙发 睡眼昏花 凌乱头发↵[00:16.504]却渴望像电影主角一样潇洒↵[00:21.753]↵[00:24.190]屋檐角下 排着乌鸦 密密麻麻↵[00:28.587]被压抑的情绪不知如何表达↵[00:34.070]↵[00:36.274]无论我 在这里 在那里↵[00:40.341]仿佛失魂的虫鸣↵[00:42.658]却明白此刻应该做些努力↵[00:48.024]↵[00:48.275]无论我 在这里 在那里↵[00:52.357]不能弥补的过去↵[00:54.642]每当想起↵[00:56.390]↵[00:58.757]想过离开↵[01:00.725]以这种方式存在↵[01:03.658]是因为 那些旁白 那些姿态 那些伤害↵[01:10.408]↵[01:10.707]不想离开↵[01:12.458]当你说还有你在↵[01:15.493]忽然我开始莫名 期待↵[01:21.191]↵[01:31.843]夕阳西下 翻着电话 无人拨打↵[01:36.176]是习惯孤独的我该得到的吧↵[01:41.543]↵[01:43.525]独木桥呀 把谁推下 才算赢家↵[01:48.010]我无声的反抗何时能战胜它↵[01:53.542]↵[01:55.826]无论我 在这里 在那里↵[01:59.793]仿佛失魂的虫鸣↵[02:02.193]却明白此刻应该做些努力↵[02:07.359]↵[02:07.776]无论我 在这里 在那里↵[02:11.692]不能弥补的过去↵[02:14.177]每当想起↵[02:18.092]↵[02:18.259]想过离开↵[02:19.926]以这种方式存在↵[02:22.959]是因为 那些旁白 那些姿态 那些伤害↵[02:29.909]↵[02:30.160]不想离开↵[02:31.809]也许尝试过被爱↵[02:34.843]会开始仰望未来↵[02:38.859]伤疤 就丢给回忆吧↵[02:50.798]放下 才得到更好啊↵[02:58.322]别怕 别怕↵[03:02.239]↵[03:03.122]想过离开↵[03:04.806]当阳光败给阴霾↵[03:07.838]没想到你会拼命为我拨开↵[03:13.506]↵[03:20.839]曾想过离开↵[03:23.273]却又坚持到现在↵[03:25.922]熬过了 那些旁白 那些姿态 那些伤害↵[03:32.922]↵[03:33.139]不想离开↵[03:34.872]当你的笑容绽开↵[03:37.840]这世界突然填满 色彩↵[03:48.239]↵[04:04.639]抱着沙发 睡眼昏花 凌乱头发↵[04:10.740]夕阳西下 接通电话 是你呀↵"})
		//list = JSON.parse(sessionStorage.getItem("musics"));
	}
	if (arg === "init" && list.length > 0) {
		return {
			ms: list,
			it: item
		};
	}
	if (list.length < 10) {
		let targetUrl = 'https://api.uomg.com/api/rand.music?sort=' + sorts[index] + '&format=json'
		console.info(targetUrl)
		Ajax({
			method: 'get',
			url: targetUrl,
			success: (res) => {
				let musics = JSON.parse(res);
				musics = musics.data;
				console.info(musics)
				item = {
					"name": musics.name,
					"artist": musics.artistsname,
					"src": musics.url,
					"poster": musics.picurl,
					"lyric": lyrics(musics.url.substring(musics.url.indexOf("=") + 1, musics.url.lastIndexOf(
						".")))
				}
				list.push(item);
				if (userPcAgent() && list.length > 0) {
					setItem(list)
				}
			},
			aync: false,
			data: null
		});
	}
	return {
		ms: list,
		it: item
	};
};


function setItem(e){
	sessionStorage.setItem("musics", JSON.stringify(e));
}
function clearItem(){
	sessionStorage.removeItem(musics);
}
function lyrics(id) {
	let lyric = "";
	Ajax({
		method: 'get',
		url: 'https://api.imjad.cn/cloudmusic/?type=lyric&id=' + id,
		success: (res) => {
			var lyrics = JSON.parse(res);
			lyric = lyrics.lrc.lyric;
		},
		aync: false,
		error: function() {
			lyric = "";
		},
		data: null
	});
	return lyric;
};

window.onload = function() {
	const player = new cplayer({
		element: document.getElementById('app'),
		playlist: musicInfo("init").ms,
		height: userPcAgent() === true ? 10 : 1,
		width: '',
		volume :'0.3',
		big: true
	});

	var new_scroll_position = 0;
	var last_scroll_position;
	var div = player.view.getPlayDiv();
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
	player.on('ended', function() {
		let music;
		var addMusic = function() {
			if (music.it.hasOwnProperty("src") && player.nowplaypoint === player.playlist.length - 1) {
				player.add(music.it);
			}
		}
		if (userPcAgent()) {
			music = musicInfo("ended");
			addMusic();
		} else {
			if (player.mode !== 'singlecycle') {
				music = musicInfo("ended");
				console.info(player.mode !== 'singlecycle')
				let old = player.nowplay;
				player.remove(old);
				addMusic();
			}
		}
	});
	player.on('error', function() {
         let old = player.nowplay;
         player.remove(old);
	});
	
	var count = 0;
	var interval = setInterval(function() {
		player.play();
		count++;
	}, 1000);
	setTimeout(function() {
		if (count !== 0) {
			clearInterval(interval);
		}
	}, 4000);
}
