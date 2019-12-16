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
var session_storage = window.sessionStorage;
var skins_key = "skins";
var new_scroll_position = 0;
var last_scroll_position;
var skinimg = document.getElementById("skin");
skinimg.setAttribute("src",
	"https://article-picture-resource-1300779066.cos.ap-chengdu.myqcloud.com/pictrue/solo-blog/skin.png");
skinimg.addEventListener('click', (e) => {
  get_skin(skins_key);
});
window.addEventListener('scroll', (e) => {
	last_scroll_position = window.scrollY;
	// 向下滚动
	if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
		skinimg.classList.remove("slideDown");
		skinimg.classList.add("slideUp");

		// 向上滚动
	} else if (new_scroll_position > last_scroll_position) {
		skinimg.classList.remove("slideUp");
		skinimg.classList.add("slideDown");
	}
	new_scroll_position = last_scroll_position;
});
init_all_skins(skins_key);
