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