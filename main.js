class TextScramble {
	constructor(e) {
		this.el = e, this.chars = "THEDAYGOES", this.update = this.update.bind(this)
	}
	setText(e) {
		const t = this.el.innerText,
			s = Math.max(t.length, e.length),
			r = new Promise(e => this.resolve = e);
		this.queue = [];
		for (let r = 0; r < s; r++) {
			const s = t[r] || "",
				h = e[r] || "",
				a = Math.floor(40 * Math.random()),
				n = a + Math.floor(40 * Math.random());
			this.queue.push({
				from: s,
				to: h,
				start: a,
				end: n
			})
		}
		return cancelAnimationFrame(this.frameRequest), this.frame = 0, this.update(), r
	}
	update() {
		let e = "",
			t = 0;
		for (let s = 0, r = this.queue.length; s < r; s++) {
			let {
				from: r,
				to: h,
				start: a,
				end: n,
				char: o
			} = this.queue[s];
			this.frame >= n ? (t++, e += h) : this.frame >= a ? ((!o || Math.random() < .15) && (o = this.randomChar(), this.queue[s].char = o), e += `<span class="dud">${o}</span>`) : e += r
		}
		this.el.innerHTML = e, t === this.queue.length ? this.resolve() : (this.frameRequest = requestAnimationFrame(this.update), this.frame++)
	}
	randomChar() {
		return this.chars[Math.floor(Math.random() * this.chars.length)]
	}
}
const phrases = ["THE DAY GOES"],
	el = document.querySelector(".scramble"),
	fx = new TextScramble(el);
let counter = 0;
const next = () => {
	fx.setText(phrases[counter]).then(() => {
		setTimeout(next, 30000)
	}), counter = (counter + 1) % phrases.length
};
next();