module.exports = class Recursion {
	static retriesTimes = 0;

	static recursive(callback, options) {
		const retries =
			options && options.retries !== undefined ? options.retries : 3;
		const catchError =
			options && options.catchError !== undefined
				? options.catchError
				: true;

		let value = null;
		try {
			value = callback();
		} catch (e) {
			if (this.retriesTimes < retries) {
				this.retriesTimes++;
				value = this.recursive(callback, options);
			} else {
				if (catchError) throw e;
			}
		}

		return value;
	}

	static async recursiveAsync(callback, options) {
		const retries =
			options && options.retries !== undefined ? options.retries : 3;
		const catchError =
			options && options.catchError !== undefined
				? options.catchError
				: true;

		let value = null;
		try {
			value = await callback();
		} catch (e) {
			if (this.retriesTimes < retries) {
				this.retriesTimes++;
				value = await this.recursiveAsync(callback, options);
			} else {
				if (catchError) throw e;
			}
		}

		return value;
	}
};
