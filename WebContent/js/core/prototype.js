Array.prototype.remove = function(s) {
	for (var i = 0; i < this.length; i++) {
		if (s == this[i])
			this.splice(i, 1);
	}
};