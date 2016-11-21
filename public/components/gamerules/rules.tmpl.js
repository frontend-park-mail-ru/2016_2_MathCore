;(function(){var x=Function('return this')();if(!x.fest)x.fest={};x.fest['gamerules/rules.tmpl']=function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}__fest_buf+=("<div class=\"prokrutka\"><div class=\"mainn-page__line\"><div class=\"library_elem_title\"><h3>The idea of the game</h3><div class=\"spoiler\"><label class=\"btn\" for=\"spoiler_1\">Idea</label><input type=\"checkbox\" id=\"spoiler_1\"/><div class=\"text\">The purpose of this game is to collect as many coins as possible and\n              bring them to your ship. Seek them by fair means or foul.\n              Do you like to bravely go into battle, tactfully avoid meetings with enemies,\n              and you are a skillful truce envoy?\n               It is in your power. The main thing is to catch cherished gold!!</div></div></div><div class=\"library_elem_title\"><h3>The rules of the figth</h3><div class=\"spoiler\"><label class=\"btn\" for=\"spoiler_2\">Fight</label><input type=\"checkbox\" id=\"spoiler_2\"/><div class=\"text\">Fight - if you stand on a cell with an enemy (except a Jungle cell) than all\n              enemy\'s units (except Chunga-Changa) go to the ship (if a Fight has been on water, enemy\'s Pirates die).\n              The purpose of this game is to collect as many coins as possible and\n              bring them to your ship. Seek them by fair means or foul.\n              Do you like to bravely go into battle, tactfully avoid meetings with enemies,\n              and you are a skillful truce envoy?\n               It is in your power. The main thing is to catch cherished gThe purpose of this game is to collect as many coins as possible and\n               bring them to your ship. Seek them by fair means or foul.\n               Do you like to bravely go into battle, tactfully avoid meetings with enemies,\n               and you are a skillful truce envoy?\n                It is in your power. The main thing is to catch cherished g</div></div></div><div class=\"library_elem_title\"><h3>Description of cell fields</h3><div class=\"spoiler\"><label class=\"btn\" for=\"spoiler_3\">Field</label><input type=\"checkbox\" id=\"spoiler_3\"/><div class=\"text\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur dolorem ducimus eaque!\n              Alias assumenda, blanditiis dignissimos facilis fuga ipsam molestias necessitatibus nostrum numquam\n              raesentium quo sed sit! Aut, vitae?</div></div></div></div></div>");__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();