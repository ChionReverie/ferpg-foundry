export function* readTablePaths(
    treePath: string,
    tree: object
  ): Generator<{ key: string; value: string }> {
    for (let [key, branch] of Object.entries(tree)) {
      const branchPath = `${treePath}${key}`;
      if (typeof branch !== "object") {
        yield { key: branchPath, value: branch };
      } else {
        yield* readTablePaths(`${branchPath}/`, branch);
      }
    }
  }

export function findWithinNode(parent: JQuery, selector: string): JQuery {
  const result = parent.find(selector);
  if (result.length === 0) {
    throw new Error(`Expected an element matching selector (${selector})`);
  }
  return result;
}