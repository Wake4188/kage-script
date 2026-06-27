//#region node_modules/wanakana/esm/index.js
/**
* Returns detailed type as string (instead of just 'object' for arrays etc)
* @private
* @param {any} value js value
* @returns {String} type of value
* @example
* typeOf({}); // 'object'
* typeOf([]); // 'array'
* typeOf(function() {}); // 'function'
* typeOf(/a/); // 'regexp'
* typeOf(new Date()); // 'date'
* typeOf(null); // 'null'
* typeOf(undefined); // 'undefined'
* typeOf('a'); // 'string'
* typeOf(1); // 'number'
* typeOf(true); // 'boolean'
* typeOf(new Map()); // 'map'
* typeOf(new Set()); // 'map'
*/
function typeOf(value) {
	if (value === null) return "null";
	if (value !== Object(value)) return typeof value;
	return {}.toString.call(value).slice(8, -1).toLowerCase();
}
/**
* Checks if input string is empty
* @param  {String} input text input
* @return {Boolean} true if no input
*/
function isEmpty(input) {
	if (typeOf(input) !== "string") return true;
	return !input.length;
}
/**
* Takes a character and a unicode range. Returns true if the char is in the range.
* @param  {String}  char  unicode character
* @param  {Number}  start unicode start range
* @param  {Number}  end   unicode end range
* @return {Boolean}
*/
function isCharInRange(char = "", start, end) {
	if (isEmpty(char)) return false;
	const code = char.charCodeAt(0);
	return start <= code && code <= end;
}
var TO_KANA_METHODS = {
	HIRAGANA: "toHiragana",
	KATAKANA: "toKatakana"
};
var ROMANIZATIONS = { HEPBURN: "hepburn" };
/**
* Default config for WanaKana, user passed options will be merged with these
* @type {DefaultOptions}
* @name DefaultOptions
* @property {Boolean} [useObsoleteKana=false] - Set to true to use obsolete characters, such as ゐ and ゑ.
* @example
* toHiragana('we', { useObsoleteKana: true })
* // => 'ゑ'
* @property {Boolean} [passRomaji=false] - Set to true to pass romaji when using mixed syllabaries with toKatakana() or toHiragana()
* @example
* toHiragana('only convert the katakana: ヒラガナ', { passRomaji: true })
* // => "only convert the katakana: ひらがな"
* @property {Boolean} [convertLongVowelMark=true] - Set to false to prevent conversions of 'ー' to extended vowels with toHiragana()
* @example
* toHiragana('ラーメン', { convertLongVowelMark: false });
* // => 'らーめん
* @property {Boolean} [upcaseKatakana=false] - Set to true to convert katakana to uppercase using toRomaji()
* @example
* toRomaji('ひらがな カタカナ', { upcaseKatakana: true })
* // => "hiragana KATAKANA"
* @property {Boolean | 'toHiragana' | 'toKatakana'} [IMEMode=false] - Set to true, 'toHiragana', or 'toKatakana' to handle conversion while it is being typed.
* @property {'hepburn'} [romanization='hepburn'] - choose toRomaji() romanization map (currently only 'hepburn')
* @property {Object.<String, String>} [customKanaMapping] - custom map will be merged with default conversion
* @example
* toKana('wanakana', { customKanaMapping: { na: 'に', ka: 'Bana' }) };
* // => 'わにBanaに'
* @property {Object.<String, String>} [customRomajiMapping] - custom map will be merged with default conversion
* @example
* toRomaji('つじぎり', { customRomajiMapping: { じ: 'zi', つ: 'tu', り: 'li' }) };
* // => 'tuzigili'
*/
var DEFAULT_OPTIONS = {
	useObsoleteKana: false,
	passRomaji: false,
	convertLongVowelMark: true,
	upcaseKatakana: false,
	IMEMode: false,
	romanization: ROMANIZATIONS.HEPBURN
};
var LATIN_UPPERCASE_START = 65;
var LATIN_UPPERCASE_END = 90;
var HIRAGANA_START = 12353;
var HIRAGANA_END = 12438;
var KATAKANA_START = 12449;
var KATAKANA_END = 12540;
var KANJI_START = 19968;
var KANJI_END = 40879;
var KANJI_ITERATION_MARK = 12293;
var PROLONGED_SOUND_MARK = 12540;
var KANA_SLASH_DOT = 12539;
var ZENKAKU_PUNCTUATION_1 = [65281, 65295];
var ZENKAKU_PUNCTUATION_2 = [65306, 65311];
var ZENKAKU_PUNCTUATION_3 = [65339, 65343];
var ZENKAKU_PUNCTUATION_4 = [65371, 65376];
var ZENKAKU_SYMBOLS_CURRENCY = [65504, 65518];
var HIRAGANA_CHARS = [12352, 12447];
var KATAKANA_CHARS = [12448, 12543];
var HANKAKU_KATAKANA = [65382, 65439];
var KATAKANA_PUNCTUATION = [12539, 12540];
var KANA_PUNCTUATION = [65377, 65381];
var CJK_SYMBOLS_PUNCTUATION = [12288, 12351];
var KANA_RANGES = [
	HIRAGANA_CHARS,
	KATAKANA_CHARS,
	KANA_PUNCTUATION,
	HANKAKU_KATAKANA
];
var JA_PUNCTUATION_RANGES = [
	CJK_SYMBOLS_PUNCTUATION,
	KANA_PUNCTUATION,
	KATAKANA_PUNCTUATION,
	ZENKAKU_PUNCTUATION_1,
	ZENKAKU_PUNCTUATION_2,
	ZENKAKU_PUNCTUATION_3,
	ZENKAKU_PUNCTUATION_4,
	ZENKAKU_SYMBOLS_CURRENCY
];
[...KANA_RANGES, ...JA_PUNCTUATION_RANGES];
var MODERN_ENGLISH = [0, 127];
var HEPBURN_MACRON_RANGES = [
	[256, 257],
	[274, 275],
	[298, 299],
	[332, 333],
	[362, 363]
];
var SMART_QUOTE_RANGES = [[8216, 8217], [8220, 8221]];
var ROMAJI_RANGES = [MODERN_ENGLISH, ...HEPBURN_MACRON_RANGES];
var EN_PUNCTUATION_RANGES = [
	[32, 47],
	[58, 63],
	[91, 96],
	[123, 126],
	...SMART_QUOTE_RANGES
];
var safeIsNaN = Number.isNaN || function ponyfill(value) {
	return typeof value === "number" && value !== value;
};
function isEqual(first, second) {
	if (first === second) return true;
	if (safeIsNaN(first) && safeIsNaN(second)) return true;
	return false;
}
function areInputsEqual(newInputs, lastInputs) {
	if (newInputs.length !== lastInputs.length) return false;
	for (var i = 0; i < newInputs.length; i++) if (!isEqual(newInputs[i], lastInputs[i])) return false;
	return true;
}
function memoizeOne(resultFn, isEqual) {
	if (isEqual === void 0) isEqual = areInputsEqual;
	var cache = null;
	function memoized() {
		var newArgs = [];
		for (var _i = 0; _i < arguments.length; _i++) newArgs[_i] = arguments[_i];
		if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) return cache.lastResult;
		var lastResult = resultFn.apply(this, newArgs);
		cache = {
			lastResult,
			lastArgs: newArgs,
			lastThis: this
		};
		return lastResult;
	}
	memoized.clear = function clear() {
		cache = null;
	};
	return memoized;
}
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key) {
	for (key of iter.keys()) if (dequal(key, tar)) return key;
}
function dequal(foo, bar) {
	var ctor, len, tmp;
	if (foo === bar) return true;
	if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
		if (ctor === Date) return foo.getTime() === bar.getTime();
		if (ctor === RegExp) return foo.toString() === bar.toString();
		if (ctor === Array) {
			if ((len = foo.length) === bar.length) while (len-- && dequal(foo[len], bar[len]));
			return len === -1;
		}
		if (ctor === Set) {
			if (foo.size !== bar.size) return false;
			for (len of foo) {
				tmp = len;
				if (tmp && typeof tmp === "object") {
					tmp = find(bar, tmp);
					if (!tmp) return false;
				}
				if (!bar.has(tmp)) return false;
			}
			return true;
		}
		if (ctor === Map) {
			if (foo.size !== bar.size) return false;
			for (len of foo) {
				tmp = len[0];
				if (tmp && typeof tmp === "object") {
					tmp = find(bar, tmp);
					if (!tmp) return false;
				}
				if (!dequal(len[1], bar.get(tmp))) return false;
			}
			return true;
		}
		if (ctor === ArrayBuffer) {
			foo = new Uint8Array(foo);
			bar = new Uint8Array(bar);
		} else if (ctor === DataView) {
			if ((len = foo.byteLength) === bar.byteLength) while (len-- && foo.getInt8(len) === bar.getInt8(len));
			return len === -1;
		}
		if (ArrayBuffer.isView(foo)) {
			if ((len = foo.byteLength) === bar.byteLength) while (len-- && foo[len] === bar[len]);
			return len === -1;
		}
		if (!ctor || typeof foo === "object") {
			len = 0;
			for (ctor in foo) {
				if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
				if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
			}
			return Object.keys(bar).length === len;
		}
	}
	return foo !== foo && bar !== bar;
}
/**
* Easy re-use of merging with default options
* @param {Object} opts user options
* @returns user options merged over default options
*/
var mergeWithDefaultOptions = (opts = {}) => Object.assign({}, DEFAULT_OPTIONS, opts);
function applyMapping(string, mapping, convertEnding) {
	const root = mapping;
	function nextSubtree(tree, nextChar) {
		if (tree[nextChar] === void 0) return;
		return Object.assign({ "": tree[""] + nextChar }, tree[nextChar]);
	}
	function newChunk(remaining, currentCursor) {
		const firstChar = remaining.charAt(0);
		return parse(Object.assign({ "": firstChar }, root[firstChar]), remaining.slice(1), currentCursor, currentCursor + 1);
	}
	function parse(tree, remaining, lastCursor, currentCursor) {
		if (!remaining) {
			if (convertEnding || Object.keys(tree).length === 1) return tree[""] ? [[
				lastCursor,
				currentCursor,
				tree[""]
			]] : [];
			return [[
				lastCursor,
				currentCursor,
				null
			]];
		}
		if (Object.keys(tree).length === 1) return [[
			lastCursor,
			currentCursor,
			tree[""]
		]].concat(newChunk(remaining, currentCursor));
		const subtree = nextSubtree(tree, remaining.charAt(0));
		if (subtree === void 0) return [[
			lastCursor,
			currentCursor,
			tree[""]
		]].concat(newChunk(remaining, currentCursor));
		return parse(subtree, remaining.slice(1), lastCursor, currentCursor + 1);
	}
	return newChunk(string, 0);
}
function transform(tree) {
	return Object.entries(tree).reduce((map, [char, subtree]) => {
		map[char] = typeOf(subtree) === "string" ? { "": subtree } : transform(subtree);
		return map;
	}, {});
}
function getSubTreeOf(tree, string) {
	return string.split("").reduce((correctSubTree, char) => {
		if (correctSubTree[char] === void 0) correctSubTree[char] = {};
		return correctSubTree[char];
	}, tree);
}
/**
* Creates a custom mapping tree, returns a function that accepts a defaultMap which the newly created customMapping will be merged with and returned
* (customMap) => (defaultMap) => mergedMap
* @param  {Object} customMap { 'ka' : 'な' }
* @return {Function} (defaultMap) => defaultMergedWithCustomMap
* @example
* const sillyMap = createCustomMapping({ 'ちゃ': 'time', '茎': 'cookie'　});
* // sillyMap is passed defaultMapping to merge with when called in toRomaji()
* toRomaji("It's 茎 ちゃ よ", { customRomajiMapping: sillyMap });
* // => 'It's cookie time yo';
*/
function createCustomMapping(customMap = {}) {
	const customTree = {};
	if (typeOf(customMap) === "object") Object.entries(customMap).forEach(([roma, kana]) => {
		let subTree = customTree;
		roma.split("").forEach((char) => {
			if (subTree[char] === void 0) subTree[char] = {};
			subTree = subTree[char];
		});
		subTree[""] = kana;
	});
	return function makeMap(map) {
		const mapCopy = JSON.parse(JSON.stringify(map));
		function transformMap(mapSubtree, customSubtree) {
			if (mapSubtree === void 0 || typeOf(mapSubtree) === "string") return customSubtree;
			return Object.entries(customSubtree).reduce((newSubtree, [char, subtree]) => {
				newSubtree[char] = transformMap(mapSubtree[char], subtree);
				return newSubtree;
			}, mapSubtree);
		}
		return transformMap(mapCopy, customTree);
	};
}
function mergeCustomMapping(map, customMapping) {
	if (!customMapping) return map;
	return typeOf(customMapping) === "function" ? customMapping(map) : createCustomMapping(customMapping)(map);
}
var BASIC_KUNREI = {
	a: "あ",
	i: "い",
	u: "う",
	e: "え",
	o: "お",
	k: {
		a: "か",
		i: "き",
		u: "く",
		e: "け",
		o: "こ"
	},
	s: {
		a: "さ",
		i: "し",
		u: "す",
		e: "せ",
		o: "そ"
	},
	t: {
		a: "た",
		i: "ち",
		u: "つ",
		e: "て",
		o: "と"
	},
	n: {
		a: "な",
		i: "に",
		u: "ぬ",
		e: "ね",
		o: "の"
	},
	h: {
		a: "は",
		i: "ひ",
		u: "ふ",
		e: "へ",
		o: "ほ"
	},
	m: {
		a: "ま",
		i: "み",
		u: "む",
		e: "め",
		o: "も"
	},
	y: {
		a: "や",
		u: "ゆ",
		o: "よ"
	},
	r: {
		a: "ら",
		i: "り",
		u: "る",
		e: "れ",
		o: "ろ"
	},
	w: {
		a: "わ",
		i: "ゐ",
		e: "ゑ",
		o: "を"
	},
	g: {
		a: "が",
		i: "ぎ",
		u: "ぐ",
		e: "げ",
		o: "ご"
	},
	z: {
		a: "ざ",
		i: "じ",
		u: "ず",
		e: "ぜ",
		o: "ぞ"
	},
	d: {
		a: "だ",
		i: "ぢ",
		u: "づ",
		e: "で",
		o: "ど"
	},
	b: {
		a: "ば",
		i: "び",
		u: "ぶ",
		e: "べ",
		o: "ぼ"
	},
	p: {
		a: "ぱ",
		i: "ぴ",
		u: "ぷ",
		e: "ぺ",
		o: "ぽ"
	},
	v: {
		a: "ゔぁ",
		i: "ゔぃ",
		u: "ゔ",
		e: "ゔぇ",
		o: "ゔぉ"
	}
};
var SPECIAL_SYMBOLS$1 = {
	".": "。",
	",": "、",
	":": "：",
	"/": "・",
	"!": "！",
	"?": "？",
	"~": "〜",
	"-": "ー",
	"‘": "「",
	"’": "」",
	"“": "『",
	"”": "』",
	"[": "［",
	"]": "］",
	"(": "（",
	")": "）",
	"{": "｛",
	"}": "｝"
};
var CONSONANTS = {
	k: "き",
	s: "し",
	t: "ち",
	n: "に",
	h: "ひ",
	m: "み",
	r: "り",
	g: "ぎ",
	z: "じ",
	d: "ぢ",
	b: "び",
	p: "ぴ",
	v: "ゔ",
	q: "く",
	f: "ふ"
};
var SMALL_Y$1 = {
	ya: "ゃ",
	yi: "ぃ",
	yu: "ゅ",
	ye: "ぇ",
	yo: "ょ"
};
var SMALL_VOWELS = {
	a: "ぁ",
	i: "ぃ",
	u: "ぅ",
	e: "ぇ",
	o: "ぉ"
};
var ALIASES = {
	sh: "sy",
	ch: "ty",
	cy: "ty",
	chy: "ty",
	shy: "sy",
	j: "zy",
	jy: "zy",
	shi: "si",
	chi: "ti",
	tsu: "tu",
	ji: "zi",
	fu: "hu"
};
var SMALL_LETTERS = Object.assign({
	tu: "っ",
	wa: "ゎ",
	ka: "ヵ",
	ke: "ヶ"
}, SMALL_VOWELS, SMALL_Y$1);
var SPECIAL_CASES = {
	yi: "い",
	wu: "う",
	ye: "いぇ",
	wi: "うぃ",
	we: "うぇ",
	kwa: "くぁ",
	whu: "う",
	tha: "てゃ",
	thu: "てゅ",
	tho: "てょ",
	dha: "でゃ",
	dhu: "でゅ",
	dho: "でょ"
};
var AIUEO_CONSTRUCTIONS = {
	wh: "う",
	kw: "く",
	qw: "く",
	q: "く",
	gw: "ぐ",
	sw: "す",
	ts: "つ",
	th: "て",
	tw: "と",
	dh: "で",
	dw: "ど",
	fw: "ふ",
	f: "ふ"
};
function createRomajiToKanaMap$1() {
	const kanaTree = transform(BASIC_KUNREI);
	const subtreeOf = (string) => getSubTreeOf(kanaTree, string);
	Object.entries(CONSONANTS).forEach(([consonant, yKana]) => {
		Object.entries(SMALL_Y$1).forEach(([roma, kana]) => {
			subtreeOf(consonant + roma)[""] = yKana + kana;
		});
	});
	Object.entries(SPECIAL_SYMBOLS$1).forEach(([symbol, jsymbol]) => {
		subtreeOf(symbol)[""] = jsymbol;
	});
	Object.entries(AIUEO_CONSTRUCTIONS).forEach(([consonant, aiueoKana]) => {
		Object.entries(SMALL_VOWELS).forEach(([vowel, kana]) => {
			const subtree = subtreeOf(consonant + vowel);
			subtree[""] = aiueoKana + kana;
		});
	});
	[
		"n",
		"n'",
		"xn"
	].forEach((nChar) => {
		subtreeOf(nChar)[""] = "ん";
	});
	kanaTree.c = JSON.parse(JSON.stringify(kanaTree.k));
	Object.entries(ALIASES).forEach(([string, alternative]) => {
		const allExceptLast = string.slice(0, string.length - 1);
		const last = string.charAt(string.length - 1);
		const parentTree = subtreeOf(allExceptLast);
		parentTree[last] = JSON.parse(JSON.stringify(subtreeOf(alternative)));
	});
	function getAlternatives(string) {
		return [...Object.entries(ALIASES), ...[["c", "k"]]].reduce((list, [alt, roma]) => string.startsWith(roma) ? list.concat(string.replace(roma, alt)) : list, []);
	}
	Object.entries(SMALL_LETTERS).forEach(([kunreiRoma, kana]) => {
		const last = (char) => char.charAt(char.length - 1);
		const allExceptLast = (chars) => chars.slice(0, chars.length - 1);
		const xSubtree = subtreeOf(`x${kunreiRoma}`);
		xSubtree[""] = kana;
		const parentTree = subtreeOf(`l${allExceptLast(kunreiRoma)}`);
		parentTree[last(kunreiRoma)] = xSubtree;
		getAlternatives(kunreiRoma).forEach((altRoma) => {
			["l", "x"].forEach((prefix) => {
				const altParentTree = subtreeOf(prefix + allExceptLast(altRoma));
				altParentTree[last(altRoma)] = subtreeOf(prefix + kunreiRoma);
			});
		});
	});
	Object.entries(SPECIAL_CASES).forEach(([string, kana]) => {
		subtreeOf(string)[""] = kana;
	});
	function addTsu(tree) {
		return Object.entries(tree).reduce((tsuTree, [key, value]) => {
			if (!key) tsuTree[key] = `っ${value}`;
			else tsuTree[key] = addTsu(value);
			return tsuTree;
		}, {});
	}
	[
		...Object.keys(CONSONANTS),
		"c",
		"y",
		"w",
		"j"
	].forEach((consonant) => {
		const subtree = kanaTree[consonant];
		subtree[consonant] = addTsu(subtree);
	});
	delete kanaTree.n.n;
	return Object.freeze(JSON.parse(JSON.stringify(kanaTree)));
}
var romajiToKanaMap = null;
function getRomajiToKanaTree() {
	if (romajiToKanaMap == null) romajiToKanaMap = createRomajiToKanaMap$1();
	return romajiToKanaMap;
}
var USE_OBSOLETE_KANA_MAP = createCustomMapping({
	wi: "ゐ",
	we: "ゑ"
});
function IME_MODE_MAP(map) {
	const mapCopy = JSON.parse(JSON.stringify(map));
	mapCopy.n.n = { "": "ん" };
	mapCopy.n[" "] = { "": "ん" };
	return mapCopy;
}
/**
* Tests if char is in English unicode uppercase range
* @param  {String} char
* @return {Boolean}
*/
function isCharUpperCase(char = "") {
	if (isEmpty(char)) return false;
	return isCharInRange(char, LATIN_UPPERCASE_START, LATIN_UPPERCASE_END);
}
/**
* Returns true if char is 'ー'
* @param  {String} char to test
* @return {Boolean}
*/
function isCharLongDash(char = "") {
	if (isEmpty(char)) return false;
	return char.charCodeAt(0) === PROLONGED_SOUND_MARK;
}
/**
* Tests if char is '・'
* @param  {String} char
* @return {Boolean} true if '・'
*/
function isCharSlashDot(char = "") {
	if (isEmpty(char)) return false;
	return char.charCodeAt(0) === KANA_SLASH_DOT;
}
/**
* Tests a character. Returns true if the character is [Hiragana](https://en.wikipedia.org/wiki/Hiragana).
* @param  {String} char character string to test
* @return {Boolean}
*/
function isCharHiragana(char = "") {
	if (isEmpty(char)) return false;
	if (isCharLongDash(char)) return true;
	return isCharInRange(char, HIRAGANA_START, HIRAGANA_END);
}
/**
* Convert [Hiragana](https://en.wikipedia.org/wiki/Hiragana) to [Katakana](https://en.wikipedia.org/wiki/Katakana)
* Passes through any non-hiragana chars
* @private
* @param  {String} [input=''] text input
* @return {String} converted text
* @example
* hiraganaToKatakana('ひらがな')
* // => "ヒラガナ"
* hiraganaToKatakana('ひらがな is a type of kana')
* // => "ヒラガナ is a type of kana"
*/
function hiraganaToKatakana(input = "") {
	const kata = [];
	input.split("").forEach((char) => {
		if (isCharLongDash(char) || isCharSlashDot(char)) kata.push(char);
		else if (isCharHiragana(char)) {
			const code = char.charCodeAt(0) + (KATAKANA_START - HIRAGANA_START);
			const kataChar = String.fromCharCode(code);
			kata.push(kataChar);
		} else kata.push(char);
	});
	return kata.join("");
}
var createRomajiToKanaMap = memoizeOne((IMEMode, useObsoleteKana, customKanaMapping) => {
	let map = getRomajiToKanaTree();
	map = IMEMode ? IME_MODE_MAP(map) : map;
	map = useObsoleteKana ? USE_OBSOLETE_KANA_MAP(map) : map;
	if (customKanaMapping) map = mergeCustomMapping(map, customKanaMapping);
	return map;
}, dequal);
/**
* Convert [Romaji](https://en.wikipedia.org/wiki/Romaji) to [Kana](https://en.wikipedia.org/wiki/Kana), lowercase text will result in [Hiragana](https://en.wikipedia.org/wiki/Hiragana) and uppercase text will result in [Katakana](https://en.wikipedia.org/wiki/Katakana).
* @param  {String} [input=''] text
* @param  {DefaultOptions} [options=defaultOptions]
* @param  {Object.<string, string>} [map] custom mapping
* @return {String} converted text
* @example
* toKana('onaji BUTTSUUJI')
* // => 'おなじ ブッツウジ'
* toKana('ONAJI buttsuuji')
* // => 'オナジ ぶっつうじ'
* toKana('座禅‘zazen’スタイル')
* // => '座禅「ざぜん」スタイル'
* toKana('batsuge-mu')
* // => 'ばつげーむ'
* toKana('!?.:/,~-‘’“”[](){}') // Punctuation conversion
* // => '！？。：・、〜ー「」『』［］（）｛｝'
* toKana('we', { useObsoleteKana: true })
* // => 'ゑ'
* toKana('wanakana', { customKanaMapping: { na: 'に', ka: 'bana' } });
* // => 'わにbanaに'
*/
function toKana(input = "", options = {}, map) {
	let config;
	if (!map) {
		config = mergeWithDefaultOptions(options);
		map = createRomajiToKanaMap(config.IMEMode, config.useObsoleteKana, config.customKanaMapping);
	} else config = options;
	return splitIntoConvertedKana(input, config, map).map((kanaToken) => {
		const [start, end, kana] = kanaToken;
		if (kana === null) return input.slice(start);
		const enforceHiragana = config.IMEMode === TO_KANA_METHODS.HIRAGANA;
		const enforceKatakana = config.IMEMode === TO_KANA_METHODS.KATAKANA || [...input.slice(start, end)].every(isCharUpperCase);
		return enforceHiragana || !enforceKatakana ? kana : hiraganaToKatakana(kana);
	}).join("");
}
/**
*
* @private
* @param {String} [input=''] input text
* @param {DefaultOptions} [options=defaultOptions] toKana options
* @param {Object} [map] custom mapping
* @returns {Array[]} [[start, end, token]]
* @example
* splitIntoConvertedKana('buttsuuji')
* // => [[0, 2, 'ぶ'], [2, 6, 'っつ'], [6, 7, 'う'], [7, 9, 'じ']]
*/
function splitIntoConvertedKana(input = "", options = {}, map) {
	const { IMEMode, useObsoleteKana, customKanaMapping } = options;
	if (!map) map = createRomajiToKanaMap(IMEMode, useObsoleteKana, customKanaMapping);
	return applyMapping(input.toLowerCase(), map, !IMEMode);
}
/**
* Tests a character. Returns true if the character is [Romaji](https://en.wikipedia.org/wiki/Romaji) (allowing [Hepburn romanisation](https://en.wikipedia.org/wiki/Hepburn_romanization))
* @param  {String} char character string to test
* @return {Boolean}
*/
function isCharRomaji(char = "") {
	if (isEmpty(char)) return false;
	return ROMAJI_RANGES.some(([start, end]) => isCharInRange(char, start, end));
}
/**
* Test if `input` is [Romaji](https://en.wikipedia.org/wiki/Romaji) (allowing [Hepburn romanisation](https://en.wikipedia.org/wiki/Hepburn_romanization))
* @param  {String} [input=''] text
* @param  {RegExp} [allowed] additional test allowed to pass for each char
* @return {Boolean} true if [Romaji](https://en.wikipedia.org/wiki/Romaji)
* @example
* isRomaji('Tōkyō and Ōsaka')
* // => true
* isRomaji('12a*b&c-d')
* // => true
* isRomaji('あアA')
* // => false
* isRomaji('お願い')
* // => false
* isRomaji('a！b&cーd') // Zenkaku punctuation fails
* // => false
* isRomaji('a！b&cーd', /[！ー]/)
* // => true
*/
function isRomaji(input = "", allowed) {
	const augmented = typeOf(allowed) === "regexp";
	return isEmpty(input) ? false : [...input].every((char) => {
		const isRoma = isCharRomaji(char);
		return !augmented ? isRoma : isRoma || allowed.test(char);
	});
}
/**
* Tests a character. Returns true if the character is [Katakana](https://en.wikipedia.org/wiki/Katakana).
* @param  {String} char character string to test
* @return {Boolean}
*/
function isCharKatakana(char = "") {
	return isCharInRange(char, KATAKANA_START, KATAKANA_END);
}
/**
* Test if `input` is [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
* @param  {String} [input=''] text
* @return {Boolean} true if all [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
* @example
* isHiragana('げーむ')
* // => true
* isHiragana('A')
* // => false
* isHiragana('あア')
* // => false
*/
function isHiragana(input = "") {
	if (isEmpty(input)) return false;
	return [...input].every(isCharHiragana);
}
/**
* Test if `input` is [Katakana](https://en.wikipedia.org/wiki/Katakana)
* @param  {String} [input=''] text
* @return {Boolean} true if all [Katakana](https://en.wikipedia.org/wiki/Katakana)
* @example
* isKatakana('ゲーム')
* // => true
* isKatakana('あ')
* // => false
* isKatakana('A')
* // => false
* isKatakana('あア')
* // => false
*/
function isKatakana(input = "") {
	if (isEmpty(input)) return false;
	return [...input].every(isCharKatakana);
}
/**
* Returns true if char is '々'
* @param  {String} char to test
* @return {Boolean}
*/
function isCharIterationMark(char = "") {
	if (isEmpty(char)) return false;
	return char.charCodeAt(0) === KANJI_ITERATION_MARK;
}
/**
* Tests a character. Returns true if the character is a CJK ideograph (kanji).
* @param  {String} char character string to test
* @return {Boolean}
*/
function isCharKanji(char = "") {
	return isCharInRange(char, KANJI_START, KANJI_END) || isCharIterationMark(char);
}
/**
* Tests if `input` is [Kanji](https://en.wikipedia.org/wiki/Kanji) ([Japanese CJK ideographs](https://en.wikipedia.org/wiki/CJK_Unified_Ideographs))
* @param  {String} [input=''] text
* @return {Boolean} true if all [Kanji](https://en.wikipedia.org/wiki/Kanji)
* @example
* isKanji('刀')
* // => true
* isKanji('切腹')
* // => true
* isKanji('勢い')
* // => false
* isKanji('あAア')
* // => false
* isKanji('🐸')
* // => false
*/
function isKanji(input = "") {
	if (isEmpty(input)) return false;
	return [...input].every(isCharKanji);
}
/**
* Test if `input` contains a mix of [Romaji](https://en.wikipedia.org/wiki/Romaji) *and* [Kana](https://en.wikipedia.org/wiki/Kana), defaults to pass through [Kanji](https://en.wikipedia.org/wiki/Kanji)
* @param  {String} input text
* @param  {{ passKanji: Boolean}} [options={ passKanji: true }] optional config to pass through kanji
* @return {Boolean} true if mixed
* @example
* isMixed('Abあア'))
* // => true
* isMixed('お腹A')) // ignores kanji by default
* // => true
* isMixed('お腹A', { passKanji: false }))
* // => false
* isMixed('ab'))
* // => false
* isMixed('あア'))
* // => false
*/
function isMixed(input = "", options = { passKanji: true }) {
	const chars = [...input];
	let hasKanji = false;
	if (!options.passKanji) hasKanji = chars.some(isKanji);
	return (chars.some(isHiragana) || chars.some(isKatakana)) && chars.some(isRomaji) && !hasKanji;
}
var isCharInitialLongDash = (char, index) => isCharLongDash(char) && index < 1;
var isCharInnerLongDash = (char, index) => isCharLongDash(char) && index > 0;
var isKanaAsSymbol = (char) => ["ヶ", "ヵ"].includes(char);
var LONG_VOWELS = {
	a: "あ",
	i: "い",
	u: "う",
	e: "え",
	o: "う"
};
function katakanaToHiragana(input = "", toRomaji, { isDestinationRomaji, convertLongVowelMark } = {}) {
	let previousKana = "";
	return input.split("").reduce((hira, char, index) => {
		if (isCharSlashDot(char) || isCharInitialLongDash(char, index) || isKanaAsSymbol(char)) return hira.concat(char);
		if (convertLongVowelMark && previousKana && isCharInnerLongDash(char, index)) {
			const romaji = toRomaji(previousKana).slice(-1);
			if (isCharKatakana(input[index - 1]) && romaji === "o" && isDestinationRomaji) return hira.concat("お");
			return hira.concat(LONG_VOWELS[romaji]);
		}
		if (!isCharLongDash(char) && isCharKatakana(char)) {
			const code = char.charCodeAt(0) + (HIRAGANA_START - KATAKANA_START);
			const hiraChar = String.fromCharCode(code);
			previousKana = hiraChar;
			return hira.concat(hiraChar);
		}
		previousKana = "";
		return hira.concat(char);
	}, []).join("");
}
var kanaToHepburnMap = null;
var BASIC_ROMAJI = {
	あ: "a",
	い: "i",
	う: "u",
	え: "e",
	お: "o",
	か: "ka",
	き: "ki",
	く: "ku",
	け: "ke",
	こ: "ko",
	さ: "sa",
	し: "shi",
	す: "su",
	せ: "se",
	そ: "so",
	た: "ta",
	ち: "chi",
	つ: "tsu",
	て: "te",
	と: "to",
	な: "na",
	に: "ni",
	ぬ: "nu",
	ね: "ne",
	の: "no",
	は: "ha",
	ひ: "hi",
	ふ: "fu",
	へ: "he",
	ほ: "ho",
	ま: "ma",
	み: "mi",
	む: "mu",
	め: "me",
	も: "mo",
	ら: "ra",
	り: "ri",
	る: "ru",
	れ: "re",
	ろ: "ro",
	や: "ya",
	ゆ: "yu",
	よ: "yo",
	わ: "wa",
	ゐ: "wi",
	ゑ: "we",
	を: "wo",
	ん: "n",
	が: "ga",
	ぎ: "gi",
	ぐ: "gu",
	げ: "ge",
	ご: "go",
	ざ: "za",
	じ: "ji",
	ず: "zu",
	ぜ: "ze",
	ぞ: "zo",
	だ: "da",
	ぢ: "ji",
	づ: "zu",
	で: "de",
	ど: "do",
	ば: "ba",
	び: "bi",
	ぶ: "bu",
	べ: "be",
	ぼ: "bo",
	ぱ: "pa",
	ぴ: "pi",
	ぷ: "pu",
	ぺ: "pe",
	ぽ: "po",
	ゔぁ: "va",
	ゔぃ: "vi",
	ゔ: "vu",
	ゔぇ: "ve",
	ゔぉ: "vo"
};
var SPECIAL_SYMBOLS = {
	"。": ".",
	"、": ",",
	"：": ":",
	"・": "/",
	"！": "!",
	"？": "?",
	"〜": "~",
	"ー": "-",
	"「": "‘",
	"」": "’",
	"『": "“",
	"』": "”",
	"［": "[",
	"］": "]",
	"（": "(",
	"）": ")",
	"｛": "{",
	"｝": "}",
	"　": " "
};
var AMBIGUOUS_VOWELS = [
	"あ",
	"い",
	"う",
	"え",
	"お",
	"や",
	"ゆ",
	"よ"
];
var SMALL_Y = {
	ゃ: "ya",
	ゅ: "yu",
	ょ: "yo"
};
var SMALL_Y_EXTRA = {
	ぃ: "yi",
	ぇ: "ye"
};
var SMALL_AIUEO = {
	ぁ: "a",
	ぃ: "i",
	ぅ: "u",
	ぇ: "e",
	ぉ: "o"
};
var YOON_KANA = [
	"き",
	"に",
	"ひ",
	"み",
	"り",
	"ぎ",
	"び",
	"ぴ",
	"ゔ",
	"く",
	"ふ"
];
var YOON_EXCEPTIONS = {
	し: "sh",
	ち: "ch",
	じ: "j",
	ぢ: "j"
};
var SMALL_KANA = {
	っ: "",
	ゃ: "ya",
	ゅ: "yu",
	ょ: "yo",
	ぁ: "a",
	ぃ: "i",
	ぅ: "u",
	ぇ: "e",
	ぉ: "o"
};
var SOKUON_WHITELIST = {
	b: "b",
	c: "t",
	d: "d",
	f: "f",
	g: "g",
	h: "h",
	j: "j",
	k: "k",
	m: "m",
	p: "p",
	q: "q",
	r: "r",
	s: "s",
	t: "t",
	v: "v",
	w: "w",
	x: "x",
	z: "z"
};
function getKanaToHepburnTree() {
	if (kanaToHepburnMap == null) kanaToHepburnMap = createKanaToHepburnMap();
	return kanaToHepburnMap;
}
function getKanaToRomajiTree(romanization) {
	switch (romanization) {
		case ROMANIZATIONS.HEPBURN: return getKanaToHepburnTree();
		default: return {};
	}
}
function createKanaToHepburnMap() {
	const romajiTree = transform(BASIC_ROMAJI);
	const subtreeOf = (string) => getSubTreeOf(romajiTree, string);
	const setTrans = (string, transliteration) => {
		subtreeOf(string)[""] = transliteration;
	};
	Object.entries(SPECIAL_SYMBOLS).forEach(([jsymbol, symbol]) => {
		subtreeOf(jsymbol)[""] = symbol;
	});
	[...Object.entries(SMALL_Y), ...Object.entries(SMALL_AIUEO)].forEach(([roma, kana]) => {
		setTrans(roma, kana);
	});
	YOON_KANA.forEach((kana) => {
		const firstRomajiChar = subtreeOf(kana)[""][0];
		Object.entries(SMALL_Y).forEach(([yKana, yRoma]) => {
			setTrans(kana + yKana, firstRomajiChar + yRoma);
		});
		Object.entries(SMALL_Y_EXTRA).forEach(([yKana, yRoma]) => {
			setTrans(kana + yKana, firstRomajiChar + yRoma);
		});
	});
	Object.entries(YOON_EXCEPTIONS).forEach(([kana, roma]) => {
		Object.entries(SMALL_Y).forEach(([yKana, yRoma]) => {
			setTrans(kana + yKana, roma + yRoma[1]);
		});
		setTrans(`${kana}ぃ`, `${roma}yi`);
		setTrans(`${kana}ぇ`, `${roma}e`);
	});
	romajiTree["っ"] = resolveTsu(romajiTree);
	Object.entries(SMALL_KANA).forEach(([kana, roma]) => {
		setTrans(kana, roma);
	});
	AMBIGUOUS_VOWELS.forEach((kana) => {
		setTrans(`ん${kana}`, `n'${subtreeOf(kana)[""]}`);
	});
	return Object.freeze(JSON.parse(JSON.stringify(romajiTree)));
}
function resolveTsu(tree) {
	return Object.entries(tree).reduce((tsuTree, [key, value]) => {
		if (!key) {
			const consonant = value.charAt(0);
			tsuTree[key] = Object.keys(SOKUON_WHITELIST).includes(consonant) ? SOKUON_WHITELIST[consonant] + value : value;
		} else tsuTree[key] = resolveTsu(value);
		return tsuTree;
	}, {});
}
var createKanaToRomajiMap = memoizeOne((romanization, customRomajiMapping) => {
	let map = getKanaToRomajiTree(romanization);
	if (customRomajiMapping) map = mergeCustomMapping(map, customRomajiMapping);
	return map;
}, dequal);
/**
* Convert kana to romaji
* @param  {String} kana text input
* @param  {DefaultOptions} [options=defaultOptions]
* @param  {Object.<string, string>} [map] custom mapping
* @return {String} converted text
* @example
* toRomaji('ひらがな　カタカナ')
* // => 'hiragana katakana'
* toRomaji('げーむ　ゲーム')
* // => 'ge-mu geemu'
* toRomaji('ひらがな　カタカナ', { upcaseKatakana: true })
* // => 'hiragana KATAKANA'
* toRomaji('つじぎり', { customRomajiMapping: { じ: 'zi', つ: 'tu', り: 'li' } });
* // => 'tuzigili'
*/
function toRomaji(input = "", options = {}, map) {
	const config = mergeWithDefaultOptions(options);
	if (!map) map = createKanaToRomajiMap(config.romanization, config.customRomajiMapping);
	return splitIntoRomaji(input, config, map).map((romajiToken) => {
		const [start, end, romaji] = romajiToken;
		return config.upcaseKatakana && isKatakana(input.slice(start, end)) ? romaji.toUpperCase() : romaji;
	}).join("");
}
function splitIntoRomaji(input, options, map) {
	if (!map) map = createKanaToRomajiMap(options.romanization, options.customRomajiMapping);
	return applyMapping(katakanaToHiragana(input, toRomaji, Object.assign({}, { isDestinationRomaji: true }, options)), map, !options.IMEMode);
}
/**
* Tests a character. Returns true if the character is considered English punctuation.
* @param  {String} char character string to test
* @return {Boolean}
*/
function isCharEnglishPunctuation(char = "") {
	if (isEmpty(char)) return false;
	return EN_PUNCTUATION_RANGES.some(([start, end]) => isCharInRange(char, start, end));
}
/**
* Convert input to [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
* @param  {String} [input=''] text
* @param  {DefaultOptions} [options=defaultOptions]
* @return {String} converted text
* @example
* toHiragana('toukyou, オオサカ')
* // => 'とうきょう、　おおさか'
* toHiragana('only カナ', { passRomaji: true })
* // => 'only かな'
* toHiragana('wi')
* // => 'うぃ'
* toHiragana('wi', { useObsoleteKana: true })
* // => 'ゐ'
*/
function toHiragana(input = "", options = {}) {
	const config = mergeWithDefaultOptions(options);
	if (config.passRomaji) return katakanaToHiragana(input, toRomaji, config);
	if (isMixed(input, { passKanji: true })) return toKana(katakanaToHiragana(input, toRomaji, config).toLowerCase(), config);
	if (isRomaji(input) || isCharEnglishPunctuation(input)) return toKana(input.toLowerCase(), config);
	return katakanaToHiragana(input, toRomaji, config);
}
//#endregion
export { toHiragana as t };
