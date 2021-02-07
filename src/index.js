import Interface from "./interface.vue";

export default {
	id: "extensions-url",
	name: "URL",
	description: "URL input field with validation",
	icon: "link",
	component: Interface,
	types: ["string"],
	recommendedDisplays: ["extension-url", "link"],
	options: [
		{
			field: "placeholder",
			name: "Placeholder",
			meta: {
				width: "half",
				interface: "text-input",
				options: {
					placeholder: "Enter a placeholder..."
				}
			}
		},
		{
			field: "iconLeft",
			name: "Icon Left",
			type: "string",
			meta: {
				width: "half",
				interface: "icon"
			},
			schema: {
				default_value: "link"
			}
		},
		{
			field: "validation_pattern",
			name: "URL validation ",
			type: "string",
			meta: {
				width: "full",
				interface: "tags",
				options: {
					placeholder: "example.com/some/*/paths",
					iconRight: "filter_alt"
				}
			}
		},
		{
			field: "autoschema",
			name: "If no schema",
			type: "string",
			meta: {
				width: "half",
				interface: "dropdown",
				options: {
					choices: [
						{ text: "Disallow", value: "" },
						{ text: "Set https", value: "https://" },
						{ text: "Set http", value: "http://" }
					],
					allowOther: true
				}
			},
			schema: {
				default_value: ""
			}
		},
		{
			field: "query_params_rule",
			name: "Query Params Rule",
			type: "string",
			meta: {
				width: "full",
				interface: "radio-buttons",
				options: {
					choices: [
						{ text: "Allow List", value: "allow" },
						{ text: "Disallow", value: "disallow" }
					]
				}
			},
			schema: {
				default_value: "disallow"
			}
		},
		{
			field: "query_params_list",
			name: "Query Params List",
			type: "string",
			meta: {
				width: "full",
				interface: "tags",
				options: {
					iconRight: "label"
				}
			}
		},
		{
			field: "remove_anchor",
			name: "Remove Anchor",
			type: "boolean",
			meta: {
				width: "half",
				interface: "toggle"
			},
			schema: {
				default_value: false
			}
		}
	]
};
