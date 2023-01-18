var sm, b, al, cx, ar, value, ad, bs, cs, dx, dy, sinv, bass = 1,
	treble = 1, audioPlayer, userAgent = navigator.userAgent;

function ld() {
	console.log("Load Done");
	console.log("%c欢迎来到Akebi-GC的奇妙灵堂 ", "font-family: dengxian;font-weight: 300;color: red;font-size: 100px;text-shadow: 0px 0px 6px #CCC;");
	if (userAgent.indexOf("Firefox") > -1) {
	} else {
		$('#sb').css('filter', 'saturate(0)');
	}
	setTimeout(function () {
		draw()
		freezeAllGifs();
	}, 500)
}

function onInputFileChange() {
	var file = document.getElementById('file').files[0];
	var url = URL.createObjectURL(file);
	document.getElementById("playera").src = url;
}

function draw() {
	console.log("Draw");
	document.getElementById("playera").volume = .5;
	setTimeout(function () {
		linest()
		audioPlayer.addEventListener('ended', function () {
			freezeAllGifs();
			$('.light').css('box-shadow', '0px 0px 20px red');
			$('.light').css('background', 'red');
			$('.diantext').css('opacity', '0.8');
			$('canvas#ise').css('animation', 'stop 0.5s linear infinite');
			clearInterval(sinv);
		}, false);
		audioPlayer.addEventListener('pause', function () {
			freezeAllGifs();
			$('.light').css('box-shadow', '0px 0px 20px red');
			$('.light').css('background', 'red');
			$('.diantext').css('opacity', '0.8');
			$('canvas#ise').css('animation', 'stop 0.5s linear infinite');
			clearInterval(sinv);
		}, false);
		audioPlayer.addEventListener('durationchange', function () {
			freezeAllGifs();
			$('.light').css('box-shadow', '0px 0px 20px red');
			$('.light').css('background', 'red');
			$('.diantext').css('opacity', '0.8');
			$('canvas#ise').css('animation', 'stop 0.5s linear infinite');
			clearInterval(sinv);
		}, false);
		audioPlayer.addEventListener('playing', function () {
			unfr();
			$('.light').css('box-shadow', '0px 0px 20px #33ff00');
			$('.light').css('background', '#33ff00');
			$('.diantext').css('opacity', '0');
			$('canvas#ise').css('animation', 'rot 0.5s linear infinite');
			sinv = setInterval(grd, 300);
		}, false);
	}, 500)
}

function linest() {
	try {
		cx = new (window.AudioContext || window.webkitAudioContext)
	} catch (a) {
		throw Error("请更新CHROME最新版");
	}
	al = cx.createAnalyser();
	ad = document.getElementById("playera");
	sm = cx.createMediaElementSource(ad);
	sm.connect(al);
	bassFilter = cx.createBiquadFilter();
	bassFilter.type = "lowshelf";
	bassFilter.frequency.value = 200;
	bassFilter.gain.value = bass;
	trebleFilter = cx.createBiquadFilter();
	trebleFilter.type = "highshelf";
	trebleFilter.frequency.value = 2000;
	trebleFilter.gain.value = treble;
	sm.connect(bassFilter);
	bassFilter.connect(trebleFilter);
	trebleFilter.connect(cx.destination);
	audioPlayer = document.querySelector('audio#playera');
	st()
}
function grd() {
	bs = Math.floor(Math.random() * 300 + 1);
	cs = Math.floor(Math.random() * 300 + 1);
	dy = 0 - Math.floor(Math.random() * 300 + 1);
	dx = Math.floor(Math.random() * 323 + 40);
	dy2 = -150 - Math.floor(Math.random() * 250 + 1);
	dx2 = Math.floor(Math.random() * 250 + 10);
	dx3 = Math.floor(Math.random() * 250 + 10);
	dx4 = Math.floor(Math.random() * 250 + 10);
	$('img#isa').css('margin-left', bs);
	$('img#isb').css('margin-left', cs);
	$('img#isc').css('margin-left', dx);
	$('img#isc').css('margin-top', dy);
	$('img#ise').css('margin-left', dx2);
	$('img#ise').css('margin-top', dy2);
	$('img#isf').css('margin-left', dx3);
	$('img#isi').css('margin-left', dx4);
}
function st() {
	ar = new Uint8Array(128);
	al.getByteFrequencyData(ar);
	for (var a = 0; a < ar.length; a++) {
		$("#sb").css('opacity', "1");
		$("canvas#sb").remove();
		bass = document.getElementById("low").value;
		treble = document.getElementById("high").value;
		bassFilter.gain.value = bass;
		trebleFilter.gain.value = treble;
		value = ar[a] / 250;
		vz = 1 + value;
		$(".lb").css('transform', "scale(" + vz + ")");
	}
	ar2 = new Uint8Array(6);
	al.getByteFrequencyData(ar2);
	for (var a2 = 0; a2 < ar2.length; a2++) {
		vs = ar2[a2] / 10;
		vb = 1 + (vs / 48);
		vx = 0.1 + (vs / 7 - 0.5);
		if (vb > 2.3) {
			vb = 2.3;
		}
		if (userAgent.indexOf("Firefox") > -1) {
			b = "防火狐黑屏";
		} else {
			b = "saturate(" + vx + ")";
		}
		$("#sb").css("filter", b).css("webkitFilter", b).css("mozFilter", b).css("oFilter", b).css("msFilter", b).css("transform", "scale(" + vb.toFixed(2) + ")");
	}
	requestAnimationFrame(st)
};
function createElement(type, callback) {
	var element = document.createElement(type);

	callback(element);

	return element;
}

function freezeGif(img) {
	var width = img.width,
		height = img.height,
		canvas = createElement('canvas', function (clone) {
			clone.width = width;
			clone.height = height;
		}),
		attr,
		i = 0;

	var freeze = function () {
		canvas.getContext('2d').drawImage(img, 0, 0, width, height);

		for (i = 0; i < img.attributes.length; i++) {
			attr = img.attributes[i];

			if (attr.name !== '"') {
				canvas.setAttribute(attr.name, attr.value);
			}
		}

		canvas.style.position = 'absolute';

		img.parentNode.insertBefore(canvas, img);
		img.style.opacity = 0;
	};

	if (img.complete) {
		freeze();
	} else {
		img.addEventListener('load', freeze, true);
	}
}

function freezeAllGifs() {
	return new Array().slice.apply(document.images).map(freezeGif);
}
function unfr() {
	$('canvas').remove();
	$('img').css('opacity', '1');
}
