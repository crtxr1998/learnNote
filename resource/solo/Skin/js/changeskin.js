function createXHR() {
			var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			return xhr;
		}
function Ajax(obj) {
			var xhr = new createXHR();
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						obj.success(xhr.responseText);
					} else {
						obj.error(xhr.status);
					}
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
function init_all_skins(skins_key) {
	if (!session_storage.getItem(skins_key)) {
		Ajax({
			method: 'get',
			url: 'http://' + window.location.hostname + ":" + window.location.port + '/console/skin',
			success: (res) => {
				let skins = JSON.parse(res);
				session_storage.setItem(skins_key, skins.skin.skins);
			},
			error: (status) => {
				session_storage.setItem(skins_key,
					"[{\"skinDirName\":\"next\"},{\"skinDirName\":\"owmx-3.0\"},{\"skinDirName\":\"Pinghsu\"},{\"skinDirName\":\"yilia\"}]"
				);
				location.reload();
			},
			data: null
		});
	}
};
function get_skin(skins_key) {
	init_all_skins(skins_key);
	let skins = session_storage.getItem(skins_key);
	skins = JSON.parse(skins);
	let index = Math.round(Math.random() * skins.length);
	document.cookie = "skin=" + skins[index].skinDirName + "; path=/";
	location.reload();
};
function creatSheet() {
	var width = document.body.clientWidth + 272;
	width = width + 'px';
	var style = '';
	style += '.skinScrollUp{-webkit-transform:translateX(-1.5rem);transform:translateX(-1.5rem);transition:transform 1.5s ease-out}.skinScrollDown{-webkit-transform:translateX(0);transform:translateX(0);transition:transform 1.5s ease-out}.skin{display:inline-block;width:1.5rem;height:1.5rem;position:fixed;z-index:999;top:2%;left:0;background:url(data:image/png;base64,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) no-repeat}'
	this.styleEl = document.createElement('style')
	this.styleEl.type = 'text/css'
	this.styleEl.innerHTML = style;
	document.getElementsByTagName('head').item(0).appendChild(this.styleEl)
}

function changeSkin(){
	get_skin("skins");
}
creatSheet();
document.getElementById("skin").classList.add("skin");
var session_storage = window.sessionStorage;
var skins_key = "skins";
var new_scroll_position = 0;
var last_scroll_position;
  
window.addEventListener('scroll', (e) => {
	last_scroll_position = window.scrollY;
	let skin =document.getElementById("skin");
	// 向下滚动
	if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
		skin.classList.remove("skinScrollDown");
		skin.classList.add("skinScrollUp");
		// 向上滚动
	} else if (new_scroll_position > last_scroll_position) {
		skin.classList.remove("skinScrollUp");
		skin.classList.add("skinScrollDown");
	}
	new_scroll_position = last_scroll_position;
});
init_all_skins(skins_key);
