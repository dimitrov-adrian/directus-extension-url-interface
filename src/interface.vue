<template>
	<v-input
		:placeholder="placeholder"
		:disabled="disabled"
		:trim="true"
		:class="{ danger: !_isValid }"
		type="text"
		:value="localValue"
		@change="onChange"
		@input="onInput"
	>
		<template #prepend v-if="iconLeft">
			<v-icon :name="iconLeft" />
		</template>

		<template #append>
			<v-icon
				v-if="value"
				v-tooltip="$t('open_in_new_window')"
				name="launch"
				@click="open"
			/>
		</template>
	</v-input>
</template>

<script>
import qs from "qs";
function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default {
	props: {
		value: {
			type: String,
			default: null
		},
		disabled: {
			type: Boolean,
			default: false
		},
		iconLeft: {
			type: String,
			default: "link"
		},
		placeholder: {
			type: String,
			default: null
		},
		validation_pattern: {
			type: Array,
			default: () => []
		},
		remove_anchor: {
			type: Boolean,
			default: false
		},
		autoschema: {
			type: String,
			default: ""
		},
		query_params_rule: {
			type: String,
			default: "disallow"
		},
		query_params_list: {
			type: Array,
			default: () => []
		}
	},
	data: function() {
		const patterns = this.validation_pattern.map(
			pattern => new RegExp(escapeRegExp(pattern).replace(/\\\*/giu, ".*"), "i")
		);

		return {
			localValue: this.value,
			patterns
		};
	},
	watch: {
		value: function(newValue, oldValue) {
			if (newValue !== oldValue) {
				this.localValue = newValue;
			}
		},
		localValue: function(newValue, oldValue) {
			if (newValue === oldValue) return;
			if (this._isValid) {
				this.$emit("input", newValue);
			}
		}
	},
	computed: {
		_isValid: function() {
			if (!this.localValue) return true;
			try {
				new URL(this.localValue);
				return this.checkUrlAllowed(this.localValue);
			} catch (error) {
				return false;
			}
		}
	},
	methods: {
		onInput: function(newValue) {
			this.localValue = newValue || null;
		},
		onChange: function(event) {
			this.localValue = this.processValue(event.target.value);
		},
		open: function() {
			window.open(this.value, "_blank");
		},
		checkUrlAllowed: function(url) {
			if (!this.patterns || this.patterns.length < 1) return true;
			return this.patterns.some(pattern => pattern.test(url));
		},
		processValue: function(newValue) {
			let url = decodeURI(newValue);

			if (this.autoschema && !/^\w+:\/\//i.test(url)) {
				url = this.autoschema + url;
			}

			let anchor = "";
			[url, anchor] = url.split("#");

			if (this.query_params_list.length > 0) {
				const urlpieces = url.split("?");
				if (urlpieces[1]) {
					const query = qs.parse(urlpieces[1] || "");
					if (this.query_params_rule === "disallow") {
						for (const param of this.query_params_list) {
							delete query[param];
						}
					} else {
						for (const param of Object.keys(query)) {
							if (!this.query_params_list.contains(param)) {
								delete query[param];
							}
						}
					}
					url = urlpieces[0] + (query ? "?" + qs.stringify(query) : "");
				} else {
					url = urlpieces[0];
				}
			}

			if (!this.remove_anchor) {
				url += "#" + anchor;
			}

			return url;
		}
	}
};
</script>

<style lang="css" scoped>
.danger {
	--border-color: var(--danger);
	--border-normal: var(--danger);
	--v-input-border-color-focus: var(--danger);
}
</style>
