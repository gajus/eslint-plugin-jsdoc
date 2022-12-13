import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import assertionData from './assertionData.js';

export default function Assertions ({rule, passing}) {
  const ruleAssertions = assertionData[rule];
  if (passing) {
    return <>
    The following patterns are not considered problems:

<CodeBlock language="js">
{ruleAssertions.valid.join('\n\n')}
</CodeBlock>
    </>
  }
  return <>
The following patterns are considered problems:

<CodeBlock language="js">
{ruleAssertions.invalid.join('\n\n')}
</CodeBlock>
  </>;
};
