import iterateJsdoc from '../iterateJsdoc.js';
import {
  parse,
  traverse,
  tryParse,
} from '@es-joy/jsdoccomment';
import * as resolve from '@es-joy/resolve.exports';
import {
  parse as espree,
} from 'espree';
import {
  readFileSync,
} from 'node:fs';
import {
  isBuiltin as isBuiltinModule,
} from 'node:module';
import {
  join,
} from 'node:path';

/**
 * @typedef {'dependencies'|'devDependencies'|'peerDependencies'} DependencyField
 */

/**
 * The project's `package.json`, read once; `null` if it could not be read.
 * @type {{[key in DependencyField]?: {[name: string]: string}}|null|undefined}
 */
let pkg;

const setPkg = function () {
  try {
    pkg = JSON.parse(
      readFileSync(join(process.cwd(), './package.json'), 'utf8'),
    );
  /* c8 ignore next -- our package.json exists */
  } catch (error) {
    /* c8 ignore next -- our package.json exists */
    pkg = null;
    /* c8 ignore next 4 -- our package.json exists */
    /* eslint-disable no-console -- Inform user */
    console.log(error);
    /* eslint-enable no-console -- Inform user */
  }
};

/**
 * The allowed package names, for each combination of checked fields.
 * @type {Map<string, Set<string>>}
 */
const depsByFields = new Map();

/**
 * @param {DependencyField[]} fields
 * @returns {Set<string>}
 */
const getDeps = (fields) => {
  const key = fields.join(',');
  let deps = depsByFields.get(key);
  if (!deps) {
    const projectPkg = /** @type {NonNullable<typeof pkg>} */ (pkg);
    deps = new Set(fields.flatMap((field) => {
      // A missing field spreads to nothing
      return Object.keys({
        ...projectPkg[field],
      });
    }));
    depsByFields.set(key, deps);
  }

  return deps;
};

/**
 * For each imported package, the name to look for in `package.json`:
 * `@types/<name>` when the package has no types of its own.
 * @type {Map<string, string>}
 */
const moduleCheck = new Map();

export default iterateJsdoc(({
  context,
  jsdoc,
  settings,
  utils,
}) => {
  if (pkg === undefined) {
    setPkg();
  }

  /* c8 ignore next 3 -- our package.json exists */
  if (pkg === null) {
    return;
  }

  /** @type {{[key in DependencyField]: boolean}} */
  const checkedFields = {
    dependencies: true,
    devDependencies: true,
    peerDependencies: false,
    ...context.options[0],
  };
  const deps = getDeps(
    /** @type {DependencyField[]} */ (Object.keys(checkedFields)).filter((field) => {
      return checkedFields[field];
    }),
  );

  const {
    mode,
  } = settings;

  for (const tag of jsdoc.tags) {
    let typeAst;
    try {
      typeAst = mode === 'permissive' ?
        tryParse(tag.type, undefined, {
          computedPropertyParser: espree,
        }) :
        parse(tag.type, mode, {
          computedPropertyParser: espree,
        });
    } catch {
      continue;
    }

    traverse(typeAst, (nde) => {
      if (nde.type === 'JsdocTypeImport') {
        const mod = nde.element.value.replace(
          /^(@[^\/]+\/[^\/]+|[^\/]+).*$/v, '$1',
        );

        if ((/^[.\/]/v).test(mod)) {
          return;
        }

        if (isBuiltinModule(mod)) {
          // mod = '@types/node';
          // moduleCheck.set(mod, !deps.has(mod));
          return;
        } else if (!moduleCheck.has(mod)) {
          let modulePkg;
          try {
            modulePkg = JSON.parse(
              readFileSync(join(process.cwd(), 'node_modules', mod, './package.json'), 'utf8'),
            );
          } catch {
            // Ignore
          }

          moduleCheck.set(
            mod,
            !modulePkg || (!modulePkg.types && !modulePkg.typings && !resolve.types(modulePkg)) ?
              `@types/${mod}` :
              mod,
          );
        }

        if (!deps.has(/** @type {string} */ (moduleCheck.get(mod)))) {
          utils.reportJSDoc(
            'import points to package which is not found in dependencies',
            tag,
          );
        }
      }
    });
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports if JSDoc `import()` statements point to a package which is not listed in `dependencies` or `devDependencies`',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/imports-as-dependencies.md#repos-sticky-header',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          dependencies: {
            description: 'Whether packages listed in `dependencies` may be imported. Defaults to `true`.',
            type: 'boolean',
          },
          devDependencies: {
            description: 'Whether packages listed in `devDependencies` may be imported. Defaults to `true`.',
            type: 'boolean',
          },
          peerDependencies: {
            description: `Whether packages listed in \`peerDependencies\` may be imported. Defaults to
\`false\`, so that a package which is only a peer dependency is reported, as
projects usually also list such packages in \`devDependencies\`.`,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
