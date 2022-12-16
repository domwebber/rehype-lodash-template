import { TemplateOptions } from "lodash";
import makeTemplate from "lodash.template";
import { visitParents as visit } from "unist-util-visit-parents";

interface AttachProps {
  values: object;
  options: TemplateOptions;
}

/**
 * Rehype plugin to replace template strings.
 * Uses lodash.template for templating.
 *
 * @author Viktor Yakubiv (www.yakubiv.com)
 * @author Dom Webber <dom.webber@hotmail.com>
 */
export default function attach({ values, options }: AttachProps) {
  const valueCache = new Map();

  const template = (identifier: string) => {
    if (!valueCache.has(identifier)) {
      valueCache.set(identifier, makeTemplate(identifier, options));
    }

    return valueCache.get(identifier);
  };

  const substitute = (identifier: string) => {
    const replacedString = template(identifier)(values);

    // When the template matches one value completely, it's better to return
    // original value so the compiler can process it in own way.
    // This is helpful for boolean attributes like `hidden`
    // and useful for nullish values to remove the attribute or text completely.
    const valueEntry = Object.entries(values).find(
      ([name, value]) =>
        value.indexOf(name) >= 0 && replacedString === String(value)
    );

    return valueEntry?.[1] ?? replacedString;
  };

  const visitor = (node, ancestors) => {
    if (node.properties != null) {
      const processedPropEntries = Object.entries(node.properties).map(
        ([name, value]) =>
          Array.isArray(value)
            ? [name, substitute(value.join(" ")).split(/\s+/)]
            : [name, substitute(String(value))]
      );

      node.properties = Object.fromEntries(processedPropEntries);
    }

    if (node.value != null) {
      node.value = substitute(node.value) ?? "";

      if (node.value == null || node.value === "") {
        const [parent] = ancestors.slice(-1);
        const index = parent.children.indexOf(node);
        parent.children.splice(index, 1);
      } else if (typeof node.value != "string") {
        node.value = String(node.value);
      }
    }
  };

  const transform = (tree) => {
    visit(tree, visitor);
  };

  return transform;
}
