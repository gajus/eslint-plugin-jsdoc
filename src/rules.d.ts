export interface Rules {
  /** Checks that `@access` tags have a valid value. */
  "jsdoc/check-access": [];

  /** Reports invalid alignment of JSDoc block asterisks. */
  "jsdoc/check-alignment": 
    | []
    | [
        {
          innerIndent?: number;
        }
      ];

  /** Ensures that (JavaScript) examples within JSDoc adhere to ESLint rules. */
  "jsdoc/check-examples": 
    | []
    | [
        {
          allowInlineConfig?: boolean;
          baseConfig?: {
            [k: string]: unknown;
          };
          captionRequired?: boolean;
          checkDefaults?: boolean;
          checkEslintrc?: boolean;
          checkParams?: boolean;
          checkProperties?: boolean;
          configFile?: string;
          exampleCodeRegex?: string;
          matchingFileName?: string;
          matchingFileNameDefaults?: string;
          matchingFileNameParams?: string;
          matchingFileNameProperties?: string;
          noDefaultExampleRules?: boolean;
          paddedIndent?: number;
          rejectExampleCodeRegex?: string;
          reportUnusedDisableDirectives?: boolean;
        }
      ];

  /** Reports invalid padding inside JSDoc blocks. */
  "jsdoc/check-indentation": 
    | []
    | [
        {
          excludeTags?: string[];
        }
      ];

  /** Reports invalid alignment of JSDoc block lines. */
  "jsdoc/check-line-alignment": 
    | []
    | ["always" | "never" | "any"]
    | [
        "always" | "never" | "any",
        {
          customSpacings?: {
            postDelimiter?: number;
            postHyphen?: number;
            postName?: number;
            postTag?: number;
            postType?: number;
          };
          disableWrapIndent?: boolean;
          preserveMainDescriptionPostDelimiter?: boolean;
          tags?: string[];
          wrapIndent?: string;
        }
      ];

  /** Ensures that parameter names in JSDoc match those in the function declaration. */
  "jsdoc/check-param-names": 
    | []
    | [
        {
          allowExtraTrailingParamDocs?: boolean;
          checkDestructured?: boolean;
          checkRestProperty?: boolean;
          checkTypesPattern?: string;
          disableExtraPropertyReporting?: boolean;
          disableMissingParamChecks?: boolean;
          enableFixer?: boolean;
          useDefaultObjectProperties?: boolean;
        }
      ];

  /** Ensures that property names in JSDoc are not duplicated on the same block and that nested properties have defined roots. */
  "jsdoc/check-property-names": 
    | []
    | [
        {
          enableFixer?: boolean;
        }
      ];

  /** Reports against syntax not valid for the mode (e.g., Google Closure Compiler in non-Closure mode). */
  "jsdoc/check-syntax": [];

  /** Reports invalid block tag names. */
  "jsdoc/check-tag-names": 
    | []
    | [
        {
          definedTags?: string[];
          enableFixer?: boolean;
          jsxTags?: boolean;
          typed?: boolean;
        }
      ];

  /** Checks that any `@template` names are actually used in the connected `@typedef` or type alias. */
  "jsdoc/check-template-names": [];

  /** Reports invalid types. */
  "jsdoc/check-types": 
    | []
    | [
        {
          exemptTagContexts?: {
            tag?: string;
            types?: boolean | string[];
          }[];
          noDefaults?: boolean;
          /**
           * @deprecated Use the `preferredTypes[preferredType]` setting of the same name instead
           */
          unifyParentAndChildTypeChecks?: boolean;
        }
      ];

  /** This rule checks the values for a handful of tags: `@version`, `@since`, `@license` and `@author`. */
  "jsdoc/check-values": 
    | []
    | [
        {
          allowedAuthors?: string[];
          allowedLicenses?: string[] | boolean;
          licensePattern?: string;
          numericOnlyVariation?: boolean;
        }
      ];

  /** Converts non-JSDoc comments preceding or following nodes into JSDoc ones */
  "jsdoc/convert-to-jsdoc-comments": 
    | []
    | [
        {
          allowedPrefixes?: string[];
          contexts?: (
            | string
            | {
                context?: string;
                inlineCommentBlock?: boolean;
              }
          )[];
          contextsAfter?: (
            | string
            | {
                context?: string;
                inlineCommentBlock?: boolean;
              }
          )[];
          contextsBeforeAndAfter?: (
            | string
            | {
                context?: string;
                inlineCommentBlock?: boolean;
              }
          )[];
          enableFixer?: boolean;
          enforceJsdocLineStyle?: "multi" | "single";
          lineOrBlockStyle?: "block" | "line" | "both";
        }
      ];

  /** Expects specific tags to be empty of any content. */
  "jsdoc/empty-tags": 
    | []
    | [
        {
          tags?: string[];
        }
      ];

  /** Reports an issue with any non-constructor function using `@implements`. */
  "jsdoc/implements-on-classes": 
    | []
    | [
        {
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
        }
      ];

  /** Reports if JSDoc `import()` statements point to a package which is not listed in `dependencies` or `devDependencies` */
  "jsdoc/imports-as-dependencies": [];

  /** This rule reports doc comments that only restate their attached name. */
  "jsdoc/informative-docs": 
    | []
    | [
        {
          aliases?: {
            /**
             * This interface was referenced by `undefined`'s JSON-Schema definition
             * via the `patternProperty` ".*".
             */
            [k: string]: string[];
          };
          excludedTags?: string[];
          uselessWords?: string[];
        }
      ];

  /** Enforces minimum number of newlines before JSDoc comment blocks */
  "jsdoc/lines-before-block": 
    | []
    | [
        {
          checkBlockStarts?: boolean;
          excludedTags?: string[];
          ignoreSameLine?: boolean;
          ignoreSingleLines?: boolean;
          lines?: number;
        }
      ];

  /** Enforces a regular expression pattern on descriptions. */
  "jsdoc/match-description": 
    | []
    | [
        {
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
          mainDescription?:
            | string
            | boolean
            | {
                match?: string | boolean;
                message?: string;
              };
          matchDescription?: string;
          message?: string;
          nonemptyTags?: boolean;
          tags?: {
            /**
             * This interface was referenced by `undefined`'s JSON-Schema definition
             * via the `patternProperty` ".*".
             */
            [k: string]:
              | string
              | true
              | {
                  match?: string | true;
                  message?: string;
                };
          };
        }
      ];

  /** Reports the name portion of a JSDoc tag if matching or not matching a given regular expression. */
  "jsdoc/match-name": 
    | []
    | [
        {
          match: {
            allowName?: string;
            comment?: string;
            context?: string;
            disallowName?: string;
            message?: string;
            replacement?: string;
            tags?: string[];
          }[];
        }
      ];

  /** Controls how and whether jsdoc blocks can be expressed as single or multiple line blocks. */
  "jsdoc/multiline-blocks": 
    | []
    | [
        {
          allowMultipleTags?: boolean;
          minimumLengthForMultiline?: number;
          multilineTags?: "*" | string[];
          noFinalLineText?: boolean;
          noMultilineBlocks?: boolean;
          noSingleLineBlocks?: boolean;
          noZeroLineText?: boolean;
          requireSingleLineUnderCount?: number;
          singleLineTags?: string[];
        }
      ];

  /** This rule checks for multi-line-style comments which fail to meet the criteria of a jsdoc block. */
  "jsdoc/no-bad-blocks": 
    | []
    | [
        {
          ignore?: string[];
          preventAllMultiAsteriskBlocks?: boolean;
        }
      ];

  /** Detects and removes extra lines of a blank block description */
  "jsdoc/no-blank-block-descriptions": [];

  /** Removes empty blocks with nothing but possibly line breaks */
  "jsdoc/no-blank-blocks": 
    | []
    | [
        {
          enableFixer?: boolean;
        }
      ];

  /** This rule reports defaults being used on the relevant portion of `@param` or `@default`. */
  "jsdoc/no-defaults": 
    | []
    | [
        {
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
          noOptionalParamNames?: boolean;
        }
      ];

  /** Reports when certain comment structures are always expected. */
  "jsdoc/no-missing-syntax": 
    | []
    | [
        {
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
                message?: string;
                minimum?: number;
              }
          )[];
        }
      ];

  /** Prevents use of multiple asterisks at the beginning of lines. */
  "jsdoc/no-multi-asterisks": 
    | []
    | [
        {
          allowWhitespace?: boolean;
          preventAtEnd?: boolean;
          preventAtMiddleLines?: boolean;
        }
      ];

  /** Reports when certain comment structures are present. */
  "jsdoc/no-restricted-syntax": 
    | []
    | [
        {
          contexts: (
            | string
            | {
                comment?: string;
                context?: string;
                message?: string;
              }
          )[];
        }
      ];

  /** This rule reports types being used on `@param` or `@returns`. */
  "jsdoc/no-types": 
    | []
    | [
        {
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
        }
      ];

  /** Checks that types in jsdoc comments are defined. */
  "jsdoc/no-undefined-types": 
    | []
    | [
        {
          definedTypes?: string[];
          disableReporting?: boolean;
          markVariablesAsUsed?: boolean;
        }
      ];

  /** Requires that each JSDoc line starts with an `*`. */
  "jsdoc/require-asterisk-prefix": 
    | []
    | ["always" | "never" | "any"]
    | [
        "always" | "never" | "any",
        {
          tags?: {
            always?: string[];
            any?: string[];
            never?: string[];
          };
        }
      ];

  /** Requires that all functions have a description. */
  "jsdoc/require-description": 
    | []
    | [
        {
          checkConstructors?: boolean;
          checkGetters?: boolean;
          checkSetters?: boolean;
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
          descriptionStyle?: "body" | "tag" | "any";
          exemptedBy?: string[];
        }
      ];

  /** Requires that block description, explicit `@description`, and `@param`/`@returns` tag descriptions are written in complete sentences. */
  "jsdoc/require-description-complete-sentence": 
    | []
    | [
        {
          abbreviations?: string[];
          newlineBeforeCapsAssumesBadSentenceEnd?: boolean;
          tags?: string[];
        }
      ];

  /** Requires that all functions have examples. */
  "jsdoc/require-example": 
    | []
    | [
        {
          checkConstructors?: boolean;
          checkGetters?: boolean;
          checkSetters?: boolean;
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
          enableFixer?: boolean;
          exemptedBy?: string[];
          exemptNoArguments?: boolean;
        }
      ];

  /** Checks that all files have one `@file`, `@fileoverview`, or `@overview` tag at the beginning of the file. */
  "jsdoc/require-file-overview": 
    | []
    | [
        {
          tags?: {
            /**
             * This interface was referenced by `undefined`'s JSON-Schema definition
             * via the `patternProperty` ".*".
             */
            [k: string]: {
              initialCommentsOnly?: boolean;
              mustExist?: boolean;
              preventDuplicates?: boolean;
            };
          };
        }
      ];

  /** Requires a hyphen before the `@param` description. */
  "jsdoc/require-hyphen-before-param-description": 
    | []
    | ["always" | "never"]
    | [
        "always" | "never",
        {
          tags?:
            | {
                /**
                 * This interface was referenced by `undefined`'s JSON-Schema definition
                 * via the `patternProperty` ".*".
                 */
                [k: string]: "always" | "never";
              }
            | "any";
        }
      ];

  /** Require JSDoc comments */
  "jsdoc/require-jsdoc": 
    | []
    | [
        {
          checkConstructors?: boolean;
          checkGetters?: boolean | "no-setter";
          checkSetters?: boolean | "no-getter";
          contexts?: (
            | string
            | {
                context?: string;
                inlineCommentBlock?: boolean;
                minLineCount?: number;
              }
          )[];
          enableFixer?: boolean;
          exemptEmptyConstructors?: boolean;
          exemptEmptyFunctions?: boolean;
          exemptOverloadedImplementations?: boolean;
          fixerMessage?: string;
          minLineCount?: number;
          publicOnly?:
            | boolean
            | {
                ancestorsOnly?: boolean;
                cjs?: boolean;
                esm?: boolean;
                window?: boolean;
              };
          require?: {
            ArrowFunctionExpression?: boolean;
            ClassDeclaration?: boolean;
            ClassExpression?: boolean;
            FunctionDeclaration?: boolean;
            FunctionExpression?: boolean;
            MethodDefinition?: boolean;
          };
          skipInterveningOverloadedDeclarations?: boolean;
        }
      ];

  /** Requires a type for `@next` tags */
  "jsdoc/require-next-type": [];

  /** Requires that all function parameters are documented. */
  "jsdoc/require-param": 
    | []
    | [
        {
          autoIncrementBase?: number;
          checkConstructors?: boolean;
          checkDestructured?: boolean;
          checkDestructuredRoots?: boolean;
          checkGetters?: boolean;
          checkRestProperty?: boolean;
          checkSetters?: boolean;
          checkTypesPattern?: string;
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
          enableFixer?: boolean;
          enableRestElementFixer?: boolean;
          enableRootFixer?: boolean;
          exemptedBy?: string[];
          ignoreWhenAllParamsMissing?: boolean;
          unnamedRootBase?: string[];
          useDefaultObjectProperties?: boolean;
        }
      ];

  /** Requires that each `@param` tag has a `description` value. */
  "jsdoc/require-param-description": 
    | []
    | [
        {
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
          defaultDestructuredRootDescription?: string;
          setDefaultDestructuredRootDescription?: boolean;
        }
      ];

  /** Requires that all function parameters have names. */
  "jsdoc/require-param-name": 
    | []
    | [
        {
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
        }
      ];

  /** Requires that each `@param` tag has a `type` value. */
  "jsdoc/require-param-type": 
    | []
    | [
        {
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
          defaultDestructuredRootType?: string;
          setDefaultDestructuredRootType?: boolean;
        }
      ];

  /** Requires that all `@typedef` and `@namespace` tags have `@property` when their type is a plain `object`, `Object`, or `PlainObject`. */
  "jsdoc/require-property": [];

  /** Requires that each `@property` tag has a `description` value. */
  "jsdoc/require-property-description": [];

  /** Requires that all function `@property` tags have names. */
  "jsdoc/require-property-name": [];

  /** Requires that each `@property` tag has a `type` value. */
  "jsdoc/require-property-type": [];

  /** Requires that returns are documented. */
  "jsdoc/require-returns": 
    | []
    | [
        {
          checkConstructors?: boolean;
          checkGetters?: boolean;
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
                forceRequireReturn?: boolean;
              }
          )[];
          enableFixer?: boolean;
          exemptedBy?: string[];
          forceRequireReturn?: boolean;
          forceReturnsWithAsync?: boolean;
          publicOnly?:
            | boolean
            | {
                ancestorsOnly?: boolean;
                cjs?: boolean;
                esm?: boolean;
                window?: boolean;
              };
        }
      ];

  /** Requires a return statement in function body if a `@returns` tag is specified in jsdoc comment. */
  "jsdoc/require-returns-check": 
    | []
    | [
        {
          exemptAsync?: boolean;
          exemptGenerators?: boolean;
          reportMissingReturnForUndefinedTypes?: boolean;
        }
      ];

  /** Requires that the `@returns` tag has a `description` value. */
  "jsdoc/require-returns-description": 
    | []
    | [
        {
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
        }
      ];

  /** Requires that `@returns` tag has `type` value. */
  "jsdoc/require-returns-type": 
    | []
    | [
        {
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
        }
      ];

  /** Requires template tags for each generic type parameter */
  "jsdoc/require-template": 
    | []
    | [
        {
          exemptedBy?: string[];
          requireSeparateTemplates?: boolean;
        }
      ];

  /** Requires that throw statements are documented. */
  "jsdoc/require-throws": 
    | []
    | [
        {
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
          exemptedBy?: string[];
        }
      ];

  /** Requires a type for `@throws` tags */
  "jsdoc/require-throws-type": [];

  /** Requires yields are documented. */
  "jsdoc/require-yields": 
    | []
    | [
        {
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
          exemptedBy?: string[];
          forceRequireNext?: boolean;
          forceRequireYields?: boolean;
          next?: boolean;
          nextWithGeneratorTag?: boolean;
          withGeneratorTag?: boolean;
        }
      ];

  /** Requires a yield statement in function body if a `@yields` tag is specified in jsdoc comment. */
  "jsdoc/require-yields-check": 
    | []
    | [
        {
          checkGeneratorsOnly?: boolean;
          contexts?: (
            | string
            | {
                comment?: string;
                context?: string;
              }
          )[];
          exemptedBy?: string[];
          next?: boolean;
        }
      ];

  /** Requires a type for `@yields` tags */
  "jsdoc/require-yields-type": [];

  /** Sorts tags by a specified sequence according to tag name. */
  "jsdoc/sort-tags": 
    | []
    | [
        {
          alphabetizeExtras?: boolean;
          linesBetween?: number;
          reportIntraTagGroupSpacing?: boolean;
          reportTagGroupSpacing?: boolean;
          tagSequence?: {
            tags?: string[];
          }[];
        }
      ];

  /** Enforces lines (or no lines) between tags. */
  "jsdoc/tag-lines": 
    | []
    | ["always" | "any" | "never"]
    | [
        "always" | "any" | "never",
        {
          applyToEndTag?: boolean;
          count?: number;
          endLines?: number | null;
          startLines?: number | null;
          tags?: {
            /**
             * This interface was referenced by `undefined`'s JSON-Schema definition
             * via the `patternProperty` ".*".
             */
            [k: string]: {
              count?: number;
              lines?: "always" | "never" | "any";
            };
          };
        }
      ];

  /** Auto-escape certain characters that are input within block and tag descriptions. */
  "jsdoc/text-escaping": 
    | []
    | [
        {
          escapeHTML?: boolean;
          escapeMarkdown?: boolean;
        }
      ];

  /** Formats JSDoc type values. */
  "jsdoc/type-formatting": 
    | []
    | [
        {
          arrayBrackets?: "angle" | "square";
          enableFixer?: boolean;
          genericDot?: boolean;
          objectFieldIndent?: string;
          objectFieldQuote?: "double" | "single" | null;
          objectFieldSeparator?: "comma" | "comma-and-linebreak" | "linebreak" | "semicolon" | "semicolon-and-linebreak";
          objectFieldSeparatorOptionalLinebreak?: boolean;
          objectFieldSeparatorTrailingPunctuation?: boolean;
          propertyQuotes?: "double" | "single" | null;
          separatorForSingleObjectField?: boolean;
          stringQuotes?: "double" | "single";
          typeBracketSpacing?: string;
          unionSpacing?: string;
        }
      ];

  /** Requires all types to be valid JSDoc or Closure compiler types without syntax errors. */
  "jsdoc/valid-types": 
    | []
    | [
        {
          allowEmptyNamepaths?: boolean;
        }
      ];
}
