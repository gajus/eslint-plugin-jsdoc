export interface Rules {
  "jsdoc/check-alignment": 
    | []
    | [
        {
          innerIndent?: number;
        }
      ];

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

  "jsdoc/check-indentation": 
    | []
    | [
        {
          excludeTags?: string[];
        }
      ];

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

  "jsdoc/check-property-names": 
    | []
    | [
        {
          enableFixer?: boolean;
        }
      ];

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

  "jsdoc/check-types": 
    | []
    | [
        {
          exemptTagContexts?: {
            tag?: string;
            types?: boolean | string[];
          }[];
          noDefaults?: boolean;
          unifyParentAndChildTypeChecks?: boolean;
        }
      ];

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

  "jsdoc/empty-tags": 
    | []
    | [
        {
          tags?: string[];
        }
      ];

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

  "jsdoc/no-bad-blocks": 
    | []
    | [
        {
          ignore?: string[];
          preventAllMultiAsteriskBlocks?: boolean;
        }
      ];

  "jsdoc/no-blank-blocks": 
    | []
    | [
        {
          enableFixer?: boolean;
        }
      ];

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

  "jsdoc/no-multi-asterisks": 
    | []
    | [
        {
          allowWhitespace?: boolean;
          preventAtEnd?: boolean;
          preventAtMiddleLines?: boolean;
        }
      ];

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

  "jsdoc/no-undefined-types": 
    | []
    | [
        {
          definedTypes?: string[];
          disableReporting?: boolean;
          markVariablesAsUsed?: boolean;
        }
      ];

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

  "jsdoc/require-description-complete-sentence": 
    | []
    | [
        {
          abbreviations?: string[];
          newlineBeforeCapsAssumesBadSentenceEnd?: boolean;
          tags?: string[];
        }
      ];

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

  "jsdoc/require-returns-check": 
    | []
    | [
        {
          exemptAsync?: boolean;
          exemptGenerators?: boolean;
          reportMissingReturnForUndefinedTypes?: boolean;
        }
      ];

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

  "jsdoc/require-template": 
    | []
    | [
        {
          exemptedBy?: string[];
          requireSeparateTemplates?: boolean;
        }
      ];

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

  "jsdoc/text-escaping": 
    | []
    | [
        {
          escapeHTML?: boolean;
          escapeMarkdown?: boolean;
        }
      ];

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
          objectFieldSeparatorTrailingPunctuation?: boolean;
          propertyQuotes?: "double" | "single" | null;
          separatorForSingleObjectField?: boolean;
          stringQuotes?: "double" | "single";
          typeBracketSpacing?: string;
          unionSpacing?: string;
        }
      ];

  "jsdoc/valid-types": 
    | []
    | [
        {
          allowEmptyNamepaths?: boolean;
        }
      ];
}
